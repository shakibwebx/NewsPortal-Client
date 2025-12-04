'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';

interface News {
  _id: string;
  title: string;
  summary: string;
  image: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  views: number;
  createdAt: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<News[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    if (query) {
      document.title = `"${query}" খোঁজার ফলাফল - Channel D.O`;
    } else {
      document.title = 'খোঁজ - Channel D.O';
    }
  }, [query]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

      if (!query || query.trim() === '') {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      const [newsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/api/news/search?q=${encodeURIComponent(query)}&limit=50`),
        fetch(`${API_URL}/api/categories`),
      ]);

      const newsData = await newsRes.json();
      const categoriesData = await categoriesRes.json();

      setSearchResults(newsData.data || []);
      setCategories(categoriesData.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'এইমাত্র';
    if (diffInHours < 24) return `${diffInHours} ঘণ্টা আগে`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} দিন আগে`;

    return date.toLocaleDateString('bn-BD');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#D00614] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">খোঁজা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalHeader />

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            খোঁজার ফলাফল
          </h1>
          <p className="text-gray-600">
            "<span className="font-semibold text-[#D00614]">{query}</span>" এর জন্য {searchResults.length}টি খবর পাওয়া গেছে
          </p>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((news) => (
              <Link
                key={news._id}
                href={`/news/${news._id}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#D00614] text-white px-3 py-1 rounded text-xs font-medium shadow-lg">
                      {news.category?.icon} {news.category?.name}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#D00614] transition leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {news.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-xs">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDate(news.createdAt)}
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {news.views}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">কোনো খবর পাওয়া যায়নি</h3>
            <p className="text-gray-600">অন্য কিছু দিয়ে খোঁজার চেষ্টা করুন</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#D00614] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

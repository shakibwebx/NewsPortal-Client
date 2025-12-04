'use client';

import { useEffect, useState } from 'react';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import BreakingNews from '@/components/home/BreakingNews';
import TopNewsSection from '@/components/home/TopNewsSection';
import PhotoGallerySection from '@/components/home/PhotoGallerySection';
import VideoSection from '@/components/home/VideoSection';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

interface News {
  _id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  isFeatured: boolean;
  views: number;
  createdAt: string;
}

export default function HomePage() {
  const [allNews, setAllNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

      const [newsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/api/news?limit=50`),
        fetch(`${API_URL}/api/categories`),
      ]);

      const newsData = await newsRes.json();
      const categoriesData = await categoriesRes.json();

      setAllNews(newsData.data || []);
      setCategories(categoriesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <ProfessionalHeader />

        {/* Breaking News Skeleton */}
        <div className="bg-gradient-to-r from-[#D00614] to-[#a00510] py-2">
          <div className="max-w-7xl mx-auto px-4">
            <Skeleton className="h-6 w-full bg-white/20" />
          </div>
        </div>

        {/* Top News Section Skeleton */}
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Featured News Skeleton */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <Skeleton className="h-[400px] w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Side News Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200 flex gap-4 p-4">
                  <Skeleton className="h-24 w-32 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category News Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <Skeleton className="h-[200px] w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <ProfessionalHeader />

      {/* Breaking News */}
      <BreakingNews />

      {/* Top News Section - Full Width Grid */}
      <TopNewsSection news={allNews} />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* Photo Gallery */}
        <PhotoGallerySection />

        {/* Video Section */}
        <div className="mt-8">
          <VideoSection />
        </div>

        {/* Category Sections */}
        {categories.map((category) => {
          const categoryNews = allNews.filter(n => n.category?._id === category._id).slice(0, 6);
          if (categoryNews.length === 0) return null;

          return (
            <div key={category._id} className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#D00614] rounded"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.icon} {category.name}
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categoryNews.map((news) => (
                  <a
                    key={news._id}
                    href={`/news/${news._id}`}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-[#D00614] to-[#a00510] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg backdrop-blur-sm">
                          {category.icon} {category.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#D00614] transition leading-tight">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{news.summary}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {new Date(news.createdAt).toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

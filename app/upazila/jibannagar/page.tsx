'use client';

import { useEffect, useState } from 'react';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';
import ChuadangaCategoryLayout from '@/components/category/ChuadangaCategoryLayout';

interface News {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  image?: string;
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

export default function JibannagarPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const LIMIT = 13;

  useEffect(() => {
    fetchNews(1);
  }, []);

  const fetchNews = async (pageNum: number) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news?upazila=jibannagar&page=${pageNum}&limit=${LIMIT}`);
      const data = await response.json();

      const newNews = data.data || [];

      if (pageNum === 1) {
        setNews(newNews);
      } else {
        setNews(prev => [...prev, ...newNews]);
      }

      setHasMore(newNews.length === LIMIT);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchNews(page + 1);
    }
  };

  const category = {
    _id: 'jibannagar',
    name: 'জীবননগর',
    slug: 'jibannagar',
    icon: '📍'
  };

  if (loading) {
    return (
      <>
        <ProfessionalHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ProfessionalHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
            জীবননগর
          </h1>
          <p className="text-gray-600 mt-2">জীবননগর উপজেলার সর্বশেষ খবর</p>
        </div>
        <ChuadangaCategoryLayout category={category} news={news} />

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-8 mb-8">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-[#D00614] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#a00510] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
            >
              {loadingMore ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  লোড হচ্ছে...
                </>
              ) : (
                'আরও দেখুন'
              )}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

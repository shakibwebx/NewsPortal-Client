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
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Photo Gallery */}
        <PhotoGallerySection />

        {/* Video Section */}
        <div className="mt-8">
          <VideoSection />
        </div>

        {/* Category Sections */}
        {categories.map((category) => {
          const categoryNews = allNews.filter(n => n.category?._id === category._id).slice(0, 9);
          if (categoryNews.length === 0) return null;

          const [firstNews, ...restNews] = categoryNews;

          return (
            <div key={category._id} className="mt-10">
              {/* Category Header with Link */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#D00614] rounded"></div>
                  <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                    {category.icon} {category.name}
                  </h2>
                </div>
                <a
                  href={`/category/${category.slug}`}
                  className="text-sm font-semibold text-[#D00614] hover:text-[#a00510] transition flex items-center gap-1"
                  style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                >
                  সব দেখুন
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Grid Layout: 6 columns, 3 rows */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-fr">
                {/* First News - 2 columns × 2 rows */}
                {firstNews && (
                  <a
                    href={`/news/${firstNews._id}`}
                    className="col-span-2 row-span-2 group relative overflow-hidden rounded-lg h-[400px] md:h-auto"
                  >
                    <img
                      src={firstNews.image}
                      alt={firstNews.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="absolute top-3 left-3">
                      <span className="bg-[#D00614] text-white px-2.5 py-1 rounded text-xs font-semibold">
                        {category.icon} {category.name}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-lg font-bold mb-2 line-clamp-3 leading-tight group-hover:text-gray-200 transition" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                        {firstNews.title}
                      </h3>
                      <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                        {firstNews.summary}
                      </p>
                      <div className="flex items-center text-gray-300 text-xs">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(firstNews.createdAt).toLocaleDateString('bn-BD')}
                      </div>
                    </div>
                  </a>
                )}

                {/* Rest 4 News - 1 column × 1 row each */}
                {restNews.map((news) => (
                  <a
                    key={news._id}
                    href={`/news/${news._id}`}
                    className="col-span-1 row-span-1 group relative overflow-hidden rounded-lg h-[200px] md:h-auto"
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <h3 className="text-white text-sm font-bold mb-1.5 line-clamp-2 leading-tight group-hover:text-gray-200 transition" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                        {news.title}
                      </h3>
                      <div className="flex items-center justify-between text-gray-300 text-[10px]">
                        <span className="bg-[#D00614]/80 text-white px-1.5 py-0.5 rounded text-[9px] font-medium">
                          {category.icon} {category.name}
                        </span>
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(news.createdAt).toLocaleDateString('bn-BD')}
                        </div>
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

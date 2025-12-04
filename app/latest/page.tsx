'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface News {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  author: string;
  publishedAt: string;
  views: number;
}

export default function LatestPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/news?sort=-publishedAt&limit=30`);
        const data = await res.json();
        setNews(data.data || []);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ProfessionalHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📰</span>
              <div>
                <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                  সর্বশেষ খবর
                </h1>
                <p className="text-gray-600 mt-1" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                  সর্বশেষ প্রকাশিত সব খবর
                </p>
              </div>
            </div>
          </div>

          {/* News Grid */}
          {news.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                কোনো খবর নেই
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <Link
                  key={item._id}
                  href={`/news/${item.slug || item._id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group"
                >
                  {/* Image */}
                  {item.image && (
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    {/* Category Badge */}
                    {item.category && (
                      <div className="flex items-center gap-2 mb-3">
                        {item.category.icon && (
                          <span className="text-sm">{item.category.icon}</span>
                        )}
                        <span className="text-xs font-semibold text-[#D00614]" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                          {item.category.name}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#D00614] transition" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                      {item.title}
                    </h2>

                    {/* Excerpt */}
                    {item.summary && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                        {item.summary}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <span>{new Date(item.publishedAt).toLocaleDateString('bn-BD')}</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {item.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

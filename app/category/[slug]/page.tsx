'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import ChuadangaCategoryLayout from '@/components/category/ChuadangaCategoryLayout';

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
  author: {
    name: string;
  };
  isFeatured: boolean;
  views: number;
  createdAt: string;
  publishedAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

        const [categoryRes, newsRes] = await Promise.all([
          fetch(`${API_URL}/api/categories/slug/${slug}`),
          fetch(`${API_URL}/api/news?limit=100`),
        ]);

        const categoryData = await categoryRes.json();
        const newsData = await newsRes.json();

        setCategory(categoryData.data);

        // Filter news by category slug
        const filteredNews = (newsData.data || []).filter((item: News) =>
          item.category?.slug === slug
        );
        setNews(filteredNews);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <>
        <ProfessionalHeader />
        <div className="min-h-screen bg-white">
          <div className="max-w-[1600px] mx-auto px-4 py-8">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
                  <Skeleton key={i} className="h-[250px] w-full rounded" />
                ))}
              </div>
              <div className="w-full lg:w-80">
                <Skeleton className="h-[400px] w-full rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!category) {
    return (
      <>
        <ProfessionalHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Category not found</div>
        </div>
        <Footer />
      </>
    );
  }

  // Check if this is Chuadanga category
  const isChuadangaCategory = slug === 'chuadanga-district';

  return (
    <>
      <ProfessionalHeader />
      <div className="min-h-screen bg-white">
        <div className={`mx-auto px-4 py-8 ${isChuadangaCategory ? 'max-w-[1600px]' : 'max-w-7xl'}`}>
          {/* Category Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-[#D00614] rounded"></div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
              {category.icon} {category.name}
            </h1>
          </div>

          {/* Conditional Layout */}
          {isChuadangaCategory ? (
            <ChuadangaCategoryLayout category={category} news={news} />
          ) : (
            <>
              {news.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <p className="text-gray-500 text-lg" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                    এই বিভাগে কোনো খবর নেই
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

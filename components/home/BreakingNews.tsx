'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface News {
  _id: string;
  title: string;
  category: {
    name: string;
    icon?: string;
  };
}

export default function BreakingNews() {
  const [breakingNews, setBreakingNews] = useState<News[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  useEffect(() => {
    if (breakingNews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [breakingNews]);

  const fetchBreakingNews = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news?limit=50`);
      const data = await response.json();

      // Filter news marked as breaking news
      const breaking = (data.data || []).filter((news: any) => news.isBreaking);
      setBreakingNews(breaking.slice(0, 5));
    } catch (error) {
      console.error('Error fetching breaking news:', error);
    }
  };

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-[#D00614] via-[#D00614] to-[#D00614] border-b-2 border-[#a00510] shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          {/* Breaking News Label */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <svg className="w-4 h-4 text-[#D00614] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-[#D00614] font-bold text-sm">জরুরি সংবাদ</span>
            </div>
          </div>

          {/* News Ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="relative h-8">
              {breakingNews.map((news, index) => (
                <Link
                  key={news._id}
                  href={`/news/${news._id}`}
                  className={`absolute inset-0 flex items-center transition-all duration-500 ${
                    index === currentIndex
                      ? 'opacity-100 translate-y-0'
                      : index < currentIndex
                      ? 'opacity-0 -translate-y-full'
                      : 'opacity-0 translate-y-full'
                  }`}
                >
                  <span className="text-white hover:text-gray-200 transition truncate">
                    <span className="font-semibold">{news.category?.icon}</span> {news.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex-shrink-0 hidden md:flex items-center gap-2">
            {breakingNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Manual Navigation */}
          <div className="flex-shrink-0 flex items-center gap-1">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length)}
              className="p-1.5 text-white hover:bg-white/10 rounded transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % breakingNews.length)}
              className="p-1.5 text-white hover:bg-white/10 rounded transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

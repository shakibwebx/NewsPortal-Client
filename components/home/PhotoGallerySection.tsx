'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface PhotoNews {
  _id: string;
  title: string;
  image: string;
}

export default function PhotoGallerySection() {
  const [photos, setPhotos] = useState<PhotoNews[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news?limit=50`);
      const data = await response.json();

      // Filter out video news, only show regular news with images
      const regularNews = (data.data || []).filter((news: any) => !news.isVideo);
      setPhotos(regularNews.slice(0, 8));
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (photos.length === 0) return null;

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#D00614] rounded"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">ছবিতে</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {photos.map((photo) => (
            <Link
              key={photo._id}
              href={`/news/${photo._id}`}
              className="flex-shrink-0 w-[280px] sm:w-[350px] group cursor-pointer"
            >
              <div className="relative h-[200px] sm:h-[250px] rounded-lg overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300"></div>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 line-clamp-2">
                {photo.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

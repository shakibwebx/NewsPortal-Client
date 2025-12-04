'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface VideoNews {
  _id: string;
  title: string;
  image: string;
  videoUrl: string;
  views: number;
  createdAt: string;
}

export default function VideoSection() {
  const [videos, setVideos] = useState<VideoNews[]>([]);

  useEffect(() => {
    fetchVideoNews();
  }, []);

  const fetchVideoNews = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news?limit=50`);
      const data = await response.json();

      // Filter news marked as video
      const videoNews = (data.data || []).filter((news: any) => news.isVideo && news.videoUrl);
      setVideos(videoNews.slice(0, 4));
    } catch (error) {
      console.error('Error fetching video news:', error);
    }
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  };

  if (videos.length === 0) return null;

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#D00614] rounded"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-7 h-7 text-[#D00614]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              ভিডিও
            </h2>
          </div>
          <Link
            href="/videos"
            className="text-sm font-medium text-[#D00614] hover:text-[#a00510] transition flex items-center gap-1"
          >
            আরো ভিডিও
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link
              key={video._id}
              href={`/news/${video._id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-[180px] overflow-hidden bg-gray-200">
                <img
                  src={getYouTubeThumbnail(video.videoUrl) || video.image}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-300"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#D00614] bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 group-hover:scale-110 transition duration-300 shadow-2xl">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#D00614] transition leading-tight mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {video.views} বার দেখা হয়েছে
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

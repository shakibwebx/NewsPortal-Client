'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';
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
  views: number;
  isVideo: boolean;
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface RelatedNews {
  _id: string;
  title: string;
  image: string;
  category?: {
    name: string;
    icon?: string;
  };
  createdAt: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<RelatedNews[]>([]);
  const [popularNews, setPopularNews] = useState<RelatedNews[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchNews();
      fetchCategories();
      fetchPopularNews();
    }
  }, [id]);

  useEffect(() => {
    if (news) {
      document.title = `${news.title} - Channel D.O`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', news.summary);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = news.summary;
        document.head.appendChild(meta);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', news.title);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = news.title;
        document.head.appendChild(meta);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', news.summary);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = news.summary;
        document.head.appendChild(meta);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', news.image);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.content = news.image;
        document.head.appendChild(meta);
      }
    }
  }, [news]);

  const fetchNews = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news/${id}`);
      const data = await response.json();

      if (data.success) {
        setNews(data.data);

        // Increment view count
        incrementViews();

        // Fetch related news from same category
        if (data.data.category?._id) {
          fetchRelatedNews(data.data.category._id);
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      await fetch(`${API_URL}/api/news/${id}/views`, {
        method: 'PATCH',
      });
    } catch (error) {
      // Silently fail - view count is not critical
      console.error('Error incrementing views:', error);
    }
  };

  const fetchRelatedNews = async (categoryId: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news?limit=50`);
      const data = await response.json();

      const related = (data.data || [])
        .filter((item: any) => item.category?._id === categoryId && item._id !== id)
        .slice(0, 6);

      setRelatedNews(related);
    } catch (error) {
      console.error('Error fetching related news:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPopularNews = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news/popular?limit=8`);
      const data = await response.json();
      setPopularNews(data.data || []);
    } catch (error) {
      console.error('Error fetching popular news:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProfessionalHeader />

        {/* Breadcrumb Skeleton */}
        <div className="bg-white border-b">
          <div className="max-w-[1400px] mx-auto px-4 py-3">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-8">
              <article className="bg-white shadow-sm">
                {/* Category Badge */}
                <div className="px-6 pt-6">
                  <Skeleton className="h-7 w-32 rounded" />
                </div>

                {/* Title */}
                <div className="px-6 pt-4 pb-6 space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-5/6" />
                </div>

                {/* Meta Info */}
                <div className="px-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* Summary */}
                <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-4/5" />
                </div>

                {/* Featured Image */}
                <div className="px-6 py-6">
                  <Skeleton className="w-full aspect-video rounded-lg" />
                </div>

                {/* Content */}
                <div className="px-6 py-8 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Social Share */}
                <div className="px-6 pb-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </article>

              {/* Related News Skeleton */}
              <div className="mt-8 bg-white shadow-sm p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-24 w-32 rounded flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-4 space-y-6">
              {/* Popular News */}
              <div className="bg-white shadow-sm p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-20 w-28 rounded flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white shadow-sm p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-10 w-full rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white">
        <ProfessionalHeader />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">খবরটি পাওয়া যায়নি</h1>
          <Link href="/" className="text-[#D00614] hover:underline">
            হোম পেজে ফিরে যান
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#D00614] transition">
              প্রচ্ছদ
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/category/${news.category.slug}`}
              className="hover:text-[#D00614] transition"
            >
              {news.category.name}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-400 line-clamp-1">{news.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="bg-white shadow-sm">
              {/* Category Badge */}
              <div className="px-6 pt-6">
                <Link
                  href={`/category/${news.category.slug}`}
                  className="inline-flex items-center gap-2 bg-[#D00614] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#a00510] transition"
                >
                  {news.category.icon} {news.category.name}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 px-6 pt-4 pb-6 leading-tight">
                {news.title}
              </h1>

              {/* Meta Info */}
              <div className="px-6 pb-6 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#D00614]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span className="font-medium">{news.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#D00614]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <time className="font-medium">{formatDate(news.createdAt)}</time>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#D00614]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    <span className="font-medium">{news.views.toLocaleString('bn-BD')}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-semibold">
                  {news.summary}
                </p>
              </div>

              {/* Featured Image or Video */}
              <div className="px-6 py-6">
                {news.isVideo && news.videoUrl ? (
                  <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                    <iframe
                      src={getYouTubeEmbedUrl(news.videoUrl)}
                      title={news.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* Content */}
              <div className="px-6 py-8">
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-800 text-lg leading-relaxed"
                    style={{
                      lineHeight: '1.9',
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
                    }}
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  />
                </div>
              </div>

              {/* Social Share - Bottom */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">শেয়ার করুন:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`, '_blank', 'width=600,height=400');
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white rounded hover:bg-sky-600 transition text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(news.title + ' ' + window.location.href)}`, '_blank');
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Comment Section */}
            <CommentSection newsId={id} />

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#D00614] rounded"></div>
                  আরও পড়ুন
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedNews.map((item) => (
                    <Link
                      key={item._id}
                      href={`/news/${item._id}`}
                      className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-[200px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#D00614] transition">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Popular News */}
            {popularNews.length > 0 && (
              <div className="bg-white shadow-sm overflow-hidden">
                <div className="bg-[#D00614] px-4 py-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                    </svg>
                    জনপ্রিয় খবর
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {popularNews.map((item, index) => (
                    <Link
                      key={item._id}
                      href={`/news/${item._id}`}
                      className="flex gap-3 p-4 hover:bg-gray-50 transition group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#D00614] flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#D00614] transition leading-snug mb-1">
                          {item.title}
                        </h4>
                        {item.category && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              {item.category.icon} {item.category.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 w-20 h-20">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white shadow-sm overflow-hidden">
              <div className="bg-[#D00614] px-4 py-3">
                <h3 className="text-lg font-bold text-white">বিভাগসমূহ</h3>
              </div>
              <div className="p-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug}`}
                    className="block px-4 py-2 bg-gray-50 hover:bg-[#D00614] hover:text-white transition rounded text-sm font-medium"
                  >
                    {category.icon} {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad Space */}
            <div className="bg-gray-100 h-[400px] flex items-center justify-center text-gray-400 rounded-lg shadow-sm">
              <div className="text-center">
                <p className="text-sm">বিজ্ঞাপন</p>
                <p className="text-xs">300 x 400</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

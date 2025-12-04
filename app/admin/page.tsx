'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Stats {
  totalNews: number;
  totalCategories: number;
  totalComments: number;
  pendingComments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalNews: 0,
    totalCategories: 0,
    totalComments: 0,
    pendingComments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    // Refresh data when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchStats();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

      const [newsRes, categoriesRes, commentsRes] = await Promise.all([
        fetch(`${API_URL}/api/news`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        }),
        fetch(`${API_URL}/api/categories`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        }),
        fetch(`${API_URL}/api/comments`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        }),
      ]);

      const newsData = await newsRes.json();
      const categoriesData = await categoriesRes.json();
      const commentsData = await commentsRes.json();

      setStats({
        totalNews: newsData.data?.length || 0,
        totalCategories: categoriesData.data?.length || 0,
        totalComments: commentsData.data?.length || 0,
        pendingComments: commentsData.data?.filter((c: any) => !c.isApproved).length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'মোট সংবাদ',
      value: stats.totalNews,
      icon: '📰',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      link: '/admin/news',
      description: 'Published articles',
    },
    {
      title: 'ক্যাটাগরি',
      value: stats.totalCategories,
      icon: '📁',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50',
      link: '/admin/categories',
      description: 'News categories',
    },
    {
      title: 'মোট মন্তব্য',
      value: stats.totalComments,
      icon: '💬',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgLight: 'bg-purple-50',
      link: '/admin/comments',
      description: 'User comments',
    },
    {
      title: 'অপেক্ষমাণ মন্তব্য',
      value: stats.pendingComments,
      icon: '⏳',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgLight: 'bg-orange-50',
      link: '/admin/comments?filter=pending',
      description: 'Awaiting approval',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D00614] via-[#a00510] to-[#8a1423] p-8 text-white shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h1 className="text-3xl font-bold">ড্যাশবোর্ড</h1>
              <p className="text-white/80 mt-1">Channel DO Admin Panel</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mb-24"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group relative overflow-hidden"
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-gray-300 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                </div>
                <div className={`w-14 h-14 ${card.bgLight} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                <span className={card.textColor}>View Details</span>
                <span className={card.textColor}>→</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
            ⚡
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">দ্রুত কাজ</h2>
            <p className="text-sm text-gray-600">Common actions and shortcuts</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/news/create">
            <Button className="w-full h-auto py-4 bg-gradient-to-r from-[#D00614] to-[#a00510] hover:from-[#a00510] hover:to-[#8a1423] text-white shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📝</span>
                <span className="font-semibold">নতুন সংবাদ তৈরি করুন</span>
              </div>
            </Button>
          </Link>
          <Link href="/admin/categories">
            <Button variant="outline" className="w-full h-auto py-4 border-2 hover:border-green-500 hover:bg-green-50 transition-all">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📁</span>
                <span className="font-semibold text-gray-700">ক্যাটাগরি যোগ করুন</span>
              </div>
            </Button>
          </Link>
          <Link href="/admin/comments?filter=pending">
            <Button variant="outline" className="w-full h-auto py-4 border-2 hover:border-orange-500 hover:bg-orange-50 transition-all">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">✅</span>
                <span className="font-semibold text-gray-700">মন্তব্য পর্যালোচনা</span>
              </div>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">সাম্প্রতিক কার্যকলাপ</h3>
            <span className="text-2xl">📈</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-700 flex-1">System running smoothly</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-700 flex-1">{stats.totalNews} news articles published</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-700 flex-1">{stats.pendingComments} comments awaiting review</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">দ্রুত লিংক</h3>
            <span className="text-2xl">🔗</span>
          </div>
          <div className="space-y-2">
            <Link href="/admin/news" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-900">সব সংবাদ দেখুন →</p>
            </Link>
            <Link href="/admin/categories" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-900">ক্যাটাগরি পরিচালনা →</p>
            </Link>
            <Link href="/admin/comments" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-900">মন্তব্য পরিচালনা →</p>
            </Link>
            <Link href="/" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <p className="text-sm font-medium text-gray-900">হোম পেজ দেখুন →</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

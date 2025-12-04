'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface News {
  _id: string;
  title: string;
  summary: string;
  category: { name: string; slug: string };
  image: string;
  views: number;
  isFeatured: boolean;
  createdAt: string;
}

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchNews = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      let url = `${API_URL}/api/news`;

      if (filter === 'featured') {
        url = `${API_URL}/api/news/featured`;
      } else if (filter === 'popular') {
        url = `${API_URL}/api/news/popular`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setNews(data.data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNews(news.filter((item) => item._id !== id));
        toast.success('News deleted successfully');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete news');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.error('Failed to delete news');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-2">Manage all news articles</p>
        </div>
        <Link
          href="/admin/news/create"
          className="px-6 py-3 bg-[#D00614] text-white rounded-lg font-medium hover:bg-[#a00510] transition"
        >
          + Create News
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'secondary'}
            className={filter === 'all' ? 'bg-[#D00614] hover:bg-[#a00510]' : ''}
          >
            All News
          </Button>
          <Button
            onClick={() => setFilter('featured')}
            variant={filter === 'featured' ? 'default' : 'secondary'}
            className={filter === 'featured' ? 'bg-[#D00614] hover:bg-[#a00510]' : ''}
          >
            Featured
          </Button>
          <Button
            onClick={() => setFilter('popular')}
            variant={filter === 'popular' ? 'default' : 'secondary'}
            className={filter === 'popular' ? 'bg-[#D00614] hover:bg-[#a00510]' : ''}
          >
            Popular
          </Button>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                    No news found
                  </TableCell>
                </TableRow>
              ) : (
                news.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-md">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {item.category?.name || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {item.views}
                    </TableCell>
                    <TableCell>
                      {item.isFeatured ? (
                        <span className="text-green-600">✓ Yes</span>
                      ) : (
                        <span className="text-gray-400">✗ No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/news/edit/${item._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-900 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

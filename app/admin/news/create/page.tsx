'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function CreateNews() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    upazila: '',
    image: '',
    author: '',
    isFeatured: false,
    isBreaking: false,
    isVideo: false,
    videoUrl: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required. Please login again.');
        router.push('/admin/login');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('News created successfully!');
        router.push('/admin/news');
      } else {
        const error = await response.json();
        toast.error(`Failed to create news: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating news:', error);
      toast.error('Failed to create news');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create News</h1>
        <p className="text-gray-600 mt-2">Add a new news article</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter news title"
            />
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Summary *
            </label>
            <Textarea
              id="summary"
              name="summary"
              required
              rows={3}
              value={formData.summary}
              onChange={handleChange}
              placeholder="Enter brief summary"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content * (Rich Text Editor)
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Enter full news content with formatting..."
            />
          </div>

          {/* Category, Upazila and Author Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 mb-2">
                Upazila (Optional)
              </label>
              <Select
                value={formData.upazila || 'none'}
                onValueChange={(value) => setFormData({ ...formData, upazila: value === 'none' ? '' : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Upazila" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="chuadanga-sadar">চুয়াডাঙ্গা সদর</SelectItem>
                  <SelectItem value="alamdanga">আলমডাঙ্গা</SelectItem>
                  <SelectItem value="damurhuda">দামুড়হুদা</SelectItem>
                  <SelectItem value="jibannagar">জীবননগর</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <Input
                type="text"
                id="author"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              News Image *
            </label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              onRemove={() => setFormData({ ...formData, image: '' })}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-[#D00614] border-gray-300 rounded focus:ring-[#D00614]"
              />
              <label htmlFor="isFeatured" className="ml-2 text-sm font-medium text-gray-700">
                Mark as Featured News (প্রধান খবর)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isBreaking"
                name="isBreaking"
                checked={formData.isBreaking}
                onChange={handleChange}
                className="w-4 h-4 text-[#D00614] border-gray-300 rounded focus:ring-[#D00614]"
              />
              <label htmlFor="isBreaking" className="ml-2 text-sm font-medium text-gray-700">
                Mark as Breaking News (জরুরি সংবাদ)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isVideo"
                name="isVideo"
                checked={formData.isVideo}
                onChange={handleChange}
                className="w-4 h-4 text-[#D00614] border-gray-300 rounded focus:ring-[#D00614]"
              />
              <label htmlFor="isVideo" className="ml-2 text-sm font-medium text-gray-700">
                Mark as Video News (ভিডিও খবর)
              </label>
            </div>
          </div>

          {/* Video URL (conditional) */}
          {formData.isVideo && (
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (YouTube/Vimeo)
              </label>
              <Input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#D00614] hover:bg-[#a00510]"
            >
              {loading ? 'Creating...' : 'Create News'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/admin/news')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

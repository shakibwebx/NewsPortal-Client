'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    order: 1,
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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const url = editingCategory
        ? `${API_URL}/api/categories/${editingCategory._id}`
        : `${API_URL}/api/categories`;

      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Category ${editingCategory ? 'updated' : 'created'} successfully!`);
        setShowModal(false);
        setEditingCategory(null);
        setFormData({ name: '', slug: '', description: '', icon: '', order: 1 });
        fetchCategories();
      } else {
        const error = await response.json();
        toast.error(`Failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Operation failed');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: (category as any).icon || '',
      order: (category as any).order || 1,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCategories(categories.filter((cat) => cat._id !== id));
        toast.success('Category deleted successfully');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', icon: '', order: 1 });
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
          <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600 mt-2">Manage news categories</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-[#D00614] hover:bg-[#a00510]"
        >
          + Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {(category as any).icon && (
                  <span className="text-2xl">{(category as any).icon}</span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">/{category.slug}</p>
                </div>
              </div>
            </div>
            {category.description && (
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
            )}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => handleEdit(category)}
                className="flex-1"
                size="sm"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(category._id)}
                className="flex-1"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No categories found. Create your first category!
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={(open) => {
        setShowModal(open);
        if (!open) handleModalClose();
      }}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Name *
              </label>
              <Input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Sports"
                className="border-gray-300 focus:border-[#D00614] focus:ring-[#D00614] text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-2">
                Slug *
              </label>
              <Input
                type="text"
                id="slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g., sports"
                className="border-gray-300 focus:border-[#D00614] focus:ring-[#D00614] text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
                className="border-gray-300 focus:border-[#D00614] focus:ring-[#D00614] text-gray-900 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="icon" className="block text-sm font-semibold text-gray-900 mb-2">
                  Icon (Emoji)
                </label>
                <Input
                  type="text"
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., ⚽"
                  className="border-gray-300 focus:border-[#D00614] focus:ring-[#D00614] text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-semibold text-gray-900 mb-2">
                  Order
                </label>
                <Input
                  type="number"
                  id="order"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  placeholder="1"
                  min={1}
                  className="border-gray-300 focus:border-[#D00614] focus:ring-[#D00614] text-gray-900"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <Button
                type="submit"
                className="flex-1 bg-[#D00614] hover:bg-[#a00510] text-white font-semibold"
              >
                {editingCategory ? 'Update Category' : 'Create Category'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

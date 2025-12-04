const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const api = {
  // News endpoints
  news: {
    getAll: async (params?: { category?: string; limit?: number; page?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.append('category', params.category);
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.page) searchParams.append('page', params.page.toString());

      const url = `${API_URL}/news${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const res = await fetch(url, {
        cache: 'no-store',
        next: { revalidate: 60 } // Revalidate every 60 seconds
      });

      if (!res.ok) throw new Error('Failed to fetch news');
      return res.json();
    },

    getFeatured: async () => {
      const res = await fetch(`${API_URL}/news?featured=true&limit=1`, {
        cache: 'no-store',
        next: { revalidate: 60 }
      });

      if (!res.ok) throw new Error('Failed to fetch featured news');
      return res.json();
    },

    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/news/${id}`, {
        cache: 'no-store',
        next: { revalidate: 300 }
      });

      if (!res.ok) throw new Error('Failed to fetch news');
      return res.json();
    },

    getByCategory: async (category: string, limit?: number) => {
      const res = await fetch(`${API_URL}/news?category=${category}${limit ? `&limit=${limit}` : ''}`, {
        cache: 'no-store',
        next: { revalidate: 60 }
      });

      if (!res.ok) throw new Error('Failed to fetch news by category');
      return res.json();
    },

    getLatest: async (limit: number = 10) => {
      const res = await fetch(`${API_URL}/news?limit=${limit}&sort=-publishedAt`, {
        cache: 'no-store',
        next: { revalidate: 30 }
      });

      if (!res.ok) throw new Error('Failed to fetch latest news');
      return res.json();
    },

    getPopular: async (limit: number = 5) => {
      const res = await fetch(`${API_URL}/news?limit=${limit}&sort=-views`, {
        cache: 'no-store',
        next: { revalidate: 120 }
      });

      if (!res.ok) throw new Error('Failed to fetch popular news');
      return res.json();
    },

    incrementViews: async (id: string) => {
      const res = await fetch(`${API_URL}/news/${id}/views`, {
        method: 'PATCH',
        cache: 'no-store'
      });

      if (!res.ok) throw new Error('Failed to increment views');
      return res.json();
    }
  },

  // Categories endpoints
  categories: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/categories`, {
        cache: 'force-cache',
        next: { revalidate: 3600 } // Cache for 1 hour
      });

      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },

    getBySlug: async (slug: string) => {
      const res = await fetch(`${API_URL}/categories/${slug}`, {
        cache: 'force-cache',
        next: { revalidate: 3600 }
      });

      if (!res.ok) throw new Error('Failed to fetch category');
      return res.json();
    }
  },

  // Comments endpoints
  comments: {
    getByNewsId: async (newsId: string) => {
      const res = await fetch(`${API_URL}/comments?newsId=${newsId}&isApproved=true`, {
        cache: 'no-store',
        next: { revalidate: 60 }
      });

      if (!res.ok) throw new Error('Failed to fetch comments');
      return res.json();
    },

    create: async (data: { newsId: string; userName: string; userEmail: string; content: string }) => {
      const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store'
      });

      if (!res.ok) throw new Error('Failed to create comment');
      return res.json();
    }
  }
};

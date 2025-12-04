export interface News {
  _id: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  views: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface Comment {
  _id: string;
  newsId: string;
  userName: string;
  userEmail: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  avatar?: string;
  bio?: string;
  isActive: boolean;
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium hover:bg-red-700 rounded transition whitespace-nowrap"
            >
              🏠 প্রচ্ছদ
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="px-4 py-2 text-sm font-medium hover:bg-red-700 rounded transition whitespace-nowrap flex items-center gap-1"
              >
                {category.icon && <span>{category.icon}</span>}
                {category.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="text-sm font-bold">
              প্রচ্ছদ
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-red-700 rounded transition"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Right side links - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search Button/Form */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="খোঁজ করুন..."
                  className="px-3 py-1.5 text-sm text-gray-900 rounded-l border-2 border-red-700 focus:outline-none focus:border-white w-48"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 rounded-r transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="ml-1 px-2 py-1.5 hover:bg-red-700 rounded transition"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="px-3 py-1.5 text-xs font-medium bg-red-700 hover:bg-red-800 rounded transition flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                খোঁজ
              </button>
            )}
            <Link
              href="/latest"
              className="px-3 py-1.5 text-xs font-medium bg-white text-red-600 rounded hover:bg-gray-100 transition"
            >
              সর্বশেষ
            </Link>
            <Link
              href="/popular"
              className="px-3 py-1.5 text-xs font-medium bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300 transition"
            >
              জনপ্রিয়
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-red-700 mt-2 pt-2">
            <div className="flex flex-col gap-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4 pb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="খোঁজ করুন..."
                    className="flex-1 px-3 py-2 text-sm text-gray-900 bg-white rounded border-2 border-red-700 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
              <div className="border-t border-red-700 mb-2"></div>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium hover:bg-red-700 rounded transition flex items-center gap-2"
                >
                  {category.icon && <span className="text-lg">{category.icon}</span>}
                  {category.name}
                </Link>
              ))}
              <div className="border-t border-red-700 my-2"></div>
              <Link
                href="/latest"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium hover:bg-red-700 rounded transition"
              >
                📰 সর্বশেষ খবর
              </Link>
              <Link
                href="/popular"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium hover:bg-red-700 rounded transition"
              >
                🔥 জনপ্রিয় খবর
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

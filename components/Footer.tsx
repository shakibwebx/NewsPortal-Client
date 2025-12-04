'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Category } from '@/types';

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image src="/logof.webp" alt="News Portal Logo" width={200} height={53} className="brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              বাংলাদেশের শীর্ষস্থানীয় অনলাইন সংবাদপত্র। সঠিক এবং নিরপেক্ষ সংবাদ পরিবেশনে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">বিভাগসমূহ</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 4).map((category) => (
                <li key={category._id}>
                  <Link href={`/category/${category.slug}`} className="hover:text-white transition">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">আমাদের টিম</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/team/management" className="hover:text-white transition">পরিচালনা পর্ষদ</Link></li>
              <li><Link href="/team/editorial" className="hover:text-white transition">সম্পাদকীয় পর্ষদ</Link></li>
              <li><Link href="/team/representatives" className="hover:text-white transition">প্রতিনিধি পর্ষদ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">যোগাযোগ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">যোগাযোগ</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>চুয়াডাঙ্গা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>infochanneldo@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Hotline: 01310119911</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>&copy; ২০২৫ সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}

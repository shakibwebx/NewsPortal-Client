'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-gray-200 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-7xl animate-bounce">😕</div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          পৃষ্ঠা পাওয়া যায়নি
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি। হয়তো পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে অথবা URL ভুল আছে।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-[#D00614] text-white rounded-lg font-medium hover:bg-[#a00510] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            হোম পেজে ফিরে যান
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            পিছনে যান
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">আপনি এগুলো দেখতে পারেন:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/latest"
              className="text-sm text-[#D00614] hover:underline"
            >
              সর্বশেষ খবর
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/category/politics"
              className="text-sm text-[#D00614] hover:underline"
            >
              রাজনীতি
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/category/sports"
              className="text-sm text-[#D00614] hover:underline"
            >
              খেলা
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/category/entertainment"
              className="text-sm text-[#D00614] hover:underline"
            >
              বিনোদন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

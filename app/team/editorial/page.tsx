'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';

interface TeamMember {
  id: number;
  idNumber: string;
  name: string;
  position: string;
  image: string;
}

const editorialTeam: TeamMember[] = [
  {
    id: 1,
    idNumber: 'DOED2501',
    name: 'EMDAD HOSSAIN',
    position: 'Editor-in-Chief',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765373120/09_oo0n9i.png'
  },
  {
    id: 2,
    idNumber: 'DOED2502',
    name: 'RUDRO RASEL',
    position: 'News Editor',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765373119/10_nkb0l0.png'
  }
];

export default function EditorialBoard() {
  return (
    <>
      <ProfessionalHeader />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D00614] to-[#a00510] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="mb-6">
            <Link href="/" className="text-white/80 hover:text-white transition">
              হোম
            </Link>
            <span className="mx-2">/</span>
            <span>সম্পাদকীয় পর্ষদ</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">সম্পাদকীয় পর্ষদ</h1>
          <p className="text-white/90 text-lg max-w-3xl">
            আমাদের দক্ষ সম্পাদকীয় দল সর্বোচ্চ মানের সংবাদ পরিবেশনের জন্য নিরলসভাবে কাজ করে যাচ্ছেন। নিরপেক্ষতা ও সত্যতা আমাদের প্রথম অগ্রাধিকার।
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {editorialTeam.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info Section - Below image */}
              <div className="p-5 bg-gradient-to-br from-gray-50 to-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{member.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1 w-10 bg-[#D00614] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {member.position}
                  </p>
                </div>
                <p className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-3 py-1 rounded-full">
                  ID: {member.idNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            আমাদের সম্পাদকীয় নীতি
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D00614] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">সত্যতা</h3>
              <p className="text-gray-600">প্রতিটি সংবাদ যাচাই-বাছাই করে প্রকাশ করা হয়</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D00614] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">নিরপেক্ষতা</h3>
              <p className="text-gray-600">কোনো পক্ষপাতিত্ব ছাড়াই সংবাদ পরিবেশন</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D00614] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">দ্রুততা</h3>
              <p className="text-gray-600">সর্বশেষ সংবাদ দ্রুততম সময়ে পাঠকের কাছে</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

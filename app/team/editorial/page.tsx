'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
}

const editorialTeam: TeamMember[] = [
  {
    id: 1,
    name: 'জাকির হোসেন',
    position: 'সম্পাদক',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop',
    description: 'জাতীয় পুরস্কার প্রাপ্ত সাংবাদিক। ৩৫ বছরের সাংবাদিকতা অভিজ্ঞতা।'
  },
  {
    id: 2,
    name: 'সালমা খাতুন',
    position: 'নির্বাহী সম্পাদক',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    description: 'অনুসন্ধানী সাংবাদিকতায় পিএইচডি। একাধিক জাতীয় পুরস্কার বিজয়ী।'
  },
  {
    id: 3,
    name: 'মাহমুদুল হক',
    position: 'সহযোগী সম্পাদক',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    description: 'রাজনৈতিক বিশ্লেষক। দেশের শীর্ষস্থানীয় কলামিস্ট।'
  },
  {
    id: 4,
    name: 'রুমানা আফরোজ',
    position: 'বার্তা সম্পাদক',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    description: 'জরুরি সংবাদ পরিবেশনায় বিশেষজ্ঞ। ২৫ বছরের অভিজ্ঞতা।'
  },
  {
    id: 5,
    name: 'কামাল উদ্দিন',
    position: 'প্রধান প্রতিবেদক',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop',
    description: 'অনুসন্ধানী রিপোর্টিংয়ে অভিজ্ঞ। একাধিক গুরুত্বপূর্ণ প্রতিবেদনের জন্য সুপরিচিত।'
  },
  {
    id: 6,
    name: 'নাসরিন জাহান',
    position: 'ফিচার এডিটর',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop',
    description: 'সাহিত্য ও সংস্কৃতি বিভাগে বিশেষজ্ঞ। সৃজনশীল লেখায় পুরস্কার প্রাপ্ত।'
  },
  {
    id: 7,
    name: 'তানভীর আহমেদ',
    position: 'ক্রীড়া সম্পাদক',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    description: 'ক্রীড়া সাংবাদিকতায় ১৮ বছর। আন্তর্জাতিক ক্রিকেট ভাষ্যকার।'
  },
  {
    id: 8,
    name: 'সাবিনা ইয়াসমিন',
    position: 'বিনোদন সম্পাদক',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
    description: 'চলচ্চিত্র ও বিনোদন জগতে গভীর পর্যবেক্ষণ। জনপ্রিয় কলাম লেখক।'
  },
  {
    id: 9,
    name: 'আরিফুল ইসলাম',
    position: 'প্রযুক্তি সম্পাদক',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop',
    description: 'প্রযুক্তি বিষয়ক লেখক ও বিশ্লেষক। ডিজিটাল মিডিয়া বিশেষজ্ঞ।'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editorialTeam.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-white/90 font-medium">{member.position}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
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

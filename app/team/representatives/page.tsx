'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';

interface Representative {
  id: number;
  idNumber: string;
  name: string;
  position: string;
  image: string;
}

const representatives: Representative[] = [
  {
    id: 1,
    idNumber: 'DOTD2501',
    name: 'TOUHIDUR RAHMAN',
    position: 'Video Editor',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765373493/11_bs7rx0.png'
  },
  {
    id: 2,
    idNumber: 'DOTD2502',
    name: 'MAHADI HOSSAIN',
    position: 'Graphics Designer (Apprentice)',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765373493/12_f36hzt.png'
  },
  {
    id: 3,
    idNumber: 'DOTD2503',
    name: 'SOREFA KHATUN',
    position: 'Social Media Manager',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765373493/13_flbwmf.png'
  }
];

export default function Representatives() {
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
            <span>প্রতিনিধি পর্ষদ</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">আমাদের টিম</h1>
          <p className="text-white/90 text-lg max-w-3xl">
            আমাদের দক্ষ ও নিবেদিত টিম সদস্যরা প্রতিটি বিষয়ে পেশাদার মান বজায় রেখে কাজ করে যাচ্ছেন। ভিডিও এডিটিং থেকে গ্রাফিক্স ডিজাইন এবং সোশ্যাল মিডিয়া ম্যানেজমেন্ট - প্রতিটি ক্ষেত্রে তাদের দক্ষতা আমাদের সাফল্যের চাবিকাঠি।
          </p>
        </div>
      </div>

      {/* Representatives Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {representatives.map((rep) => (
            <div
              key={rep.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image
                  src={rep.image}
                  alt={rep.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info Section - Below image */}
              <div className="p-5 bg-gradient-to-br from-gray-50 to-white">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{rep.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1 w-10 bg-[#D00614] rounded-full"></div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {rep.position}
                  </p>
                </div>
                <p className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-3 py-1 rounded-full">
                  ID: {rep.idNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Strengths Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            আমাদের টিমের শক্তি
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">৫+</div>
              <p className="text-gray-600 text-sm">বছরের অভিজ্ঞতা</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">১০০+</div>
              <p className="text-gray-600 text-sm">সফল প্রজেক্ট</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">২৪/৭</div>
              <p className="text-gray-600 text-sm">প্রোডাকশন সাপোর্ট</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">৯৯%</div>
              <p className="text-gray-600 text-sm">ক্লায়েন্ট সন্তুষ্টি</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            আমাদের টিমে যোগ দিতে চান?
          </h2>
          <p className="text-gray-600 mb-6">
            দক্ষ পেশাদার হিসেবে আমাদের সাথে কাজ করতে আগ্রহী হলে যোগাযোগ করুন
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#D00614] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#a00510] transition"
          >
            যোগাযোগ করুন
          </Link>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

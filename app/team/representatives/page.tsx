'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProfessionalHeader from '@/components/home/ProfessionalHeader';
import Footer from '@/components/Footer';

interface Representative {
  id: number;
  name: string;
  position: string;
  location: string;
  image: string;
  phone: string;
  email: string;
}

const representatives: Representative[] = [
  {
    id: 1,
    name: 'আহসান হাবিব',
    position: 'ঢাকা বিভাগীয় প্রতিনিধি',
    location: 'ঢাকা',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    phone: '০১৭১১-১১১১১১',
    email: 'dhaka@channeldo.com'
  },
  {
    id: 2,
    name: 'সুমাইয়া আক্তার',
    position: 'চট্টগ্রাম বিভাগীয় প্রতিনিধি',
    location: 'চট্টগ্রাম',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=400&fit=crop',
    phone: '০১৭২২-২২২২২২',
    email: 'chittagong@channeldo.com'
  },
  {
    id: 3,
    name: 'রফিকুল ইসলাম',
    position: 'রাজশাহী বিভাগীয় প্রতিনিধি',
    location: 'রাজশাহী',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop',
    phone: '০১৭৩৩-৩৩৩৩৩৩',
    email: 'rajshahi@channeldo.com'
  },
  {
    id: 4,
    name: 'নাজমা বেগম',
    position: 'খুলনা বিভাগীয় প্রতিনিধি',
    location: 'খুলনা',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop',
    phone: '০১৭৪৪-৪৪৪৪৪৪',
    email: 'khulna@channeldo.com'
  },
  {
    id: 5,
    name: 'জাহিদ হাসান',
    position: 'সিলেট বিভাগীয় প্রতিনিধি',
    location: 'সিলেট',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop',
    phone: '০১৭৫৫-৫৫৫৫৫৫',
    email: 'sylhet@channeldo.com'
  },
  {
    id: 6,
    name: 'শাহিনা পারভীন',
    position: 'বরিশাল বিভাগীয় প্রতিনিধি',
    location: 'বরিশাল',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    phone: '০১৭৬৬-৬৬৬৬৬৬',
    email: 'barishal@channeldo.com'
  },
  {
    id: 7,
    name: 'মুনির হোসেন',
    position: 'রংপুর বিভাগীয় প্রতিনিধি',
    location: 'রংপুর',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    phone: '০১৭৭৭-৭৭৭৭৭৭',
    email: 'rangpur@channeldo.com'
  },
  {
    id: 8,
    name: 'ফারজানা ইসলাম',
    position: 'ময়মনসিংহ বিভাগীয় প্রতিনিধি',
    location: 'ময়মনসিংহ',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    phone: '০১৭৮৮-৮৮৮৮৮৮',
    email: 'mymensingh@channeldo.com'
  },
  {
    id: 9,
    name: 'আব্দুল্লাহ আল মামুন',
    position: 'কুষ্টিয়া জেলা প্রতিনিধি',
    location: 'কুষ্টিয়া',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    phone: '০১৭৯৯-৯৯৯৯৯৯',
    email: 'kushtia@channeldo.com'
  },
  {
    id: 10,
    name: 'সাবিহা খাতুন',
    position: 'যশোর জেলা প্রতিনিধি',
    location: 'যশোর',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    phone: '০১৮১১-১১১১১১',
    email: 'jashore@channeldo.com'
  },
  {
    id: 11,
    name: 'রাকিব আহমেদ',
    position: 'কক্সবাজার জেলা প্রতিনিধি',
    location: 'কক্সবাজার',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    phone: '০১৮২২-২২২২২২',
    email: 'coxsbazar@channeldo.com'
  },
  {
    id: 12,
    name: 'তাসনিম জাহান',
    position: 'কুমিল্লা জেলা প্রতিনিধি',
    location: 'কুমিল্লা',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    phone: '০১৮৩৩-৩৩৩৩৩৩',
    email: 'cumilla@channeldo.com'
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
          <h1 className="text-4xl font-bold mb-4">প্রতিনিধি পর্ষদ</h1>
          <p className="text-white/90 text-lg max-w-3xl">
            সারাদেশ জুড়ে আমাদের দক্ষ প্রতিনিধিরা স্থানীয় সংবাদ সংগ্রহ ও পরিবেশনে নিয়োজিত আছেন। প্রতিটি বিভাগ ও জেলা থেকে সর্বশেষ সংবাদ পৌঁছে দিতে তারা সদা তৎপর।
          </p>
        </div>
      </div>

      {/* Representatives Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {representatives.map((rep) => (
            <div
              key={rep.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={rep.image}
                  alt={rep.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{rep.name}</h3>
                <p className="text-sm text-[#D00614] font-semibold mb-2">{rep.position}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{rep.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{rep.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">{rep.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Map Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            আমাদের সংবাদ কভারেজ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">৮</div>
              <p className="text-gray-600 text-sm">বিভাগীয় প্রতিনিধি</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">৬৪+</div>
              <p className="text-gray-600 text-sm">জেলা প্রতিনিধি</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">২৪/৭</div>
              <p className="text-gray-600 text-sm">সংবাদ কভারেজ</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#D00614] mb-2">১০০%</div>
              <p className="text-gray-600 text-sm">দেশব্যাপী নেটওয়ার্ক</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            আমাদের সাথে যুক্ত হতে চান?
          </h2>
          <p className="text-gray-600 mb-6">
            প্রতিনিধি হিসেবে কাজ করতে আগ্রহী হলে আমাদের সাথে যোগাযোগ করুন
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

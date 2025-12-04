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

const managementTeam: TeamMember[] = [
  {
    id: 1,
    name: 'মোহাম্মদ আব্দুল করিম',
    position: 'চেয়ারম্যান',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    description: 'দীর্ঘ ৩০ বছরের সাংবাদিকতা অভিজ্ঞতা। জাতীয় প্রেস ক্লাবের সাবেক সভাপতি।'
  },
  {
    id: 2,
    name: 'ফারহানা আক্তার',
    position: 'ব্যবস্থাপনা পরিচালক',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    description: 'গণমাধ্যম ব্যবস্থাপনায় পিএইচডি। ২০ বছরের নেতৃত্ব অভিজ্ঞতা।'
  },
  {
    id: 3,
    name: 'রাশেদুল ইসলাম',
    position: 'প্রধান নির্বাহী কর্মকর্তা',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    description: 'ডিজিটাল মিডিয়া বিশেষজ্ঞ। প্রযুক্তি ও সাংবাদিকতার সমন্বয়ে দক্ষ।'
  },
  {
    id: 4,
    name: 'নাজমা সুলতানা',
    position: 'আর্থিক পরিচালক',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    description: 'চার্টার্ড অ্যাকাউন্টেন্ট। ১৫ বছরের ফিন্যান্স ম্যানেজমেন্ট অভিজ্ঞতা।'
  },
  {
    id: 5,
    name: 'তাহমিদ হাসান',
    position: 'প্রযুক্তি পরিচালক',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    description: 'সফটওয়্যার ইঞ্জিনিয়ার। ক্লাউড কম্পিউটিং ও AI বিশেষজ্ঞ।'
  },
  {
    id: 6,
    name: 'শাহানা পারভীন',
    position: 'মানবসম্পদ পরিচালক',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    description: 'এইচআর ম্যানেজমেন্টে এমবিএ। কর্মী উন্নয়ন ও প্রশিক্ষণে বিশেষজ্ঞ।'
  }
];

export default function ManagementBoard() {
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
            <span>পরিচালনা পর্ষদ</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">পরিচালনা পর্ষদ</h1>
          <p className="text-white/90 text-lg max-w-3xl">
            আমাদের অভিজ্ঞ পরিচালনা পর্ষদ প্রতিষ্ঠানের কৌশলগত দিকনির্দেশনা এবং সামগ্রিক ব্যবস্থাপনার দায়িত্ব পালন করে থাকেন।
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementTeam.map((member) => (
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

      {/* Contact Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-gray-600 mb-6">
            পরিচালনা পর্ষদের সাথে যোগাযোগের জন্য আমাদের সাথে সংযুক্ত হন
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

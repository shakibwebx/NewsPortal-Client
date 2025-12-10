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

const managementTeam: TeamMember[] = [
  {
    id: 1,
    idNumber: 'DOBD2501',
    name: 'Md. Hasibul Hoque Lipu',
    position: 'Chairman',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765370940/01_cwwgei.png'
  },
  {
    id: 2,
    idNumber: 'DOBD2502',
    name: 'Haji Asadul Hoque (Labu)',
    position: 'Vice Chairman',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765371378/istockphoto-1341046662-612x612_vpogyu.jpg'
  },
  {
    id: 3,
    idNumber: 'DOBD2503',
    name: 'Md. Abdullah Tipu Sultan',
    position: 'CEO',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765371028/03_efqafj.png'
  },
   {
    id: 4,
    idNumber: 'DOBD2505',
    name: 'Md. Mohai Menul Hoque (Abir)',
    position: 'Director (Administration)',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765371597/06_fugrbj.png'
  },
  {
    id: 5,
    idNumber: 'DOBD2504',
    name: 'Khandaker Abdul Kader',
    position: 'Director (Finance)',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765371597/04_eardgv.png'
  },

  {
    id: 6,
    idNumber: 'DOBD2506',
    name: 'Shri Samir Kumar Majumder',
    position: 'Director (Communication)',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765371597/07_bpevui.png'
  },
  {
    id: 7,
    idNumber: 'DOBD2507',
    name: 'Khandaker Habibul Karim Chanchal',
    position: 'Director (Operations)',
    image: 'https://res.cloudinary.com/dge2c3dkx/image/upload/v1765371596/08_ejx8ze.png'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {managementTeam.map((member) => (
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

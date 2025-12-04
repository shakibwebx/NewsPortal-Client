'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  { name: 'সর্বশেষ', href: '/latest' },
  { name: 'রাজধানী', href: '/category/rajdhani' },
  { name: 'চুয়াডাঙ্গা', href: '/category/chuadanga-district' },
  { name: 'রাজনীতি', href: '/category/politics' },
  { name: 'অর্থনীতি', href: '/category/economy' },
  { name: 'শিক্ষা', href: '/category/education' },
  { name: 'খেলা', href: '/category/sports' },
  { name: 'বিনোদন', href: '/category/entertainment' },
  { name: 'অপরাধ', href: '/category/crime' },
  { name: 'কৃষি', href: '/category/agriculture' },
  { name: 'লাইফস্টাইল', href: '/category/lifestyle' },
  { name: 'স্বাস্থ্য', href: '/category/health' },
  { name: 'ভিডিও', href: '/videos' },
  { name: 'অন্যান্য', href: '#', hasDropdown: true, dropdownItems: [
    { name: 'প্রবাসে', href: '/category/probabas' },
    { name: 'তথ্যপ্রযুক্তি', href: '/category/tech' },
    { name: 'পরিবেশ', href: '/category/environment' },
  ]},
];

export default function ProfessionalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between py-3 min-h-[80px]">
            {/* Left: Location & Date */}
            <div className="flex items-center gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">চুয়াডাঙ্গা</span>
              </div>
              <span className="hidden md:inline text-gray-600">{today}</span>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 group">
              <Image src="/logo.webp" alt="News Portal Logo" width={300} height={80} priority className="hover:scale-105 transition-transform duration-300" />
            </Link>

            {/* Right: Social Icons & Links */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2">
                {/* Facebook */}
                <a href="https://www.facebook.com/channeldo25/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D00614] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="https://x.com/channeldo25" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D00614] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Pinterest */}
                <a href="https://www.pinterest.com/nchanneldo/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D00614] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@Channeldo25" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D00614] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/infochanneldo25/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D00614] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href="https://wa.me/8801722587222" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D00614] transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between h-[48px]">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                  onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="px-3 py-3 text-[15px] font-medium text-gray-700 hover:text-[#D00614] hover:bg-red-50 rounded-md transition-all relative group inline-flex items-center"
                    style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                  >
                    {item.name}
                    {item.hasDropdown && <span className="ml-1">▾</span>}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && item.dropdownItems && openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                      {item.dropdownItems.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#D00614] transition"
                          style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden py-2 flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              মেনু
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-[#D00614] transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="border-t border-gray-200 py-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="খবর খুঁজুন..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D00614] focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#D00614] text-white rounded-lg font-medium hover:bg-[#a00510] transition"
                >
                  খুঁজুন
                </button>
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown && item.dropdownItems ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#D00614] transition flex items-center justify-between"
                      >
                        {item.name}
                        <span className={`transform transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}>▾</span>
                      </button>
                      {openDropdown === item.name && (
                        <div className="bg-gray-50 pl-4">
                          {item.dropdownItems.map((dropItem) => (
                            <Link
                              key={dropItem.name}
                              href={dropItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-[#D00614] transition"
                            >
                              {dropItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#D00614] transition"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

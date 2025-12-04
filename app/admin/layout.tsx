'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AuthCheck from './auth-check';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('admin_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Update page title based on current route
    const pageTitles: { [key: string]: string } = {
      '/admin': 'ড্যাশবোর্ড - Admin Panel',
      '/admin/news': 'সংবাদ ব্যবস্থাপনা - Admin Panel',
      '/admin/categories': 'ক্যাটাগরি ব্যবস্থাপনা - Admin Panel',
      '/admin/comments': 'মন্তব্য ব্যবস্থাপনা - Admin Panel',
      '/admin/settings': 'সেটিংস - Admin Panel',
      '/admin/news/create': 'নতুন সংবাদ তৈরি করুন - Admin Panel',
    };

    const title = pageTitles[pathname || ''] || 'Admin Panel';
    document.title = `${title} - Channel D.O`;
  }, [pathname]);

  const handleLogout = () => {
    // Remove token and user data
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  // Don't render admin UI for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', label: 'ড্যাশবোর্ড', icon: '📊' },
    { href: '/admin/news', label: 'সংবাদ', icon: '📰' },
    { href: '/admin/categories', label: 'ক্যাটাগরি', icon: '📁' },
    { href: '/admin/comments', label: 'মন্তব্য', icon: '💬' },
    { href: '/admin/settings', label: 'সেটিংস', icon: '⚙️' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Admin Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D00614] to-[#a00510] rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                  D.O
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Channel D.O</div>
                  <div className="text-xs text-gray-600">Admin Panel</div>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                      ${isActive(link.href)
                        ? 'bg-[#D00614] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#D00614] transition rounded-lg hover:bg-gray-100"
              >
                <span>🏠</span>
                <span>সাইট দেখুন</span>
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-semibold text-gray-900">{user?.username || 'Admin'}</div>
                  <div className="text-xs text-gray-500">{user?.email || 'admin@channeldo.com'}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D00614] to-[#a00510] flex items-center justify-center text-white font-bold shadow-md">
                  {(user?.username?.[0] || 'A').toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-[#D00614] hover:bg-gray-100 rounded-lg transition"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Auth Check */}
      <AuthCheck>
        <main className="p-6 pb-12">{children}</main>
      </AuthCheck>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © ২০২৫ Channel D.O। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
}

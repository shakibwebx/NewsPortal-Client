import Link from 'next/link';
import Image from 'next/image';

interface News {
  _id: string;
  title: string;
  summary: string;
  image: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
  };
  isFeatured: boolean;
  views: number;
  createdAt: string;
}

interface TopNewsSectionProps {
  news: News[];
}

export default function TopNewsSection({ news }: TopNewsSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'এইমাত্র';
    if (diffInHours < 24) return `${diffInHours} ঘণ্টা আগে`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} দিন আগে`;

    return date.toLocaleDateString('bn-BD');
  };

  const featuredNews = news.find(n => n.isFeatured) || news[0];
  const regularNews = news.slice(0, 13).filter(n => n._id !== featuredNews?._id);
  const mostReadNews = [...news].sort((a, b) => b.views - a.views).slice(0, 5);

  // Chuadanga Upazilas
  const chuadangaUpazilas = [
    { name: 'চুয়াডাঙ্গা সদর', slug: 'chuadanga-sadar' },
    { name: 'আলমডাঙ্গা', slug: 'alamdanga' },
    { name: 'দামুড়হুদা', slug: 'damurhuda' },
    { name: 'জীবননগর', slug: 'jibannagar' },
  ];

  if (!featuredNews) return null;

  return (
    <section className="bg-white py-4">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Left: News Grid (4 columns) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:h-[calc(100vh-140px)]">
            {/* Featured News - 2 columns × 2 rows */}
          <Link
            href={`/news/${featuredNews._id}`}
            className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 group relative overflow-hidden rounded h-[400px] md:h-auto"
          >
            <Image
              src={featuredNews.image}
              alt={featuredNews.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-[#D00614] text-white px-2.5 py-1 rounded text-xs font-semibold">
                {featuredNews.category?.icon} {featuredNews.category?.name}
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-white text-xl lg:text-2xl font-bold mb-2 leading-tight group-hover:text-gray-200 transition" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                {featuredNews.title}
              </h2>
              <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                {featuredNews.summary}
              </p>
              <div className="flex items-center text-gray-300 text-xs">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(featuredNews.createdAt)}
              </div>
            </div>
          </Link>

            {/* Regular News - 12 items */}
            {regularNews.slice(0, 12).map((news) => (
              <Link
                key={news._id}
                href={`/news/${news._id}`}
                className="col-span-1 row-span-1 group relative overflow-hidden rounded hover:shadow-lg transition h-[250px] md:h-auto"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <h3 className="text-white text-sm font-bold mb-1.5 line-clamp-2 leading-tight group-hover:text-gray-200 transition" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                    {news.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-300 text-[10px]">
                    <span className="bg-[#D00614]/80 text-white px-1.5 py-0.5 rounded text-[9px] font-medium">
                      {news.category?.icon} {news.category?.name}
                    </span>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDate(news.createdAt)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right: Sidebar */}
          <div className="w-full lg:w-80 flex flex-col gap-3 lg:h-[calc(100vh-140px)] overflow-y-auto">
            {/* YouTube Video */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-[#D00614] text-white px-3 py-2 text-sm font-bold">
                ভিডিও
              </div>
              <div className="p-3">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded"
                    src="https://www.youtube.com/embed/a3Ue-LN5B9U?si=bL9ATV7Ea0_-O7QN"
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Most Reading News */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-[#D00614] text-white px-3 py-2 text-sm font-bold">
                সর্বাধিক পঠিত
              </div>
              <div className="divide-y divide-gray-200">
                {mostReadNews.map((newsItem, index) => (
                  <Link
                    key={newsItem._id}
                    href={`/news/${newsItem._id}`}
                    className="block p-3 hover:bg-gray-100 transition"
                  >
                    <div className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#D00614] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                        {newsItem.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Chuadanga Upazila Links */}
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-[#D00614] text-white px-3 py-2 text-sm font-bold">
                চুয়াডাঙ্গা জেলার উপজেলা
              </div>
              <div className="divide-y divide-gray-200">
                {chuadangaUpazilas.map((upazila) => (
                  <Link
                    key={upazila.slug}
                    href={`/upazila/${upazila.slug}`}
                    className="block px-3 py-2.5 hover:bg-gray-100 transition text-sm text-gray-700 font-medium"
                    style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                  >
                    → {upazila.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
  const regularNews = news.slice(0, 12).filter(n => n._id !== featuredNews?._id);

  if (!featuredNews) return null;

  return (
    <section className="bg-white py-4">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Mobile: 1 column, Desktop: 4 columns × 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:h-auto lg:h-[calc(100vh-140px)]">
          {/* Featured News - Mobile: full width, Desktop: 2 columns × 2 rows */}
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

          {/* Regular News - 11 items, each takes 1 column × 1 row */}
          {regularNews.slice(0, 11).map((news) => (
            <Link
              key={news._id}
              href={`/news/${news._id}`}
              className="col-span-1 row-span-1 group relative overflow-hidden rounded hover:shadow-lg transition h-[250px] md:h-auto"
            ><Image
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
      </div>
    </section>
  );
}

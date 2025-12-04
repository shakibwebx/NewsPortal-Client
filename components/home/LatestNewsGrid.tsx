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
  createdAt: string;
}

interface LatestNewsGridProps {
  news: News[];
}

export default function LatestNewsGrid({ news }: LatestNewsGridProps) {
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

  const latestNews = news.slice(0, 6);

  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#D00614] rounded"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">সর্বশেষ সংবাদ</h2>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item._id}`}
              className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#D00614] text-white px-3 py-1 rounded text-xs font-medium shadow-lg">
                    {item.category?.icon} {item.category?.name}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#D00614] transition leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-xs">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(item.createdAt)}
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

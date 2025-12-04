import Link from 'next/link';
import { News } from '@/types';
import { formatDistanceToNow } from '@/lib/date-utils';

interface PopularNewsListProps {
  news: News[];
}

export default function PopularNewsList({ news }: PopularNewsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-blue-600 rounded"></span>
        জনপ্রিয় খবর
      </h2>
      <div className="space-y-4">
        {news.map((item, index) => (
          <Link
            key={item._id}
            href={`/news/${item._id}`}
            className="group block pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
          >
            <div className="flex gap-3">
              <span className="text-2xl font-bold text-red-600 flex-shrink-0">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">{formatDistanceToNow(item.publishedAt)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

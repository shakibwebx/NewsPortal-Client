import Link from 'next/link';
import Image from 'next/image';
import { News } from '@/types';
import { formatDistanceToNow } from '@/lib/date-utils';

interface NewsCardProps {
  news: News;
  variant?: 'grid' | 'list';
}

export default function NewsCard({ news, variant = 'grid' }: NewsCardProps) {
  if (variant === 'list') {
    return (
      <Link href={`/news/${news._id}`} className="group flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex-1">
          <span className="text-xs text-red-600 font-medium">{news.category}</span>
          <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-red-600 transition line-clamp-2">
            {news.title}
          </h3>
          <p className="text-xs text-gray-500">{formatDistanceToNow(news.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${news._id}`}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
    >
      <div className="relative h-48">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {news.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition line-clamp-2">
          {news.title}
        </h3>
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatDistanceToNow(news.publishedAt)}
        </div>
      </div>
    </Link>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { News } from '@/types';
import { formatDistanceToNow } from '@/lib/date-utils';

interface FeaturedNewsCardProps {
  news: News;
}

export default function FeaturedNewsCard({ news }: FeaturedNewsCardProps) {
  return (
    <Link href={`/news/${news._id}`} className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
      <div className="relative h-96">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
            {news.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition">
          {news.title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-3">
          {news.excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatDistanceToNow(news.publishedAt)}
        </div>
      </div>
    </Link>
  );
}

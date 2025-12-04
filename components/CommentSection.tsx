'use client';

import { useState, useEffect } from 'react';

interface Comment {
  _id: string;
  userName: string;
  userEmail: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

interface CommentSectionProps {
  newsId: string;
}

export default function CommentSection({ newsId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/comments?newsId=${newsId}&isApproved=true`);
      const data = await response.json();

      if (data.success) {
        setComments(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.userName.trim() || !formData.userEmail.trim() || !formData.content.trim()) {
      setError('সকল ফিল্ড পূরণ করুন');
      return;
    }

    if (formData.content.length < 5) {
      setError('মন্তব্য কমপক্ষে ৫ অক্ষরের হতে হবে');
      return;
    }

    try {
      setSubmitting(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          newsId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('আপনার মন্তব্য সফলভাবে জমা হয়েছে! অনুমোদনের পর প্রদর্শিত হবে।');
        setFormData({ userName: '', userEmail: '', content: '' });

        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(data.message || 'মন্তব্য জমা দিতে সমস্যা হয়েছে');
      }
    } catch (err) {
      setError('মন্তব্য জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'এখনই';
    if (diffInMinutes < 60) return `${diffInMinutes} মিনিট আগে`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ঘন্টা আগে`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} দিন আগে`;

    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mt-12 bg-white shadow-sm rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#D00614] rounded"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          মন্তব্য ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">আপনার মন্তব্য লিখুন</h3>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                নাম *
              </label>
              <input
                type="text"
                id="userName"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D00614] focus:border-transparent transition"
                placeholder="আপনার নাম লিখুন"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                ইমেইল *
              </label>
              <input
                type="email"
                id="userEmail"
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D00614] focus:border-transparent transition"
                placeholder="your@email.com"
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              মন্তব্য *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D00614] focus:border-transparent transition resize-none"
              placeholder="আপনার মন্তব্য লিখুন..."
              required
              disabled={submitting}
              minLength={5}
              maxLength={1000}
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.content.length}/1000 অক্ষর
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-[#D00614] text-white rounded-lg hover:bg-[#a00510] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                জমা হচ্ছে...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                মন্তব্য জমা দিন
              </>
            )}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 mx-auto border-4 border-[#D00614] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-sm">মন্তব্য লোড হচ্ছে...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 text-lg">এখনও কোনো মন্তব্য নেই</p>
            <p className="text-gray-400 text-sm mt-2">প্রথম মন্তব্যকারী হন!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D00614] to-[#a00510] flex items-center justify-center text-white font-bold text-lg">
                      {comment.userName.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.userName}</h4>
                      <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

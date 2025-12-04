'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Comment {
  _id: string;
  newsId: {
    _id: string;
    title: string;
  };
  userName: string;
  userEmail: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

export default function CommentManagement() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/comments`);
      const data = await response.json();
      setComments(data.data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/comments/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setComments(
          comments.map((comment) =>
            comment._id === id ? { ...comment, isApproved: true } : comment
          )
        );
        toast.success('Comment approved successfully');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to approve comment');
      }
    } catch (error) {
      console.error('Error approving comment:', error);
      toast.error('Failed to approve comment');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== id));
        toast.success('Comment deleted successfully');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const filteredComments = comments.filter((comment) => {
    if (filter === 'pending') return !comment.isApproved;
    if (filter === 'approved') return comment.isApproved;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Comment Management</h1>
        <p className="text-gray-600 mt-2">Manage and moderate user comments</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'secondary'}
            className={filter === 'all' ? 'bg-[#D00614] hover:bg-[#a00510]' : ''}
          >
            All Comments ({comments.length})
          </Button>
          <Button
            onClick={() => setFilter('pending')}
            variant={filter === 'pending' ? 'default' : 'secondary'}
            className={filter === 'pending' ? 'bg-[#D00614] hover:bg-[#a00510]' : ''}
          >
            Pending ({comments.filter((c) => !c.isApproved).length})
          </Button>
          <Button
            onClick={() => setFilter('approved')}
            variant={filter === 'approved' ? 'default' : 'secondary'}
            className={filter === 'approved' ? 'bg-[#D00614] hover:bg-[#a00510]' : ''}
          >
            Approved ({comments.filter((c) => c.isApproved).length})
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center text-gray-500">
            No comments found
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{comment.userName}</h3>
                    <span className="text-sm text-gray-500">{comment.userEmail}</span>
                    {comment.isApproved ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Approved
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      News: {comment.newsId?.title || 'N/A'}
                    </span>
                    <span>
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                {!comment.isApproved && (
                  <Button
                    onClick={() => handleApprove(comment._id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    ✓ Approve
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(comment._id)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

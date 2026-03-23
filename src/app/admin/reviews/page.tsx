'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllReviews, deleteReview } from '@/actions/admin';

interface Review {
  id: string;
  rating: number;
  text: string;
  createdAt: string;
  reviewer: { id: string; name: string; avatar: string | null };
  reviewee: { id: string; name: string };
  tool: { id: string; title: string };
}

function ReviewsContent() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [page]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const result = await getAllReviews(page);
      setReviews(result.reviews as Review[]);
      setTotal(result.total);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await deleteReview(reviewId);
      loadReviews();
    } catch (error) {
      alert('Failed to delete review');
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Trust & Safety - Reviews
          </h1>
          <p className="text-[#6b6b6b]">{total} total reviews</p>
        </div>
      </div>

      <div className="bg-white border-2 border-[#d4d0c8] rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6b6b6b]">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center text-[#6b6b6b]">No reviews found</div>
        ) : (
          <div className="divide-y divide-[#f0ede8]">
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
                      {review.reviewer?.avatar ? (
                        <img src={review.reviewer.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <span className="text-[#6b6b6b] text-lg">{review.reviewer?.name?.[0] || '?'}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-[#222]">{review.reviewer?.name || 'Unknown'}</span>
                        <span className="text-[#6b6b6b] text-sm">reviewed</span>
                        <span className="font-medium text-[#222]">{review.reviewee?.name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < review.rating ? 'text-[#ffbe0b]' : 'text-[#d4d0c8]'}`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-xs text-[#6b6b6b] ml-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[#6b6b6b] mb-2">{review.text}</p>
                      <p className="text-xs text-[#6b6b6b]">
                        For tool: <span className="text-[#222]">{review.tool?.title || 'Unknown'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-xs text-[#d00000] hover:underline"
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/admin/reviews?page=${p}`}
              className={`px-4 py-2 rounded ${
                p === page ? 'bg-[#e85d04] text-white' : 'bg-white border border-[#d4d0c8] text-[#6b6b6b]'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ReviewsContent />
    </Suspense>
  );
}
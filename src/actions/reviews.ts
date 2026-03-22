'use server';

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

export async function createReview(
  bookingId: string,
  revieweeId: string,
  toolId: string | null,
  rating: number,
  text: string
) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Check if booking is completed
  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('status, renterId, ownerId')
    .eq('id', bookingId)
    .single();

  if (!booking || booking.status !== 'completed') {
    throw new Error('Can only review completed bookings');
  }

  if (booking.renterId !== userId && booking.ownerId !== userId) {
    throw new Error('Not authorized to review this booking');
  }

  // Check if user already reviewed
  const { data: existingReview } = await supabaseAdmin
    .from('reviews')
    .select('id')
    .eq('bookingId', bookingId)
    .eq('reviewerId', userId)
    .single();

  if (existingReview) {
    throw new Error('You have already reviewed this booking');
  }

  // Calculate expiration (14 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);

  // Check if the other party has already reviewed
  const otherReviewerId = booking.renterId === userId ? booking.ownerId : booking.renterId;
  const { data: otherReview } = await supabaseAdmin
    .from('reviews')
    .select('id')
    .eq('bookingId', bookingId)
    .eq('reviewerId', otherReviewerId)
    .single();

  // Create the review
  const { data: review, error } = await supabaseAdmin
    .from('reviews')
    .insert({
      bookingId,
      reviewerId: userId,
      revieweeId,
      toolId,
      rating,
      text,
      isPublic: !!otherReview, // Public if other party already reviewed
      otherReviewSubmitted: !!otherReview,
      expiresAt: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create review:', error);
    throw new Error('Failed to create review');
  }

  // If other review exists, make both public
  if (otherReview) {
    await supabaseAdmin
      .from('reviews')
      .update({ isPublic: true, otherReviewSubmitted: true })
      .eq('bookingId', bookingId);
  }

  // Update ratings
  await updateRatings(revieweeId, toolId);

  revalidatePath('/dashboard');
  revalidatePath('/tools/[id]');
  
  return review;
}

async function updateRatings(userId: string, toolId: string | null) {
  // Update user rating
  const { data: userReviews } = await supabaseAdmin
    .from('reviews')
    .select('rating')
    .eq('revieweeId', userId)
    .eq('isPublic', true);

  if (userReviews && userReviews.length > 0) {
    const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
    await supabaseAdmin
      .from('users')
      .update({
        rating: avgRating.toFixed(2),
        reviewCount: userReviews.length,
      })
      .eq('id', userId);
  }

  // Update tool rating if applicable
  if (toolId) {
    const { data: toolReviews } = await supabaseAdmin
      .from('reviews')
      .select('rating')
      .eq('toolId', toolId)
      .eq('isPublic', true);

    if (toolReviews && toolReviews.length > 0) {
      const avgRating = toolReviews.reduce((sum, r) => sum + r.rating, 0) / toolReviews.length;
      await supabaseAdmin
        .from('tools')
        .update({
          rating: avgRating.toFixed(2),
          reviewCount: toolReviews.length,
        })
        .eq('id', toolId);
    }
  }
}

export async function getPendingReviews(userId: string) {
  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select('id, status, toolId, ownerId, renterId')
    .eq('status', 'completed')
    .or(`ownerId.eq.${userId},renterId.eq.${userId}`);

  if (!bookings) return [];

  const pendingReviews = [];

  for (const booking of bookings) {
    const { data: existingReview } = await supabaseAdmin
      .from('reviews')
      .select('id')
      .eq('bookingId', booking.id)
      .eq('reviewerId', userId)
      .single();

    if (!existingReview) {
      const revieweeId = booking.ownerId === userId ? booking.renterId : booking.ownerId;
      pendingReviews.push({
        bookingId: booking.id,
        toolId: booking.toolId,
        revieweeId,
      });
    }
  }

  return pendingReviews;
}

export async function getPublicReviews(toolId?: string, userId?: string) {
  let query = supabaseAdmin
    .from('reviews')
    .select(`
      *,
      reviewer:users(id, name, avatar),
      tool:tools(id, title)
    `)
    .eq('isPublic', true)
    .order('createdAt', { ascending: false });

  if (toolId) {
    query = query.eq('toolId', toolId);
  }

  if (userId) {
    query = query.eq('revieweeId', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }

  return data || [];
}

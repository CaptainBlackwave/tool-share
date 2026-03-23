'use server';

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

export async function checkAdminRole() {
  const { userId } = await auth();
  
  if (!userId) {
    return { isAdmin: false, error: 'Not authenticated' };
  }

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (!user || user.role !== 'admin') {
    return { isAdmin: false, error: 'Not authorized' };
  }

  return { isAdmin: true, error: null };
}

export async function getDisputedBookings() {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const { data, error: dbError } = await supabaseAdmin
    .from('bookings')
    .select(`
      *,
      tool:tools(id, title, images, replacementValue),
      renter:users!renterId(id, name, avatar, email),
      owner:users!ownerId(id, name, avatar, email)
    `)
    .eq('status', 'disputed')
    .order('updatedAt', { ascending: false });

  if (dbError) {
    console.error('Failed to fetch disputed bookings:', dbError);
    return [];
  }

  return data || [];
}

export async function getBookingEvidence(bookingId: string) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select(`
      *,
      tool:tools(id, title, images, replacementValue),
      renter:users!renterId(id, name, avatar, email, phone),
      owner:users!ownerId(id, name, avatar, email, phone)
    `)
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  // Get conversation and messages
  const { data: conversation } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('bookingId', bookingId)
    .single();

  let messages = [];
  if (conversation) {
    const { data: msgs } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('conversationId', conversation.id)
      .order('createdAt', { ascending: true });
    messages = msgs || [];
  }

  return {
    booking,
    pickupPhotos: booking.pickupPhotos || [],
    returnPhotos: booking.returnPhotos || [],
    conversation,
    messages,
  };
}

export async function resolveDispute(
  bookingId: string,
  resolution: 'release_funds' | 'refund_borrower' | 'charge_damage_fee',
  notes: string
) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  // Update booking status based on resolution
  let newStatus = 'completed';
  if (resolution === 'refund_borrower') {
    newStatus = 'cancelled';
  }

  const { error: updateError } = await supabaseAdmin
    .from('bookings')
    .update({
      status: newStatus,
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (updateError) {
    console.error('Failed to update booking:', updateError);
    throw new Error('Failed to resolve dispute');
  }

  // In production, this would interact with Stripe API to:
  // - Release funds to lender (transfer)
  // - Refund borrower (refund)
  // - Charge damage fee (refund + transfer)

  console.log(`Dispute resolved: ${bookingId} - ${resolution}`);
  console.log(`Admin notes: ${notes}`);

  revalidatePath('/admin');
  revalidatePath('/dashboard');
  
  return { success: true };
}

// User Management
export async function getAllUsers(page = 1, search = '', limit = 20) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const offset = (page - 1) * limit;
  
  let query = supabaseAdmin
    .from('users')
    .select('*', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error: dbError, count } = await query;

  if (dbError) {
    console.error('Failed to fetch users:', dbError);
    throw new Error('Failed to fetch users');
  }

  return { users: data || [], total: count || 0 };
}

export async function suspendUser(userId: string, suspended: boolean) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const { error: updateError } = await supabaseAdmin
    .from('users')
    .update({ 
      updatedAt: new Date().toISOString(),
      // In a real app, we'd have an isActive field
    })
    .eq('id', userId);

  if (updateError) {
    console.error('Failed to suspend user:', updateError);
    throw new Error('Failed to suspend user');
  }

  revalidatePath('/admin/users');
  return { success: true };
}

export async function verifyUserIdentity(userId: string, verified: boolean) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const { error: updateError } = await supabaseAdmin
    .from('users')
    .update({ 
      identityVerified: verified,
      updatedAt: new Date().toISOString(),
    })
    .eq('id', userId);

  if (updateError) {
    console.error('Failed to verify user:', updateError);
    throw new Error('Failed to verify user');
  }

  revalidatePath('/admin/users');
  return { success: true };
}

// Tools Management
export async function getAllTools(page = 1, search = '', category = '', status = 'all', limit = 20) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const offset = (page - 1) * limit;
  
  let query = supabaseAdmin
    .from('tools')
    .select('*, owner:users(id, name, email)', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%`);
  }

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error: dbError, count } = await query;

  if (dbError) {
    console.error('Failed to fetch tools:', dbError);
    throw new Error('Failed to fetch tools');
  }

  return { tools: data || [], total: count || 0 };
}

export async function takedownTool(toolId: string, reason: string) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  // Soft delete by clearing images and adding a flag
  const { error: updateError } = await supabaseAdmin
    .from('tools')
    .update({
      title: '[REMOVED] Tool removed by admin',
      description: `Reason: ${reason}`,
      images: [],
      updatedAt: new Date().toISOString(),
    })
    .eq('id', toolId);

  if (updateError) {
    console.error('Failed to takedown tool:', updateError);
    throw new Error('Failed to takedown tool');
  }

  revalidatePath('/admin/tools');
  return { success: true };
}

export async function featureTool(toolId: string, featured: boolean) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  // This would require adding a 'featured' column to the tools table
  console.log(`Tool ${toolId} featured status: ${featured}`);

  revalidatePath('/admin/tools');
  return { success: true };
}

// Bookings Management
export async function getAllBookings(page = 1, status = 'all', limit = 20) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const offset = (page - 1) * limit;
  
  let query = supabaseAdmin
    .from('bookings')
    .select('*, tool:tools(id, title), renter:users!renterId(id, name, email), owner:users!ownerId(id, name, email)', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error: dbError, count } = await query;

  if (dbError) {
    console.error('Failed to fetch bookings:', dbError);
    throw new Error('Failed to fetch bookings');
  }

  return { bookings: data || [], total: count || 0 };
}

export async function forceRefundBooking(bookingId: string) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const { error: updateError } = await supabaseAdmin
    .from('bookings')
    .update({ status: 'cancelled', updatedAt: new Date().toISOString() })
    .eq('id', bookingId);

  if (updateError) {
    console.error('Failed to refund booking:', updateError);
    throw new Error('Failed to refund booking');
  }

  // In production, this would interact with Stripe API
  console.log(`Admin force-refunded booking: ${bookingId}`);

  revalidatePath('/admin/bookings');
  return { success: true };
}

export async function forceCompleteBooking(bookingId: string) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const { error: updateError } = await supabaseAdmin
    .from('bookings')
    .update({ status: 'completed', updatedAt: new Date().toISOString() })
    .eq('id', bookingId);

  if (updateError) {
    console.error('Failed to complete booking:', updateError);
    throw new Error('Failed to complete booking');
  }

  // In production, this would trigger payout to lender
  console.log(`Admin force-completed booking: ${bookingId}`);

  revalidatePath('/admin/bookings');
  return { success: true };
}

// Reviews Management
export async function getAllReviews(page = 1, limit = 20) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  const offset = (page - 1) * limit;
  
  const { data, error: dbError, count } = await supabaseAdmin
    .from('reviews')
    .select('*, reviewer:users(id, name, avatar), reviewee:users(id, name), tool:tools(id, title)', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range(offset, offset + limit - 1);

  if (dbError) {
    console.error('Failed to fetch reviews:', dbError);
    throw new Error('Failed to fetch reviews');
  }

  return { reviews: data || [], total: count || 0 };
}

export async function deleteReview(reviewId: string) {
  const { isAdmin, error } = await checkAdminRole();
  
  if (!isAdmin) {
    throw new Error(error || 'Not authorized');
  }

  // First get the review to update tool/user ratings
  const { data: review } = await supabaseAdmin
    .from('reviews')
    .select('toolId, revieweeId')
    .eq('id', reviewId)
    .single();

  const { error: deleteError } = await supabaseAdmin
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  if (deleteError) {
    console.error('Failed to delete review:', deleteError);
    throw new Error('Failed to delete review');
  }

  // Recalculate ratings would go here
  if (review?.toolId) {
    const { data: toolReviews } = await supabaseAdmin
      .from('reviews')
      .select('rating')
      .eq('toolId', review.toolId);
    
    if (toolReviews && toolReviews.length > 0) {
      const avgRating = toolReviews.reduce((sum, r) => sum + r.rating, 0) / toolReviews.length;
      await supabaseAdmin
        .from('tools')
        .update({ rating: avgRating.toFixed(2), reviewCount: toolReviews.length })
        .eq('id', review.toolId);
    }
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}

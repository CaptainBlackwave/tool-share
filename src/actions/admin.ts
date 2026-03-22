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

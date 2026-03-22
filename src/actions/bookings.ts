'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/client';
import { createCheckoutSession } from '@/lib/stripe/server';
import { revalidatePath } from 'next/cache';
import { 
  isValidStatusTransition, 
  getDaysBetween,
  type BookingStatus 
} from '@/lib/dates';
import { checkAndCreateBooking } from '@/lib/availability';

export async function createBooking(formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const toolId = formData.get('toolId') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const pickupMethod = formData.get('pickupMethod') as string;
  const pickupLocation = formData.get('pickupLocation') as string;

  if (!toolId || !startDate || !endDate) {
    throw new Error('Missing required fields');
  }

  const { data: tool } = await supabaseAdmin
    .from('tools')
    .select('*')
    .eq('id', toolId)
    .single();

  if (!tool) {
    throw new Error('Tool not found');
  }

  if (tool.ownerId === userId) {
    throw new Error('Cannot book your own tool');
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start < new Date()) {
    throw new Error('Cannot book in the past');
  }

  if (end < start) {
    throw new Error('End date must be after start date');
  }

  const days = getDaysBetween(start, end);
  const pricePerDay = parseFloat(tool.price_per_day);
  const subtotal = days * pricePerDay;
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;
  const deposit = parseFloat(tool.replacement_value);

  const result = await checkAndCreateBooking(
    toolId,
    userId,
    start,
    end,
    total,
    deposit,
    platformFee,
    pickupMethod,
    pickupLocation
  );

  if (!result.success) {
    throw new Error(result.error || 'Failed to create booking');
  }

  const owner = await supabaseAdmin
    .from('users')
    .select('stripe_account_id, stripe_account_status')
    .eq('id', tool.ownerId)
    .single();

  if (owner.data?.stripe_account_id && owner.data?.stripe_account_status === 'active') {
    const session = await createCheckoutSession({
      toolOwnerStripeAccountId: owner.data.stripe_account_id,
      amount: Math.round(total * 100),
      deposit: Math.round(deposit * 100),
      toolId,
      renterId: userId,
    });

    if (session.url) {
      redirect(session.url);
    }
  }

  revalidatePath('/dashboard');
  redirect('/dashboard?booking=created');
}

export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus
) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('renterId, ownerId, status')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  const isAuthorized = booking.renterId === userId || booking.ownerId === userId;
  if (!isAuthorized) {
    throw new Error('Not authorized');
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, newStatus)) {
    throw new Error(`Invalid status transition from ${booking.status} to ${newStatus}`);
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: newStatus,
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to update booking:', error);
    throw new Error('Failed to update booking');
  }

  revalidatePath('/dashboard');
  revalidatePath('/messages');
}

export async function acceptBooking(bookingId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('ownerId, status')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.ownerId !== userId) {
    throw new Error('Only the owner can accept this booking');
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, 'accepted')) {
    throw new Error(`Cannot accept a booking with status: ${booking.status}`);
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'accepted',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to accept booking:', error);
    throw new Error('Failed to accept booking');
  }

  revalidatePath('/dashboard');
  revalidatePath('/messages');
}

export async function rejectBooking(bookingId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('ownerId, status')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.ownerId !== userId) {
    throw new Error('Only the owner can reject this booking');
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, 'rejected')) {
    throw new Error(`Cannot reject a booking with status: ${booking.status}`);
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'rejected',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to reject booking:', error);
    throw new Error('Failed to reject booking');
  }

  revalidatePath('/dashboard');
  revalidatePath('/messages');
}

export async function startRental(bookingId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('ownerId, status, startDate')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  const isAuthorized = booking.ownerId === userId;
  if (!isAuthorized) {
    throw new Error('Only the owner can start the rental');
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, 'active')) {
    throw new Error(`Cannot start rental with status: ${booking.status}`);
  }

  const startDate = new Date(booking.startDate);
  const now = new Date();
  
  if (now < startDate) {
    throw new Error('Rental cannot start before the booking start date');
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'active',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to start rental:', error);
    throw new Error('Failed to start rental');
  }

  revalidatePath('/dashboard');
}

export async function completeRental(bookingId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('ownerId, renterId, status, endDate')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  const isAuthorized = booking.ownerId === userId || booking.renterId === userId;
  if (!isAuthorized) {
    throw new Error('Not authorized to complete this rental');
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, 'completed')) {
    throw new Error(`Cannot complete a rental with status: ${booking.status}`);
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'completed',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to complete rental:', error);
    throw new Error('Failed to complete rental');
  }

  revalidatePath('/dashboard');
}

export async function disputeRental(bookingId: string, reason: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('ownerId, renterId, status')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  const isAuthorized = booking.ownerId === userId || booking.renterId === userId;
  if (!isAuthorized) {
    throw new Error('Not authorized to dispute this rental');
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, 'disputed')) {
    throw new Error(`Cannot dispute a rental with status: ${booking.status}`);
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'disputed',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to dispute rental:', error);
    throw new Error('Failed to dispute rental');
  }

  revalidatePath('/dashboard');
}

export async function cancelBooking(bookingId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('renterId, ownerId, status, startDate')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    throw new Error('Booking not found');
  }

  const isAuthorized = booking.renterId === userId || booking.ownerId === userId;
  if (!isAuthorized) {
    throw new Error('Not authorized to cancel this booking');
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, 'cancelled')) {
    throw new Error(`Cannot cancel a booking with status: ${booking.status}`);
  }

  const startDate = new Date(booking.startDate);
  const now = new Date();
  const daysUntilRental = getDaysBetween(now, startDate);

  let refundMessage = '';
  if (booking.renterId === userId && booking.status === 'accepted') {
    if (daysUntilRental >= 7) {
      refundMessage = 'Full refund will be issued';
    } else if (daysUntilRental >= 3) {
      refundMessage = '50% refund will be issued';
    } else {
      refundMessage = 'No refund available for bookings within 3 days';
    }
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to cancel booking:', error);
    throw new Error('Failed to cancel booking');
  }

  revalidatePath('/dashboard');
  
  return { success: true, refundMessage };
}

export async function getBookingById(bookingId: string) {
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*, tool:tools(*), renter:users!renterId(*), owner:users!ownerId(*)')
    .eq('id', bookingId)
    .single();

  if (error) {
    console.error('Failed to fetch booking:', error);
    throw new Error('Failed to fetch booking');
  }

  return data;
}

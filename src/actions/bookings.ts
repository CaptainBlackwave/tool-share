'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/client';
import { createCheckoutSession } from '@/lib/stripe/server';
import { revalidatePath } from 'next/cache';

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

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const pricePerDay = parseFloat(tool.price_per_day);
  const subtotal = days * pricePerDay;
  const platformFee = subtotal * 0.05;
  const total = subtotal + platformFee;
  const deposit = parseFloat(tool.replacement_value);

  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      toolId,
      renterId: userId,
      ownerId: tool.ownerId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      totalPrice: total.toString(),
      deposit: deposit.toString(),
      platformFee: platformFee.toString(),
      pickupMethod,
      pickupLocation,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create booking:', error);
    throw new Error('Failed to create booking');
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
  status: 'confirmed' | 'active' | 'completed' | 'disputed' | 'cancelled'
) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('renterId, ownerId')
    .eq('id', bookingId)
    .single();

  if (!booking || (booking.renterId !== userId && booking.ownerId !== userId)) {
    throw new Error('Not authorized');
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status,
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

export async function confirmBooking(bookingId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('ownerId, toolId')
    .eq('id', bookingId)
    .single();

  if (!booking || booking.ownerId !== userId) {
    throw new Error('Not authorized');
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'confirmed',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Failed to confirm booking:', error);
    throw new Error('Failed to confirm booking');
  }

  revalidatePath('/dashboard');
  revalidatePath('/messages');
}

export async function cancelBooking(bookingId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: booking } = await supabaseAdmin
    .from('bookings')
    .select('renterId, ownerId')
    .eq('id', bookingId)
    .single();

  if (!booking || (booking.renterId !== userId && booking.ownerId !== userId)) {
    throw new Error('Not authorized');
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
}

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST() {
  const now = new Date().toISOString();
  
  // Find pending bookings older than 24 hours
  const { data: expiredBookings, error } = await supabaseAdmin
    .from('bookings')
    .select('id, stripePaymentIntentId')
    .eq('status', 'pending')
    .lt('expiresAt', now);

  if (error) {
    console.error('Error finding expired bookings:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  if (!expiredBookings || expiredBookings.length === 0) {
    return NextResponse.json({ 
      message: 'No expired bookings found',
      processed: 0 
    });
  }

  // Update status to rejected
  const { error: updateError } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'rejected',
      updatedAt: now,
    })
    .eq('status', 'pending')
    .lt('expiresAt', now);

  if (updateError) {
    console.error('Error updating bookings:', updateError);
    return NextResponse.json({ error: 'Failed to update bookings' }, { status: 500 });
  }

  // In production, also cancel the Stripe payment intent to release the hold
  // const stripe = getStripe();
  // for (const booking of expiredBookings) {
  //   if (booking.stripePaymentIntentId) {
  //     await stripe.paymentIntents.cancel(booking.stripePaymentIntentId);
  //   }
  // }

  return NextResponse.json({ 
    message: 'Expired bookings rejected',
    processed: expiredBookings.length 
  });
}

// Also allow GET for manual triggers
export async function GET() {
  return POST();
}

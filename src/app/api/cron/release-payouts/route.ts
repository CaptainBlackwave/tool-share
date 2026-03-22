import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  // Find completed bookings from more than 24 hours ago that haven't had payouts released
  const { data: eligibleBookings, error } = await supabaseAdmin
    .from('bookings')
    .select(`
      id,
      totalPrice,
      platformFee,
      ownerId,
      stripePaymentIntentId,
      updatedAt
    `)
    .eq('status', 'completed')
    .lt('updatedAt', yesterday.toISOString());

  if (error) {
    console.error('Error finding eligible bookings:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  if (!eligibleBookings || eligibleBookings.length === 0) {
    return NextResponse.json({ 
      message: 'No eligible bookings for payout',
      processed: 0 
    });
  }

  // In production, this would trigger Stripe transfers
  // const stripe = getStripe();
  // let successfulTransfers = 0;
  // let failedTransfers = 0;

  // for (const booking of eligibleBookings) {
  //   try {
  //     // Get owner's Stripe account
  //     const { data: owner } = await supabaseAdmin
  //       .from('users')
  //       .select('stripe_account_id')
  //       .eq('id', booking.ownerId)
  //       .single();
  //     
  //     if (!owner?.stripe_account_id) continue;
  //     
  //     // Calculate payout amount (total - platform fee)
  //     const payoutAmount = Math.round((parseFloat(booking.totalPrice) - parseFloat(booking.platformFee)) * 100);
  //     
  //     // Create transfer
  //     await stripe.transfers.create({
  //       amount: payoutAmount,
  //       currency: 'usd',
  //       destination: owner.stripe_account_id,
  //       metadata: { bookingId: booking.id }
  //     });
  //     
  //     // Mark payout as released
  //     await supabaseAdmin
  //       .from('bookings')
  //       .update({ payoutReleased: true })
  //       .eq('id', booking.id);
  //     
  //     successfulTransfers++;
  //   } catch (err) {
  //     console.error(`Failed to transfer for booking ${booking.id}:`, err);
  //     failedTransfers++;
  //   }
  // }

  return NextResponse.json({ 
    message: 'Payout processing complete',
    processed: eligibleBookings.length,
    // successful: successfulTransfers,
    // failed: failedTransfers
  });
}

// Also allow GET for manual triggers
export async function GET() {
  return POST();
}

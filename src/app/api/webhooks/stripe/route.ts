import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  const stripeInstance = getStripe();
  let event: Stripe.Event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.payment_status === 'paid') {
        const toolId = session.metadata?.toolId;
        const renterId = session.metadata?.renterId;

        if (toolId && renterId) {
          const { data: tool } = await supabaseAdmin
            .from('tools')
            .select('ownerId')
            .eq('id', toolId)
            .single();

          if (tool) {
            await supabaseAdmin
              .from('bookings')
              .update({
                stripePaymentIntentId: session.payment_intent,
                stripePaymentStatus: 'paid',
                status: 'confirmed',
              })
              .eq('toolId', toolId)
              .eq('renterId', renterId);
          }
        }
      }
      break;
    }

    case 'account.updated': {
      const account = event.data.object as Stripe.Account;
      
      if (account.id) {
        const status = account.charges_enabled ? 'active' : 'pending';
        
        await supabaseAdmin
          .from('users')
          .update({
            stripeAccountStatus: status,
          })
          .eq('stripe_account_id', account.id);
      }
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      if (paymentIntent.metadata.toolId && paymentIntent.metadata.renterId) {
        await supabaseAdmin
          .from('bookings')
          .update({
            stripePaymentStatus: 'authorized',
          })
          .eq('stripePaymentIntentId', paymentIntent.id);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      if (paymentIntent.metadata.toolId && paymentIntent.metadata.renterId) {
        await supabaseAdmin
          .from('bookings')
          .update({
            stripePaymentStatus: 'failed',
            status: 'cancelled',
          })
          .eq('stripePaymentIntentId', paymentIntent.id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

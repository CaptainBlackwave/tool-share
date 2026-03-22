import Stripe from 'stripe';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-02-25.clover',
    typescript: true,
  });
};

export { getStripe };

export const stripe = {
  get instance() {
    return getStripe();
  },
};

export async function createConnectAccount(email: string, country: string = 'US') {
  const stripeInstance = getStripe();
  const account = await stripeInstance.accounts.create({
    type: 'express',
    country,
    email,
    capabilities: {
      transfers: { requested: true },
    },
  });
  return account;
}

export async function createAccountLink(accountId: string, returnUrl: string, refreshUrl: string) {
  const stripeInstance = getStripe();
  const accountLink = await stripeInstance.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });
  return accountLink;
}

export async function getAccountStatus(accountId: string) {
  const stripeInstance = getStripe();
  const account = await stripeInstance.accounts.retrieve(accountId);
  return {
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
    requirements: account.requirements,
  };
}

export async function createCheckoutSession({
  toolOwnerStripeAccountId,
  amount,
  deposit,
  toolId,
  renterId,
  metadata,
}: {
  toolOwnerStripeAccountId: string;
  amount: number;
  deposit: number;
  toolId: string;
  renterId: string;
  metadata?: Record<string, string>;
}) {
  const stripeInstance = getStripe();
  const platformFee = Math.round(amount * 0.05);

  const session = await stripeInstance.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tool Rental',
            metadata: {
              toolId,
              renterId,
            },
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: platformFee,
      transfer_data: {
        destination: toolOwnerStripeAccountId,
      },
      metadata: {
        toolId,
        renterId,
        deposit: deposit.toString(),
        ...metadata,
      },
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/browse?canceled=true`,
    metadata: {
      toolId,
      renterId,
      deposit: deposit.toString(),
      ...metadata,
    },
  });

  return session;
}

export async function authorizePayment(paymentIntentId: string) {
  const stripeInstance = getStripe();
  const paymentIntent = await stripeInstance.paymentIntents.update(paymentIntentId, {
    capture_method: 'manual',
  });
  return paymentIntent;
}

export async function capturePayment(paymentIntentId: string) {
  const stripeInstance = getStripe();
  const paymentIntent = await stripeInstance.paymentIntents.capture(paymentIntentId);
  return paymentIntent;
}

export async function createPayout(accountId: string, amount: number) {
  const stripeInstance = getStripe();
  const payout = await stripeInstance.payouts.create(
    {
      amount,
      currency: 'usd',
    },
    {
      stripeAccount: accountId,
    }
  );
  return payout;
}

'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/client';
import { createConnectAccount, createAccountLink, getAccountStatus } from '@/lib/stripe/server';
import { revalidatePath } from 'next/cache';

export async function startStripeOnboarding() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('stripe_account_id, email')
    .eq('id', userId)
    .single();

  if (existingUser?.stripe_account_id) {
    const status = await getAccountStatus(existingUser.stripe_account_id);
    
    if (status.detailsSubmitted) {
      redirect('/dashboard?stripe=already_onboarded');
    }

    const accountLink = await createAccountLink(
      existingUser.stripe_account_id,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe=success`,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe=refresh`
    );

    redirect(accountLink.url);
  }

  const email = existingUser?.email;
  
  if (!email) {
    throw new Error('No email found');
  }

  const account = await createConnectAccount(email);
  
  await supabaseAdmin
    .from('users')
    .update({
      stripe_account_id: account.id,
      stripe_account_status: 'pending',
    })
    .eq('id', userId);

  const accountLink = await createAccountLink(
    account.id,
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe=success`,
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?stripe=refresh`
  );

  redirect(accountLink.url);
}

export async function checkStripeStatus() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('stripe_account_id, stripe_account_status')
    .eq('id', userId)
    .single();

  if (!user?.stripe_account_id) {
    return { status: 'not_started', chargesEnabled: false, payoutsEnabled: false };
  }

  if (user.stripe_account_status === 'active') {
    return { status: 'active', chargesEnabled: true, payoutsEnabled: true };
  }

  const status = await getAccountStatus(user.stripe_account_id);
  
  const newStatus = status.chargesEnabled && status.payoutsEnabled ? 'active' : 'pending';
  
  await supabaseAdmin
    .from('users')
    .update({
      stripe_account_status: newStatus,
    })
    .eq('id', userId);

  revalidatePath('/dashboard');

  return {
    status: newStatus,
    chargesEnabled: status.chargesEnabled,
    payoutsEnabled: status.payoutsEnabled,
  };
}

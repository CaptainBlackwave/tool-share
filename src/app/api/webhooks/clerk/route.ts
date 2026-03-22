import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

interface WebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
    }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    phone_numbers?: Array<{
      phone_number: string;
    }>;
    public_metadata?: {
      mode?: 'borrower' | 'lender' | 'both';
    };
  };
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, phone_numbers, public_metadata } = evt.data;

    const email = email_addresses?.[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ') || null;
    const phone = phone_numbers?.[0]?.phone_number || null;
    const mode = public_metadata?.mode || 'both';

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('users')
      .upsert(
        {
          id,
          email,
          name,
          avatar: image_url,
          phone,
          mode,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.error('Failed to upsert user:', error);
      return NextResponse.json(
        { error: 'Failed to sync user' },
        { status: 500 }
      );
    }

    console.log(`User ${id} synced to Supabase`);
  }

  return NextResponse.json({ success: true });
}

'use server';

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function getUserBookings() {
  const { userId } = await auth();
  
  if (!userId) {
    return { asRenter: [], asOwner: [], error: 'Unauthorized' };
  }

  const { data: asRenter, error: renterError } = await supabaseAdmin
    .from('bookings')
    .select(`
      *,
      tool:tools(id, title, images, pricePerDay, ownerId),
      owner:users!ownerId(id, name, avatar)
    `)
    .eq('renterId', userId)
    .order('createdAt', { ascending: false });

  const { data: asOwner, error: ownerError } = await supabaseAdmin
    .from('bookings')
    .select(`
      *,
      tool:tools(id, title, images, pricePerDay),
      renter:users!renterId(id, name, avatar)
    `)
    .eq('ownerId', userId)
    .order('createdAt', { ascending: false });

  return {
    asRenter: asRenter || [],
    asOwner: asOwner || [],
    error: renterError?.message || ownerError?.message || null,
  };
}

export async function getUserTools() {
  const { userId } = await auth();
  
  if (!userId) {
    return { tools: [], error: 'Unauthorized' };
  }

  const { data: tools, error } = await supabaseAdmin
    .from('tools')
    .select(`
      *,
      bookings:bookings(count, status)
    `)
    .eq('ownerId', userId)
    .order('createdAt', { ascending: false });

  return { tools: tools || [], error: error?.message || null };
}

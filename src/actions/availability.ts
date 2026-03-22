'use server';

import { supabaseAdmin } from '@/lib/supabase/client';

export async function getToolWithAvailability(toolId: string) {
  const { data: tool, error: toolError } = await supabaseAdmin
    .from('tools')
    .select('*')
    .eq('id', toolId)
    .single();

  if (toolError || !tool) {
    return { tool: null, blockedDates: [], error: toolError?.message };
  }

  const { data: bookings, error: bookingsError } = await supabaseAdmin
    .from('bookings')
    .select('id, startDate, endDate, status')
    .eq('toolId', toolId)
    .in('status', ['pending', 'accepted', 'active'])
    .order('startDate', { ascending: true });

  if (bookingsError) {
    return { tool, blockedDates: [], error: bookingsError.message };
  }

  const blockedDates = (bookings || []).map(b => ({
    start: new Date(b.startDate),
    end: new Date(b.endDate),
  }));

  return { tool, blockedDates, error: null };
}

export async function getBookingWithDetails(bookingId: string) {
  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .select(`
      *,
      tool:tools(*),
      renter:users!renterId(id, name, avatar, phone),
      owner:users!ownerId(id, name, avatar, phone)
    `)
    .eq('id', bookingId)
    .single();

  if (error) {
    return { booking: null, error: error.message };
  }

  return { booking, error: null };
}

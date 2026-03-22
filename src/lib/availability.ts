import { supabaseAdmin } from '@/lib/supabase/client';
import { doDateRangesOverlap, addDays, type BookingStatus } from '@/lib/dates';

interface Booking {
  id: string;
  startDate: Date | string;
  endDate: Date | string;
  status: BookingStatus;
}

export async function getToolAvailability(toolId: string): Promise<Booking[]> {
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('id, startDate, endDate, status')
    .eq('toolId', toolId)
    .in('status', ['pending', 'accepted', 'active'])
    .order('startDate', { ascending: true });

  if (error) {
    console.error('Failed to fetch bookings:', error);
    throw new Error('Failed to fetch bookings');
  }

  return (data || []).map(booking => ({
    ...booking,
    startDate: new Date(booking.startDate),
    endDate: new Date(booking.endDate),
  }));
}

export async function checkDatesAvailable(
  toolId: string,
  startDate: Date,
  endDate: Date,
  bufferDays: number = 0
): Promise<{ available: boolean; conflictingBookings: Booking[] }> {
  const bookings = await getToolAvailability(toolId);

  const requestedStart = new Date(startDate);
  const requestedEnd = addDays(new Date(endDate), bufferDays);

  const conflictingBookings: Booking[] = [];

  for (const booking of bookings) {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);

    if (doDateRangesOverlap(requestedStart, requestedEnd, bookingStart, bookingEnd)) {
      conflictingBookings.push(booking);
    }
  }

  return {
    available: conflictingBookings.length === 0,
    conflictingBookings,
  };
}

export async function checkAndCreateBooking(
  toolId: string,
  renterId: string,
  startDate: Date,
  endDate: Date,
  totalPrice: number,
  deposit: number,
  platformFee: number,
  pickupMethod: string,
  pickupLocation?: string
): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  const { data: tool } = await supabaseAdmin
    .from('tools')
    .select('ownerId, bufferDays')
    .eq('id', toolId)
    .single();

  if (!tool) {
    return { success: false, error: 'Tool not found' };
  }

  if (tool.ownerId === renterId) {
    return { success: false, error: 'Cannot book your own tool' };
  }

  const bufferDays = tool.bufferDays || 0;
  const availability = await checkDatesAvailable(toolId, startDate, endDate, bufferDays);

  if (!availability.available) {
    return { 
      success: false, 
      error: `Dates are not available. ${availability.conflictingBookings.length} booking(s) conflict.` 
    };
  }

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .insert({
      toolId,
      renterId,
      ownerId: tool.ownerId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalPrice: totalPrice.toString(),
      deposit: deposit.toString(),
      platformFee: platformFee.toString(),
      status: 'pending',
      pickupMethod,
      pickupLocation,
      expiresAt: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create booking:', error);
    return { success: false, error: 'Failed to create booking' };
  }

  return { success: true, bookingId: booking.id };
}

export async function getBlockedDatesForTool(
  toolId: string
): Promise<Array<{ start: Date; end: Date }>> {
  const bookings = await getToolAvailability(toolId);
  
  const { data: tool } = await supabaseAdmin
    .from('tools')
    .select('bufferDays')
    .eq('id', toolId)
    .single();

  const bufferDays = tool?.bufferDays || 0;

  return bookings.map(booking => ({
    start: new Date(booking.startDate),
    end: addDays(new Date(booking.endDate), bufferDays),
  }));
}

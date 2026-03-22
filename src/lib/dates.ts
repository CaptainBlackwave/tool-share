export type BookingStatus = 
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'cancelled'
  | 'active'
  | 'completed'
  | 'disputed';

export const VALID_STATUS_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ['accepted', 'rejected', 'cancelled'],
  accepted: ['active', 'cancelled', 'disputed'],
  rejected: [],
  cancelled: [],
  active: ['completed', 'disputed'],
  completed: [],
  disputed: ['completed', 'cancelled'],
};

export function isValidStatusTransition(
  currentStatus: BookingStatus,
  newStatus: BookingStatus
): boolean {
  return VALID_STATUS_TRANSITIONS[currentStatus]?.includes(newStatus) ?? false;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function subtractDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

export function getDaysBetween(start: Date, end: Date): number {
  const diffTime = end.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const dateTime = date.getTime();
  const startTime = new Date(start).setHours(0, 0, 0, 0);
  const endTime = new Date(end).setHours(23, 59, 59, 999);
  return dateTime >= startTime && dateTime <= endTime;
}

export function doDateRangesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 <= end2 && end1 >= start2;
}

export function toUTC(date: string | Date): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  return new Date(d.toISOString());
}

export function toLocalDate(utcDate: Date, timezone?: string): Date {
  return utcDate;
}

export function formatDate(date: Date | string, timezone?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: timezone,
  });
}

export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string,
  timezone?: string
): string {
  const start = formatDate(startDate, timezone);
  const end = formatDate(endDate, timezone);
  return `${start} - ${end}`;
}

export function getBlockedDateRanges(
  bookings: Array<{ startDate: Date | string; endDate: Date | string; status: BookingStatus }>,
  bufferDays: number = 0
): Array<{ start: Date; end: Date }> {
  const activeStatuses: BookingStatus[] = ['accepted', 'active'];
  
  const activeBookings = bookings.filter(b => activeStatuses.includes(b.status));
  
  return activeBookings.map(booking => {
    const start = new Date(booking.startDate);
    const end = addDays(new Date(booking.endDate), bufferDays);
    return { start, end };
  });
}

export function isDateAvailable(
  date: Date,
  blockedRanges: Array<{ start: Date; end: Date }>
): boolean {
  return !blockedRanges.some(range => isDateInRange(date, range.start, range.end));
}

export function getAvailableDates(
  start: Date,
  end: Date,
  blockedRanges: Array<{ start: Date; end: Date }>
): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);
  
  while (current <= end) {
    if (isDateAvailable(current, blockedRanges)) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

export function isWithin24Hours(date: Date): boolean {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const hours = diff / (1000 * 60 * 60);
  return hours > 0 && hours <= 24;
}

export function calculateRefundAmount(
  totalPrice: number,
  startDate: Date,
  cancellationDate: Date = new Date()
): { refundable: number; platformFee: number } {
  const daysUntilRental = getDaysBetween(cancellationDate, startDate);
  const platformFee = totalPrice * 0.05;
  
  if (daysUntilRental >= 7) {
    return { refundable: totalPrice, platformFee: 0 };
  } else if (daysUntilRental >= 3) {
    return { refundable: totalPrice * 0.5, platformFee: 0 };
  } else {
    return { refundable: 0, platformFee };
  }
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllBookings, forceRefundBooking, forceCompleteBooking } from '@/actions/admin';

interface Booking {
  id: string;
  status: string;
  totalPrice: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  tool: { id: string; title: string };
  renter: { id: string; name: string; email: string };
  owner: { id: string; name: string; email: string };
}

function BookingsContent() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const status = searchParams.get('status') || 'all';
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(status);

  const statuses = ['all', 'pending', 'accepted', 'active', 'completed', 'disputed', 'cancelled', 'rejected'];

  useEffect(() => {
    loadBookings();
  }, [page, status]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const result = await getAllBookings(page, statusFilter);
      setBookings(result.bookings as Booking[]);
      setTotal(result.total);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('status', newStatus);
    url.searchParams.set('page', '1');
    window.location.href = url.toString();
  };

  const handleRefund = async (bookingId: string) => {
    if (!confirm('Are you sure you want to refund this booking?')) return;
    
    try {
      await forceRefundBooking(bookingId);
      loadBookings();
    } catch (error) {
      alert('Failed to refund booking');
    }
  };

  const handleComplete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to force-complete this booking?')) return;
    
    try {
      await forceCompleteBooking(bookingId);
      loadBookings();
    } catch (error) {
      alert('Failed to complete booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#ffbe0b]/20 text-[#b38600]';
      case 'accepted': return 'bg-[#2d6a4f]/20 text-[#2d6a4f]';
      case 'active': return 'bg-[#2d6a4f] text-white';
      case 'completed': return 'bg-[#2d6a4f]/20 text-[#2d6a4f]';
      case 'disputed': return 'bg-[#d00000]/20 text-[#d00000]';
      case 'cancelled': return 'bg-[#6b6b6b]/20 text-[#6b6b6b]';
      case 'rejected': return 'bg-[#6b6b6b]/20 text-[#6b6b6b]';
      default: return 'bg-[#f0ede8] text-[#6b6b6b]';
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Bookings & Transactions
          </h1>
          <p className="text-[#6b6b6b]">{total} total bookings</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              statusFilter === s
                ? 'bg-[#e85d04] text-white'
                : 'bg-white border border-[#d4d0c8] text-[#6b6b6b] hover:border-[#e85d04]'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white border-2 border-[#d4d0c8] rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6b6b6b]">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#faf9f7]">
                <tr>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Booking ID</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Tool</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Renter</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Owner</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Dates</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Amount</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Status</th>
                  <th className="text-left p-4 text-[#6b6b6b] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-[#f0ede8]">
                    <td className="p-4">
                      <p className="font-mono text-xs text-[#6b6b6b]">{booking.id.slice(0, 8)}...</p>
                    </td>
                    <td className="p-4">
                      <p className="text-[#222] max-w-xs truncate">{booking.tool?.title || 'Unknown'}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-[#222]">{booking.renter?.name || 'Unknown'}</p>
                      <p className="text-xs text-[#6b6b6b]">{booking.renter?.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-[#222]">{booking.owner?.name || 'Unknown'}</p>
                      <p className="text-xs text-[#6b6b6b]">{booking.owner?.email}</p>
                    </td>
                    <td className="p-4 text-[#6b6b6b]">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-[#e85d04] font-medium">
                      ${parseFloat(booking.totalPrice).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleRefund(booking.id)}
                            className="text-xs text-[#d00000] hover:underline"
                          >
                            Refund
                          </button>
                        )}
                        {booking.status === 'active' && (
                          <button
                            onClick={() => handleComplete(booking.id)}
                            className="text-xs text-[#2d6a4f] hover:underline"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/admin/bookings?page=${p}&status=${status}`}
              className={`px-4 py-2 rounded ${
                p === page ? 'bg-[#e85d04] text-white' : 'bg-white border border-[#d4d0c8] text-[#6b6b6b]'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <BookingsContent />
    </Suspense>
  );
}
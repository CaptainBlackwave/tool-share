'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { getDisputedBookings, getBookingEvidence, resolveDispute } from '@/actions/admin';

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [disputedBookings, setDisputedBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      loadDisputedBookings();
    }
  }, [isLoaded, user]);

  const loadDisputedBookings = async () => {
    try {
      const bookings = await getDisputedBookings();
      setDisputedBookings(bookings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (bookingId: string, resolution: 'release_funds' | 'refund_borrower' | 'charge_damage_fee') => {
    const notes = prompt('Enter resolution notes:');
    if (!notes) return;

    try {
      await resolveDispute(bookingId, resolution, notes);
      loadDisputedBookings();
      setSelectedBooking(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!isLoaded || loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#d00000] mb-2">Access Denied</h1>
          <p className="text-[#6b6b6b]">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] py-8">
        <div className="container-main">
          <h1 className="text-2xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
            Admin Dashboard
          </h1>
          <p className="text-white/60">Dispute Resolution Center</p>
        </div>
      </div>

      <div className="container-main py-8">
        <h2 className="text-lg font-medium mb-4">
          Disputed Bookings ({disputedBookings.length})
        </h2>

        {disputedBookings.length === 0 ? (
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-8 text-center">
            <svg className="w-12 h-12 text-[#2d6a4f] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-[#6b6b6b]">No disputed bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {disputedBookings.map((booking) => (
              <div key={booking.id} className="bg-white border-2 border-[#d00000] rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {booking.tool?.images?.[0] && (
                    <img
                      src={booking.tool.images[0]}
                      alt={booking.tool.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{booking.tool?.title}</h3>
                    <p className="text-sm text-[#6b6b6b]">
                      Between {booking.owner?.name} and {booking.renter?.name}
                    </p>
                    <p className="text-sm text-[#6b6b6b]">
                      Value: ${booking.tool?.replacementValue}
                    </p>
                    <p className="text-xs text-[#d00000] mt-2">
                      Disputed on {new Date(booking.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="btn btn-outline py-2 px-4 text-sm"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Evidence Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-medium">Dispute Evidence</h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-[#6b6b6b] hover:text-[#222] text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pickup Photos */}
                  <div>
                    <h3 className="font-medium mb-2">Pickup Photos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {(selectedBooking.pickupPhotos || []).map((photo: string, idx: number) => (
                        <img key={idx} src={photo} alt={`Pickup ${idx + 1}`} className="rounded-lg" />
                      ))}
                      {(!selectedBooking.pickupPhotos || selectedBooking.pickupPhotos.length === 0) && (
                        <p className="text-[#6b6b6b] text-sm">No pickup photos</p>
                      )}
                    </div>
                  </div>

                  {/* Return Photos */}
                  <div>
                    <h3 className="font-medium mb-2">Return Photos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {(selectedBooking.returnPhotos || []).map((photo: string, idx: number) => (
                        <img key={idx} src={photo} alt={`Return ${idx + 1}`} className="rounded-lg" />
                      ))}
                      {(!selectedBooking.returnPhotos || selectedBooking.returnPhotos.length === 0) && (
                        <p className="text-[#6b6b6b] text-sm">No return photos</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 p-4 bg-[#f0ede8] rounded-lg">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#6b6b6b]">Owner</p>
                      <p>{selectedBooking.owner?.name}</p>
                      <p>{selectedBooking.owner?.email}</p>
                    </div>
                    <div>
                      <p className="text-[#6b6b6b]">Renter</p>
                      <p>{selectedBooking.renter?.name}</p>
                      <p>{selectedBooking.renter?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col md:flex-row gap-3">
                  <button
                    onClick={() => handleResolve(selectedBooking.id, 'release_funds')}
                    className="btn btn-primary flex-1"
                  >
                    Release Funds to Lender
                  </button>
                  <button
                    onClick={() => handleResolve(selectedBooking.id, 'refund_borrower')}
                    className="btn bg-[#2d6a4f] text-white flex-1"
                  >
                    Refund Borrower
                  </button>
                  <button
                    onClick={() => handleResolve(selectedBooking.id, 'charge_damage_fee')}
                    className="btn bg-[#d00000] text-white flex-1"
                  >
                    Charge Damage Fee
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

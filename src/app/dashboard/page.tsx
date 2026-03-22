'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { BookingCard } from '@/components/ui/HandoffProtocol';
import { getUserBookings, getUserTools } from '@/actions/dashboard';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'listings' | 'rentals' | 'earnings'>('listings');
  const [viewAs, setViewAs] = useState<'lending' | 'borrowing'>('lending');
  const [bookings, setBookings] = useState<any[]>([]);
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      loadData();
    }
  }, [isLoaded, user]);

  const loadData = async () => {
    const [bookingsData, toolsData] = await Promise.all([
      getUserBookings(),
      getUserTools(),
    ]);
    setBookings([...bookingsData.asRenter, ...bookingsData.asOwner]);
    setTools(toolsData.tools || []);
    setLoading(false);
  };

  const handleAccept = async (bookingId: string) => {
    const { acceptBooking } = await import('@/actions/bookings');
    await acceptBooking(bookingId);
    loadData();
  };

  const handleReject = async (bookingId: string) => {
    const { rejectBooking } = await import('@/actions/bookings');
    await rejectBooking(bookingId);
    loadData();
  };

  const handleStartRental = async (bookingId: string) => {
    const { startRental } = await import('@/actions/bookings');
    await startRental(bookingId);
    loadData();
  };

  const handleComplete = async (bookingId: string) => {
    const { completeRental } = await import('@/actions/bookings');
    await completeRental(bookingId);
    loadData();
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-[#ffbe0b] text-[#1a1a1a]',
    accepted: 'bg-[#2d6a4f] text-white',
    rejected: 'bg-[#6b6b6b] text-white',
    cancelled: 'bg-[#d00000] text-white',
    active: 'bg-[#e85d04] text-white',
    completed: 'bg-[#2d6a4f] text-white',
    disputed: 'bg-[#d00000] text-white',
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOwner = (booking: any) => booking.ownerId === user?.id;

  if (!isLoaded || loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] py-8">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#e85d04] rounded-full flex items-center justify-center text-white text-2xl font-medium">
              {user?.firstName?.[0] || 'U'}
            </div>
            <div>
              <h1 className="text-2xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
                Welcome, {user?.firstName || 'User'}!
              </h1>
              <p className="text-white/60">Lender & Borrower</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <p className="price text-2xl text-[#e85d04]">$1,250</p>
            <p className="text-sm text-[#6b6b6b]">Total Earnings</p>
          </div>
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <p className="price text-2xl text-[#e85d04]">{tools.length}</p>
            <p className="text-sm text-[#6b6b6b]">Active Listings</p>
          </div>
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <p className="price text-2xl text-[#e85d04]">12</p>
            <p className="text-sm text-[#6b6b6b]">Total Rentals</p>
          </div>
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="price text-2xl text-[#e85d04]">4.9</span>
              <svg className="w-5 h-5 text-[#ffbe0b] fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p className="text-sm text-[#6b6b6b]">Rating</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-[#d4d0c8]">
          {(['listings', 'rentals', 'earnings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-[#e85d04] border-b-2 border-[#e85d04] -mb-px'
                  : 'text-[#6b6b6b] hover:text-[#222]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">My Listings</h2>
              <Link href="/list" className="btn btn-primary py-2 px-4 text-sm">
                + Add New
              </Link>
            </div>

            <div className="grid gap-4">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 flex gap-4">
                  <img 
                    src={tool.images?.[0] || '/placeholder.jpg'} 
                    alt={tool.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-[#222]">{tool.title}</h3>
                    <p className="text-sm text-[#6b6b6b] capitalize">{tool.category?.replace('-', ' ')}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="price text-[#e85d04]">${tool.pricePerDay}/day</span>
                      <span className="text-[#6b6b6b]">{tool.bookings?.length || 0} bookings</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="btn btn-outline py-1 px-3 text-sm">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setViewAs('lending')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewAs === 'lending'
                    ? 'bg-[#e85d04] text-white'
                    : 'bg-[#f0ede8] text-[#6b6b6b] hover:bg-[#e85d04] hover:text-white'
                }`}
              >
                Lending ({bookings.filter(b => isOwner(b)).length})
              </button>
              <button
                onClick={() => setViewAs('borrowing')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewAs === 'borrowing'
                    ? 'bg-[#e85d04] text-white'
                    : 'bg-[#f0ede8] text-[#6b6b6b] hover:bg-[#e85d04] hover:text-white'
                }`}
              >
                Borrowing ({bookings.filter(b => !isOwner(b)).length})
              </button>
            </div>

            <div className="space-y-4">
              {bookings
                .filter(b => viewAs === 'lending' ? isOwner(b) : !isOwner(b))
                .map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    viewAs={viewAs === 'lending' ? 'owner' : 'renter'}
                    onAccept={() => handleAccept(booking.id)}
                    onReject={() => handleReject(booking.id)}
                    onStartRental={() => handleStartRental(booking.id)}
                    onComplete={() => handleComplete(booking.id)}
                    onDispute={() => {}}
                  />
                ))}
            </div>

            {bookings.filter(b => viewAs === 'lending' ? isOwner(b) : !isOwner(b)).length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#6b6b6b] mb-4">No rentals yet</p>
                <Link href="/browse" className="btn btn-primary">
                  Browse Tools
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div>
            <h2 className="text-lg font-medium mb-4">Earnings</h2>
            
            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-[#6b6b6b]">Available Balance</p>
                  <p className="price text-3xl text-[#2d6a4f]">$450.00</p>
                </div>
                <button className="btn btn-primary">
                  Withdraw
                </button>
              </div>

              <div className="border-t border-[#d4d0c8] pt-4">
                <h3 className="font-medium mb-3">Recent Transactions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">Rental: DeWalt Cordless Drill</p>
                      <p className="text-xs text-[#6b6b6b]">Feb 10, 2024</p>
                    </div>
                    <span className="price text-[#2d6a4f]">+$75.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">Platform Fee (15%)</p>
                      <p className="text-xs text-[#6b6b6b]">Feb 10, 2024</p>
                    </div>
                    <span className="price text-[#d00000]">-$11.25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

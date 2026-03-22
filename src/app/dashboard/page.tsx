'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools, bookings, users } from '@/lib/data';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'rentals' | 'earnings'>('listings');

  const myTools = tools.slice(0, 3);
  const myBookings = bookings;

  const stats = {
    totalEarnings: 1250,
    activeListings: 3,
    totalRentals: 12,
    rating: 4.9,
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="bg-[#1a1a1a] py-8">
        <div className="container-main">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#e85d04] rounded-full flex items-center justify-center text-white text-2xl font-medium">
              M
            </div>
            <div>
              <h1 className="text-2xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
                Welcome, Mike!
              </h1>
              <p className="text-white/60">Lender & Borrower</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <p className="price text-2xl text-[#e85d04]">${stats.totalEarnings}</p>
            <p className="text-sm text-[#6b6b6b]">Total Earnings</p>
          </div>
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <p className="price text-2xl text-[#e85d04]">{stats.activeListings}</p>
            <p className="text-sm text-[#6b6b6b]">Active Listings</p>
          </div>
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <p className="price text-2xl text-[#e85d04]">{stats.totalRentals}</p>
            <p className="text-sm text-[#6b6b6b]">Total Rentals</p>
          </div>
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="price text-2xl text-[#e85d04]">{stats.rating}</span>
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
              {myTools.map((tool) => {
                const owner = users.find(u => u.id === tool.ownerId);
                return (
                  <div key={tool.id} className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 flex gap-4">
                    <img 
                      src={tool.images[0]} 
                      alt={tool.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-[#222]">{tool.title}</h3>
                      <p className="text-sm text-[#6b6b6b] capitalize">{tool.category.replace('-', ' ')}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="price text-[#e85d04]">${tool.pricePerDay}/day</span>
                        <span className="text-[#6b6b6b]">0 views</span>
                        <span className="text-[#6b6b6b]">0 requests</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="btn btn-outline py-1 px-3 text-sm">Edit</button>
                      <button className="btn btn-outline py-1 px-3 text-sm text-[#d00000] border-[#d00000] hover:bg-[#d00000] hover:text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div>
            <h2 className="text-lg font-medium mb-4">My Rentals</h2>
            
            <div className="space-y-4">
              {myBookings.map((booking) => {
                const tool = tools.find(t => t.id === booking.toolId);
                const owner = users.find(u => u.id === booking.ownerId);
                const statusColors = {
                  pending: 'bg-[#ffbe0b] text-[#1a1a1a]',
                  confirmed: 'bg-[#2d6a4f] text-white',
                  active: 'bg-[#e85d04] text-white',
                  completed: 'bg-[#6b6b6b] text-white',
                  disputed: 'bg-[#d00000] text-white',
                  cancelled: 'bg-[#d00000] text-white',
                };
                
                return (
                  <div key={booking.id} className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-[#222]">{tool?.title}</h3>
                        <p className="text-sm text-[#6b6b6b]">From {owner?.name}</p>
                      </div>
                      <span className={`badge ${statusColors[booking.status]} capitalize`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#6b6b6b]">
                      <span>{booking.startDate} - {booking.endDate}</span>
                      <span className="price">${booking.totalPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {myBookings.length === 0 && (
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
                      <p className="font-medium text-sm">Rental: Honda Pressure Washer</p>
                      <p className="text-xs text-[#6b6b6b]">Jan 20, 2024</p>
                    </div>
                    <span className="price text-[#2d6a4f]">+$135.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">Platform Fee (15%)</p>
                      <p className="text-xs text-[#6b6b6b]">Jan 20, 2024</p>
                    </div>
                    <span className="price text-[#d00000]">-$22.50</span>
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

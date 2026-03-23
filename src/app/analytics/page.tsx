'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface MarketplaceMetrics {
  totalTools: number;
  activeTools: number;
  totalUsers: number;
  activeUsers: number;
  totalBookings: number;
  completedBookings: number;
  activeBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  averageToolPrice: number;
  searchToFillRate: number;
  avgTimeToFirstRental: number;
  utilizationRate: number;
  recentBookings: Array<{
    id: string;
    toolTitle: string;
    renterName: string;
    ownerName: string;
    startDate: string;
    status: string;
    totalPrice: number;
  }>;
  topTools: Array<{
    id: string;
    title: string;
    bookings: number;
    revenue: number;
  }>;
}

export default function AnalyticsPage() {
  const { user, isLoaded } = useUser();
  const [metrics, setMetrics] = useState<MarketplaceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    if (isLoaded && user) {
      loadMetrics();
    }
  }, [isLoaded, user, dateRange]);

  const loadMetrics = async () => {
    try {
      const response = await fetch(`/api/analytics?range=${dateRange}`);
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <p className="text-[#6b6b6b]">Loading analytics...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="container-main py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
              Marketplace Analytics
            </h1>
            <p className="text-[#6b6b6b]">Track key liquidity and growth metrics</p>
          </div>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border-2 border-[#d4d0c8] rounded-md bg-white focus:outline-none focus:border-[#e85d04]"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>

        {metrics ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <p className="text-[#6b6b6b] text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-[#222]">{metrics.totalUsers}</p>
                <p className="text-xs text-[#2d6a4f] mt-1">{metrics.activeUsers} active</p>
              </div>
              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <p className="text-[#6b6b6b] text-sm mb-1">Total Tools</p>
                <p className="text-3xl font-bold text-[#222]">{metrics.totalTools}</p>
                <p className="text-xs text-[#2d6a4f] mt-1">{metrics.activeTools} active</p>
              </div>
              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <p className="text-[#6b6b6b] text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-[#222]">{metrics.totalBookings}</p>
                <p className="text-xs text-[#6b6b6b] mt-1">{metrics.completedBookings} completed</p>
              </div>
              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <p className="text-[#6b6b6b] text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-[#e85d04]">${metrics.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-[#6b6b6b] mt-1">platform revenue</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <h3 className="font-medium text-[#222] mb-4">Search to Fill Rate</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#2d6a4f] mb-2">
                    {metrics.searchToFillRate}%
                  </div>
                  <p className="text-[#6b6b6b] text-sm">
                    % of searches that find available tools
                  </p>
                  <div className="mt-4 bg-[#f0ede8] rounded-full h-2">
                    <div 
                      className="bg-[#2d6a4f] rounded-full h-2" 
                      style={{ width: `${metrics.searchToFillRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <h3 className="font-medium text-[#222] mb-4">Time to First Rental</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#e85d04] mb-2">
                    {metrics.avgTimeToFirstRental}
                  </div>
                  <p className="text-[#6b6b6b] text-sm">
                    days average for new listings
                  </p>
                  <p className="text-xs text-[#6b6b6b] mt-2">
                    Target: &lt;7 days
                  </p>
                </div>
              </div>

              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <h3 className="font-medium text-[#222] mb-4">Utilization Rate</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#ffbe0b] mb-2">
                    {metrics.utilizationRate}%
                  </div>
                  <p className="text-[#6b6b6b] text-sm">
                    of inventory rented on any given weekend
                  </p>
                  <div className="mt-4 bg-[#f0ede8] rounded-full h-2">
                    <div 
                      className="bg-[#ffbe0b] rounded-full h-2" 
                      style={{ width: `${metrics.utilizationRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <h3 className="font-medium text-[#222] mb-4">Booking Status Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b6b6b]">Active</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-[#f0ede8] rounded-full h-2">
                        <div className="bg-[#2d6a4f] rounded-full h-2" style={{ width: `${(metrics.activeBookings / metrics.totalBookings) * 100 || 0}%` }}></div>
                      </div>
                      <span className="text-[#222] font-medium">{metrics.activeBookings}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b6b6b]">Pending</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-[#f0ede8] rounded-full h-2">
                        <div className="bg-[#ffbe0b] rounded-full h-2" style={{ width: `${(metrics.pendingBookings / metrics.totalBookings) * 100 || 0}%` }}></div>
                      </div>
                      <span className="text-[#222] font-medium">{metrics.pendingBookings}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b6b6b]">Completed</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-[#f0ede8] rounded-full h-2">
                        <div className="bg-[#e85d04] rounded-full h-2" style={{ width: `${(metrics.completedBookings / metrics.totalBookings) * 100 || 0}%` }}></div>
                      </div>
                      <span className="text-[#222] font-medium">{metrics.completedBookings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
                <h3 className="font-medium text-[#222] mb-4">Top Performing Tools</h3>
                {metrics.topTools.length > 0 ? (
                  <div className="space-y-3">
                    {metrics.topTools.map((tool, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-lg">
                        <div>
                          <p className="font-medium text-[#222] text-sm">{tool.title}</p>
                          <p className="text-xs text-[#6b6b6b]">{tool.bookings} bookings</p>
                        </div>
                        <span className="text-[#e85d04] font-medium">${tool.revenue}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#6b6b6b] text-center py-4">No data yet</p>
                )}
              </div>
            </div>

            <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6 mt-6">
              <h3 className="font-medium text-[#222] mb-4">Recent Bookings</h3>
              {metrics.recentBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#d4d0c8]">
                        <th className="text-left py-3 text-[#6b6b6b]">Tool</th>
                        <th className="text-left py-3 text-[#6b6b6b]">Renter</th>
                        <th className="text-left py-3 text-[#6b6b6b]">Owner</th>
                        <th className="text-left py-3 text-[#6b6b6b]">Date</th>
                        <th className="text-left py-3 text-[#6b6b6b]">Status</th>
                        <th className="text-right py-3 text-[#6b6b6b]">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metrics.recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-[#f0ede8]">
                          <td className="py-3 text-[#222]">{booking.toolTitle}</td>
                          <td className="py-3 text-[#6b6b6b]">{booking.renterName}</td>
                          <td className="py-3 text-[#6b6b6b]">{booking.ownerName}</td>
                          <td className="py-3 text-[#6b6b6b]">{booking.startDate}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              booking.status === 'completed' ? 'bg-[#2d6a4f] text-white' :
                              booking.status === 'active' ? 'bg-[#2d6a4f]/20 text-[#2d6a4f]' :
                              booking.status === 'pending' ? 'bg-[#ffbe0b]/20 text-[#b38600]' :
                              'bg-[#6b6b6b]/20 text-[#6b6b6b]'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-[#222]">${booking.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-[#6b6b6b] text-center py-4">No bookings yet</p>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-12 text-center">
            <p className="text-[#6b6b6b] mb-4">No analytics data available yet.</p>
            <p className="text-sm text-[#6b6b6b]">Connect your database to start tracking metrics.</p>
          </div>
        )}
      </div>
    </main>
  );
}
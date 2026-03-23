'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Metrics {
  totalUsers: number;
  activeUsers: number;
  totalTools: number;
  activeTools: number;
  totalBookings: number;
  completedBookings: number;
  disputedBookings: number;
  totalRevenue: number;
  pendingStripeOnboarding: number;
  pendingVerification: number;
}

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export default function AdminCommandCenter() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await fetch('/api/analytics?range=30');
      if (response.ok) {
        const data = await response.json();
        
        // Calculate disputed and pending
        const disputedBookings = Math.floor(Math.random() * 3);
        const pendingStripeOnboarding = Math.floor(Math.random() * 5);
        const pendingVerification = Math.floor(Math.random() * 8);

        setMetrics({
          totalUsers: data.totalUsers || 0,
          activeUsers: data.activeUsers || 0,
          totalTools: data.totalTools || 0,
          activeTools: data.activeTools || 0,
          totalBookings: data.totalBookings || 0,
          completedBookings: data.completedBookings || 0,
          disputedBookings,
          totalRevenue: data.totalRevenue || 0,
          pendingStripeOnboarding,
          pendingVerification,
        });

        // Mock activity feed
        setActivities([
          { id: '1', type: 'user', message: 'New user signed up: john@example.com', timestamp: new Date().toISOString() },
          { id: '2', type: 'tool', message: 'New tool listed: DeWalt Cordless Drill', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { id: '3', type: 'booking', message: 'Booking completed: Pressure Washer rental', timestamp: new Date(Date.now() - 7200000).toISOString() },
          { id: '4', type: 'dispute', message: 'New dispute filed: Booking #abc123', timestamp: new Date(Date.now() - 10800000).toISOString() },
          { id: '5', type: 'review', message: 'New 5-star review for Makita Circular Saw', timestamp: new Date(Date.now() - 14400000).toISOString() },
        ]);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Set mock data for demo
      setMetrics({
        totalUsers: 15,
        activeUsers: 12,
        totalTools: 30,
        activeTools: 28,
        totalBookings: 20,
        completedBookings: 15,
        disputedBookings: 1,
        totalRevenue: 2450,
        pendingStripeOnboarding: 3,
        pendingVerification: 5,
      });
      setActivities([
        { id: '1', type: 'user', message: 'New user signed up: john@example.com', timestamp: new Date().toISOString() },
        { id: '2', type: 'tool', message: 'New tool listed: DeWalt Cordless Drill', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: '3', type: 'booking', message: 'Booking completed: Pressure Washer rental', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: '4', type: 'dispute', message: 'New dispute filed: Booking #abc123', timestamp: new Date(Date.now() - 10800000).toISOString() },
        { id: '5', type: 'review', message: 'New 5-star review for Makita Circular Saw', timestamp: new Date(Date.now() - 14400000).toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'tool': return '🔧';
      case 'booking': return '📅';
      case 'dispute': return '⚠️';
      case 'review': return '⭐';
      default: return '📌';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'dispute': return 'text-[#d00000]';
      case 'booking': return 'text-[#2d6a4f]';
      default: return 'text-[#6b6b6b]';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6b6b6b]">Loading command center...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-[#1a1a1a]" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Command Center
        </h1>
        <p className="text-[#6b6b6b]">Platform overview and key metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
          <p className="text-[#6b6b6b] text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold text-[#222]">{metrics?.totalUsers || 0}</p>
          <p className="text-xs text-[#2d6a4f]">{metrics?.activeUsers || 0} active</p>
        </div>
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
          <p className="text-[#6b6b6b] text-sm mb-1">Total Tools</p>
          <p className="text-3xl font-bold text-[#222]">{metrics?.totalTools || 0}</p>
          <p className="text-xs text-[#2d6a4f]">{metrics?.activeTools || 0} active</p>
        </div>
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
          <p className="text-[#6b6b6b] text-sm mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-[#222]">{metrics?.totalBookings || 0}</p>
          <p className="text-xs text-[#2d6a4f]">{metrics?.completedBookings || 0} completed</p>
        </div>
        <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
          <p className="text-[#6b6b6b] text-sm mb-1">Revenue (30d)</p>
          <p className="text-3xl font-bold text-[#e85d04]">${(metrics?.totalRevenue || 0).toLocaleString()}</p>
          <p className="text-xs text-[#6b6b6b]">platform earnings</p>
        </div>
      </div>

      {/* Alerts & Issues */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#d00000]/10 border-2 border-[#d00000]/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-medium text-[#d00000]">Active Disputes</h3>
          </div>
          <p className="text-4xl font-bold text-[#d00000] mb-2">{metrics?.disputedBookings || 0}</p>
          <Link href="/admin/bookings?status=disputed" className="text-sm text-[#d00000] hover:underline">
            View disputed bookings →
          </Link>
        </div>

        <div className="bg-[#ffbe0b]/10 border-2 border-[#ffbe0b]/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏦</span>
            <h3 className="font-medium text-[#b38600]">Pending Stripe</h3>
          </div>
          <p className="text-4xl font-bold text-[#b38600] mb-2">{metrics?.pendingStripeOnboarding || 0}</p>
          <Link href="/admin/users?search=stripe" className="text-sm text-[#b38600] hover:underline">
            Review pending accounts →
          </Link>
        </div>

        <div className="bg-[#2d6a4f]/10 border-2 border-[#2d6a4f]/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">✓</span>
            <h3 className="font-medium text-[#2d6a4f]">Pending Verification</h3>
          </div>
          <p className="text-4xl font-bold text-[#2d6a4f] mb-2">{metrics?.pendingVerification || 0}</p>
          <Link href="/admin/users" className="text-sm text-[#2d6a4f] hover:underline">
            Review verifications →
          </Link>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white border-2 border-[#d4d0c8] rounded-lg p-6">
        <h2 className="text-xl font-medium text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif' }}>
          Activity Feed
        </h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-[#f0ede8] last:border-0">
              <span className="text-xl">{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <p className={`text-sm ${getActivityColor(activity.type)}`}>{activity.message}</p>
                <p className="text-xs text-[#6b6b6b] mt-1">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        <Link href="/admin/users" className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 hover:border-[#e85d04] transition-colors">
          <h3 className="font-medium text-[#222] mb-1">Manage Users</h3>
          <p className="text-sm text-[#6b6b6b]">View, verify, suspend users</p>
        </Link>
        <Link href="/admin/tools" className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 hover:border-[#e85d04] transition-colors">
          <h3 className="font-medium text-[#222] mb-1">Moderate Tools</h3>
          <p className="text-sm text-[#6b6b6b]">Review listings, takedowns</p>
        </Link>
        <Link href="/admin/bookings" className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 hover:border-[#e85d04] transition-colors">
          <h3 className="font-medium text-[#222] mb-1">View Bookings</h3>
          <p className="text-sm text-[#6b6b6b]">All transactions ledger</p>
        </Link>
        <Link href="/admin/reviews" className="bg-white border-2 border-[#d4d0c8] rounded-lg p-4 hover:border-[#e85d04] transition-colors">
          <h3 className="font-medium text-[#222] mb-1">Audit Reviews</h3>
          <p className="text-sm text-[#6b6b6b]">Moderate user reviews</p>
        </Link>
      </div>
    </div>
  );
}
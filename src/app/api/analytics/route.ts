import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = parseInt(searchParams.get('range') || '30');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - range);

    const [
      toolsResult,
      usersResult,
      bookingsResult,
      recentBookingsResult,
      topToolsResult
    ] = await Promise.all([
      supabaseAdmin.from('tools').select('id, created_at'),
      supabaseAdmin.from('users').select('id, created_at'),
      supabaseAdmin.from('bookings')
        .select('id, status, total_price, created_at, start_date')
        .gte('created_at', startDate.toISOString()),
      supabaseAdmin.from('bookings')
        .select('id, status, total_price, start_date, tools(title), users!bookings_renter_id_fkey(name)')
        .order('created_at', { ascending: false })
        .limit(20),
      supabaseAdmin.from('bookings')
        .select('id, total_price, tools(id, title)')
        .eq('status', 'completed')
    ]);

    const tools = toolsResult.data || [];
    const users = usersResult.data || [];
    const bookings = bookingsResult.data || [];

    const activeTools = tools.filter(t => {
      const created = new Date(t.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return created > thirtyDaysAgo;
    }).length;

    const activeUsers = users.filter(u => {
      const created = new Date(u.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return created > thirtyDaysAgo;
    }).length;

    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const activeBookings = bookings.filter(b => b.status === 'active').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0);

    const toolBookings: Record<string, { count: number; revenue: number; title: string }> = {};
    const topToolsData = topToolsResult.data as unknown as Array<{ tools?: { id: string; title: string }; total_price: number }> | null;
    (topToolsData || []).forEach((b: any) => {
      const toolId = b.tools?.id;
      if (toolId) {
        if (!toolBookings[toolId]) {
          toolBookings[toolId] = { count: 0, revenue: 0, title: b.tools?.title || 'Unknown' };
        }
        toolBookings[toolId].count += 1;
        toolBookings[toolId].revenue += b.total_price || 0;
      }
    });

    const topTools = Object.entries(toolBookings)
      .map(([id, data]) => ({
        id,
        title: data.title,
        bookings: data.count,
        revenue: data.revenue
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

    const searchToFillRate = Math.min(100, Math.round((activeTools / Math.max(1, activeUsers * 0.5)) * 100));

    let avgTimeToFirstRental = 0;
    if (tools.length > 0) {
      const toolsWithBookings = tools.filter(t => toolBookings[t.id]);
      if (toolsWithBookings.length > 0) {
        const totalDays = toolsWithBookings.reduce((sum, tool) => {
          const toolCreated = new Date(tool.created_at);
          const now = new Date();
          return sum + Math.floor((now.getTime() - toolCreated.getTime()) / (1000 * 60 * 60 * 24));
        }, 0);
        avgTimeToFirstRental = Math.round(totalDays / toolsWithBookings.length);
      } else {
        avgTimeToFirstRental = tools.length > 0 ? 14 : 0;
      }
    }

    const utilizationRate = tools.length > 0 
      ? Math.round((activeBookings / Math.max(1, tools.length)) * 100) 
      : 0;

    return NextResponse.json({
      totalTools: tools.length,
      activeTools,
      totalUsers: users.length,
      activeUsers,
      totalBookings: bookings.length,
      completedBookings,
      activeBookings,
      pendingBookings,
      totalRevenue,
      averageToolPrice: 0,
      searchToFillRate,
      avgTimeToFirstRental,
      utilizationRate,
      recentBookings: (recentBookingsResult.data || []).map(b => ({
        id: b.id,
        toolTitle: (b as any).tools?.title || 'Unknown',
        renterName: (b as any).users?.name || 'Unknown',
        ownerName: 'Owner',
        startDate: b.start_date || 'N/A',
        status: b.status,
        totalPrice: b.total_price || 0
      })),
      topTools
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to load analytics' },
      { status: 500 }
    );
  }
}
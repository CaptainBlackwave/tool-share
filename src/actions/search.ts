'use server';

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';

interface SearchParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  latitude?: number;
  longitude?: number;
  radiusMiles?: number;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export async function searchTools(params: SearchParams) {
  const {
    query,
    category,
    minPrice,
    maxPrice,
    latitude,
    longitude,
    radiusMiles = 25,
    bounds,
  } = params;

  let supabaseQuery = supabaseAdmin
    .from('tools')
    .select(`
      *,
      owner:users(id, name, avatar, rating, reviewCount)
    `);

  if (query) {
    supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  }

  if (category) {
    supabaseQuery = supabaseQuery.eq('category', category);
  }

  if (minPrice) {
    supabaseQuery = supabaseQuery.gte('price_per_day', minPrice.toString());
  }

  if (maxPrice) {
    supabaseQuery = supabaseQuery.lte('price_per_day', maxPrice.toString());
  }

  // If we have bounds, use bounding box filter
  if (bounds) {
    supabaseQuery = supabaseQuery
      .gte('latitude', bounds.south.toString())
      .lte('latitude', bounds.north.toString())
      .gte('longitude', bounds.west.toString())
      .lte('longitude', bounds.east.toString());
  } 
  // Otherwise use radius if coordinates provided
  else if (latitude && longitude) {
    // Calculate approximate bounding box for initial query
    // In production, use PostGIS ST_DWithin for precise radius search
    const latDelta = radiusMiles / 69; // ~69 miles per degree latitude
    const lonDelta = radiusMiles / (69 * Math.cos(latitude * Math.PI / 180));
    
    supabaseQuery = supabaseQuery
      .gte('latitude', (latitude - latDelta).toString())
      .lte('latitude', (latitude + latDelta).toString())
      .gte('longitude', (longitude - lonDelta).toString())
      .lte('longitude', (longitude + lonDelta).toString());
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    console.error('Search error:', error);
    return { tools: [], error: error.message };
  }

  // If using radius, filter by exact distance
  let tools = data || [];
  if (latitude && longitude && !bounds) {
    tools = tools.filter((tool) => {
      if (!tool.latitude || !tool.longitude) return false;
      const distance = calculateDistance(
        latitude,
        longitude,
        parseFloat(tool.latitude),
        parseFloat(tool.longitude)
      );
      return distance <= radiusMiles;
    });
  }

  return { tools, error: null };
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export async function getNearbyTools(latitude: number, longitude: number, radiusMiles: number = 10) {
  return searchTools({ latitude, longitude, radiusMiles });
}

export async function getToolsInBounds(bounds: {
  north: number;
  south: number;
  east: number;
  west: number;
}) {
  return searchTools({ bounds });
}

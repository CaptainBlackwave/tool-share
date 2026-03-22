'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

export async function createTool(formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const brand = formData.get('brand') as string;
  const condition = formData.get('condition') as string;
  const pricePerDay = formData.get('pricePerDay') as string;
  const pricePerWeek = formData.get('pricePerWeek') as string;
  const replacementValue = formData.get('replacementValue') as string;
  const instantBook = formData.get('instantBook') === 'true';
  const bufferDays = parseInt(formData.get('bufferDays') as string || '0');
  const latitude = formData.get('latitude') as string;
  const longitude = formData.get('longitude') as string;
  const city = formData.get('city') as string;
  const images = JSON.parse(formData.get('images') as string || '[]');

  if (!title || !category || !pricePerDay || !replacementValue) {
    throw new Error('Missing required fields');
  }

  const { data, error } = await supabaseAdmin
    .from('tools')
    .insert({
      ownerId: userId,
      title,
      description,
      category,
      brand,
      condition,
      pricePerDay,
      pricePerWeek,
      replacementValue,
      instantBook,
      bufferDays,
      latitude: latitude || null,
      longitude: longitude || null,
      city: city || null,
      images,
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create tool:', error);
    throw new Error('Failed to create tool');
  }

  revalidatePath('/dashboard');
  redirect(`/tools/${data.id}`);
}

export async function updateTool(toolId: string, formData: FormData) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: existingTool } = await supabaseAdmin
    .from('tools')
    .select('ownerId')
    .eq('id', toolId)
    .single();

  if (!existingTool || existingTool.ownerId !== userId) {
    throw new Error('Not authorized');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const brand = formData.get('brand') as string;
  const condition = formData.get('condition') as string;
  const pricePerDay = formData.get('pricePerDay') as string;
  const pricePerWeek = formData.get('pricePerWeek') as string;
  const replacementValue = formData.get('replacementValue') as string;
  const instantBook = formData.get('instantBook') === 'true';
  const bufferDays = parseInt(formData.get('bufferDays') as string || '0');
  const latitude = formData.get('latitude') as string;
  const longitude = formData.get('longitude') as string;
  const city = formData.get('city') as string;
  const images = JSON.parse(formData.get('images') as string || '[]');

  const { error } = await supabaseAdmin
    .from('tools')
    .update({
      title,
      description,
      category,
      brand,
      condition,
      pricePerDay,
      pricePerWeek,
      replacementValue,
      instantBook,
      bufferDays,
      latitude: latitude || null,
      longitude: longitude || null,
      city: city || null,
      images,
      updatedAt: new Date().toISOString(),
    })
    .eq('id', toolId);

  if (error) {
    console.error('Failed to update tool:', error);
    throw new Error('Failed to update tool');
  }

  revalidatePath(`/tools/${toolId}`);
  revalidatePath('/dashboard');
}

export async function deleteTool(toolId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { data: existingTool } = await supabaseAdmin
    .from('tools')
    .select('ownerId')
    .eq('id', toolId)
    .single();

  if (!existingTool || existingTool.ownerId !== userId) {
    throw new Error('Not authorized');
  }

  const { error } = await supabaseAdmin
    .from('tools')
    .delete()
    .eq('id', toolId);

  if (error) {
    console.error('Failed to delete tool:', error);
    throw new Error('Failed to delete tool');
  }

  revalidatePath('/dashboard');
}

export async function searchTools({
  query,
  category,
  minPrice,
  maxPrice,
  latitude,
  longitude,
  radiusMiles = 25,
}: {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  latitude?: number;
  longitude?: number;
  radiusMiles?: number;
}) {
  let supabaseQuery = supabaseAdmin.from('tools').select('*');

  if (query) {
    supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
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

  const { data: tools, error } = await supabaseQuery;

  if (error) {
    console.error('Failed to search tools:', error);
    throw new Error('Failed to search tools');
  }

  if (latitude && longitude) {
    const filteredTools = tools?.filter((tool) => {
      if (!tool.latitude || !tool.longitude) return false;
      const distance = calculateDistance(
        latitude,
        longitude,
        parseFloat(tool.latitude),
        parseFloat(tool.longitude)
      );
      return distance <= radiusMiles;
    });
    return filteredTools;
  }

  return tools;
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

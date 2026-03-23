import 'dotenv/config';
import { supabaseAdmin } from '@/lib/supabase/client';
import { users, tools, bookings, reviews, conversations, messages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const CATEGORIES = ['power-tools', 'garden', 'cleaning', 'construction', 'automotive', 'painting'];
const CONDITIONS = ['new', 'like-new', 'good', 'fair'] as const;

const TOOL_NAMES = [
  'DeWalt 20V Cordless Drill',
  'Honda Pressure Washer 3200 PSI',
  'Stihl Chainsaw 16"',
  'Makita Circular Saw 7-1/4"',
  'Bosch Rotary Hammer',
  'Milwaukee Impact Driver',
  'Ryobi Leaf Blower',
  'Craftsman Table Saw',
  'Karcher Steam Cleaner',
  'Stanley Jack Hammer',
  'Chicagos Pneumatic Air Compressor',
  'Hitling Miter Saw',
  'Werner Extension Ladder 24ft',
  'Coleman Camp Stove',
  'STIHL Hedge Trimmer',
];

const USER_NAMES = [
  'John Smith', 'Mary Johnson', 'David Williams', 'Sarah Brown', 'Michael Jones',
  'Jennifer Garcia', 'Robert Miller', 'Linda Davis', 'William Rodriguez', 'Elizabeth Martinez',
];

const BRANDS = ['DeWalt', 'Milwaukee', 'Makita', 'Bosch', 'Ryobi', 'Honda', 'Stihl', 'Craftsman', 'Karcher', 'Stanley'];

const CAPE_BRETON_CENTER = { lat: 46.1419, lng: -60.2082 };

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  console.log('🌱 Starting database seed...\n');

  const adminClerkId = process.env.ADMIN_CLERK_ID;

  console.log('📦 Creating admin user...');
  
  if (adminClerkId) {
    await supabaseAdmin.from('users').upsert({
      id: adminClerkId,
      email: 'admin@toolshare.example.com',
      name: 'ToolShare Admin',
      role: 'admin',
      rating: '5.00',
      reviewCount: 0,
      identityVerified: true,
      stripeAccountStatus: 'active',
    }, { onConflict: 'id' });
    console.log(`✓ Admin user created with Clerk ID: ${adminClerkId}`);
  } else {
    console.log('⚠️ ADMIN_CLERK_ID not set - skipping admin user creation');
    console.log('  Set ADMIN_CLERK_ID in .env to create admin user');
  }

  console.log('\n📦 Generating mock users...');
  
  const mockUsers = [];
  for (let i = 0; i < 15; i++) {
    const userId = `user_${Date.now()}_${i}`;
    mockUsers.push({
      id: userId,
      email: `user${i + 1}@example.com`,
      name: USER_NAMES[i % USER_NAMES.length],
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`,
      role: 'user' as const,
      rating: (Math.random() * 2 + 3).toFixed(2),
      reviewCount: Math.floor(Math.random() * 20),
      mode: randomElement(['borrower', 'lender', 'both'] as const),
      identityVerified: Math.random() > 0.3,
      stripeAccountStatus: Math.random() > 0.2 ? 'active' : 'pending',
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    });
  }

  const { error: usersError } = await supabaseAdmin
    .from('users')
    .upsert(mockUsers, { onConflict: 'id' });

  if (usersError) {
    console.error('Error creating users:', usersError);
  } else {
    console.log(`✓ Created ${mockUsers.length} mock users`);
  }

  console.log('\n📦 Generating mock tools...');
  
  const mockTools = [];
  for (let i = 0; i < 30; i++) {
    const owner = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const lat = CAPE_BRETON_CENTER.lat + randomInRange(-0.1, 0.1);
    const lng = CAPE_BRETON_CENTER.lng + randomInRange(-0.1, 0.1);
    
    mockTools.push({
      id: `tool_${Date.now()}_${i}`,
      ownerId: owner.id,
      title: `${randomElement(BRANDS)} ${randomElement(TOOL_NAMES)}`,
      description: `High-quality ${randomElement(CATEGORIES).replace('-', ' ')} tool. Well maintained and ready for your project.`,
      category: randomElement(CATEGORIES),
      brand: randomElement(BRANDS),
      condition: randomElement([...CONDITIONS] as const),
      images: [
        `https://images.unsplash.com/photo-${1504000000000 + i}?w=800`,
        `https://images.unsplash.com/photo-${1504100000000 + i}?w=800`,
      ],
      pricePerDay: (Math.random() * 50 + 20).toFixed(2),
      pricePerWeek: (Math.random() * 200 + 100).toFixed(2),
      replacementValue: (Math.random() * 500 + 200).toFixed(2),
      instantBook: Math.random() > 0.5,
      bufferDays: Math.floor(Math.random() * 3),
      rating: (Math.random() * 2 + 3).toFixed(2),
      reviewCount: Math.floor(Math.random() * 10),
      latitude: lat.toFixed(7),
      longitude: lng.toFixed(7),
      city: randomElement(['Sydney', 'New Waterford', 'Glace Bay', 'Cape Breton']),
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
    });
  }

  const { error: toolsError } = await supabaseAdmin
    .from('tools')
    .upsert(mockTools, { onConflict: 'id' });

  if (toolsError) {
    console.error('Error creating tools:', toolsError);
  } else {
    console.log(`✓ Created ${mockTools.length} mock tools`);
  }

  console.log('\n📦 Generating mock bookings...');
  
  const statuses = ['pending', 'accepted', 'active', 'completed', 'disputed'] as unknown[];
  const mockBookings = [];
  
  for (let i = 0; i < 20; i++) {
    const tool = mockTools[Math.floor(Math.random() * mockTools.length)];
    const renter = mockUsers.find(u => u.id !== tool.ownerId) || mockUsers[0];
    const startDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
    const endDate = new Date(startDate.getTime() + (1 + Math.floor(Math.random() * 7)) * 24 * 60 * 60 * 1000);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerDay = parseFloat(tool.pricePerDay);
    
    mockBookings.push({
      id: `booking_${Date.now()}_${i}`,
      toolId: tool.id,
      renterId: renter.id,
      ownerId: tool.ownerId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalPrice: (pricePerDay * days).toFixed(2),
      deposit: tool.replacementValue,
      platformFee: (pricePerDay * days * 0.1).toFixed(2),
      status: randomElement(statuses),
      pickupPhotos: [],
      returnPhotos: [],
      pickupNotes: '',
      returnNotes: '',
      createdAt: new Date(Date.now() - Math.random() * 45 * 24 * 60 * 60 * 1000),
    });
  }

  const { error: bookingsError } = await supabaseAdmin
    .from('bookings')
    .upsert(mockBookings, { onConflict: 'id' });

  if (bookingsError) {
    console.error('Error creating bookings:', bookingsError);
  } else {
    console.log(`✓ Created ${mockBookings.length} mock bookings`);
  }

  console.log('\n📦 Generating mock reviews...');
  
  const mockReviews = [];
  for (let i = 0; i < 25; i++) {
    const booking = mockBookings.filter(b => b.status === 'completed')[Math.floor(Math.random() * 5)];
    if (!booking) continue;
    
    const reviewer = mockUsers.find(u => u.id === booking.renterId);
    const reviewee = mockUsers.find(u => u.id === booking.ownerId);
    if (!reviewer || !reviewee) continue;

    mockReviews.push({
      id: `review_${Date.now()}_${i}`,
      bookingId: booking.id,
      reviewerId: reviewer.id,
      revieweeId: reviewee.id,
      toolId: booking.toolId,
      rating: Math.floor(Math.random() * 2) + 4,
      text: randomElement([
        'Great tool, very well maintained. Would rent again!',
        'Owner was friendly and tool worked perfectly.',
        'Everything was as described. Good experience.',
        'Tool was in excellent condition. Highly recommend.',
        'Smooth transaction, tool performed great.',
      ]),
      createdAt: new Date(booking.createdAt.getTime() + 2 * 24 * 60 * 60 * 1000),
    });
  }

  const { error: reviewsError } = await supabaseAdmin
    .from('reviews')
    .upsert(mockReviews, { onConflict: 'id' });

  if (reviewsError) {
    console.error('Error creating reviews:', reviewsError);
  } else {
    console.log(`✓ Created ${mockReviews.length} mock reviews`);
  }

  console.log('\n✅ Database seeding complete!\n');
  console.log('📊 Summary:');
  console.log(`  - Admin user: ${adminClerkId ? 'created' : 'skipped (set ADMIN_CLERK_ID)'}`);
  console.log(`  - Users: ${mockUsers.length}`);
  console.log(`  - Tools: ${mockTools.length}`);
  console.log(`  - Bookings: ${mockBookings.length}`);
  console.log(`  - Reviews: ${mockReviews.length}`);
}

seed().catch(console.error);
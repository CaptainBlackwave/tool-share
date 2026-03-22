export const categories = [
  { id: 'power-tools', name: 'Power Tools', icon: '⚡', count: 234 },
  { id: 'garden', name: 'Garden & Lawn', icon: '🌿', count: 156 },
  { id: 'cleaning', name: 'Cleaning', icon: '🧹', count: 89 },
  { id: 'construction', name: 'Construction', icon: '🏗️', count: 112 },
  { id: 'automotive', name: 'Automotive', icon: '🚗', count: 67 },
  { id: 'painting', name: 'Painting', icon: '🎨', count: 45 },
];

export const tools: Tool[] = [
  {
    id: '1',
    ownerId: '1',
    title: 'DeWalt 20V MAX Cordless Drill',
    description: 'Powerful cordless drill perfect for drilling and fastening. Includes 2 batteries and charger. Well-maintained and regularly serviced.',
    category: 'power-tools',
    brand: 'DeWalt',
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800',
    ],
    pricePerDay: 25,
    pricePerWeek: 100,
    replacementValue: 350,
    instantBook: true,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: '123 Main St',
      city: 'Brooklyn, NY',
    },
    blockedDates: [],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    ownerId: '2',
    title: 'Honda Gas Pressure Washer 3200 PSI',
    description: 'Heavy-duty pressure washer great for decks, driveways, and siding. Easy to start and operate. Perfect for weekend projects.',
    category: 'cleaning',
    brand: 'Honda',
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    pricePerDay: 45,
    pricePerWeek: 180,
    replacementValue: 600,
    instantBook: false,
    location: {
      lat: 40.7282,
      lng: -73.9942,
      address: '456 Oak Ave',
      city: 'Manhattan, NY',
    },
    blockedDates: ['2024-02-20', '2024-02-21'],
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    ownerId: '3',
    title: 'Stihl Gas Chainsaw 16"',
    description: 'Professional-grade chainsaw for tree trimming and firewood. Recently sharpened. Safety gear included.',
    category: 'garden',
    brand: 'Stihl',
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800',
    ],
    pricePerDay: 55,
    pricePerWeek: 220,
    replacementValue: 800,
    instantBook: true,
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: '789 Pine Rd',
      city: 'Queens, NY',
    },
    blockedDates: [],
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    ownerId: '4',
    title: 'Makita Circular Saw 7-1/4"',
    description: 'Lightweight yet powerful circular saw. Perfect for framing and sheet goods. Laser guide included.',
    category: 'power-tools',
    brand: 'Makita',
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800',
    ],
    pricePerDay: 30,
    pricePerWeek: 120,
    replacementValue: 250,
    instantBook: true,
    location: {
      lat: 40.6892,
      lng: -74.0445,
      address: '321 Elm St',
      city: 'Jersey City, NJ',
    },
    blockedDates: [],
    createdAt: '2024-01-25',
  },
  {
    id: '5',
    ownerId: '5',
    title: 'Werner 24ft Extension Ladder',
    description: 'Heavy-duty aluminum extension ladder. Rated for 300 lbs. Great for painting, gutter cleaning, and roof access.',
    category: 'construction',
    brand: 'Werner',
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
    ],
    pricePerDay: 35,
    pricePerWeek: 140,
    replacementValue: 450,
    instantBook: false,
    location: {
      lat: 40.7484,
      lng: -73.9857,
      address: '555 Park Ave',
      city: 'Bronx, NY',
    },
    blockedDates: ['2024-02-15', '2024-02-16', '2024-02-17'],
    createdAt: '2024-01-18',
  },
  {
    id: '6',
    ownerId: '1',
    title: 'Graco Airless Paint Sprayer',
    description: 'Professional airless sprayer for walls and ceilings. Adjustable pressure. Includes various tips for different finishes.',
    category: 'painting',
    brand: 'Graco',
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
    ],
    pricePerDay: 40,
    pricePerWeek: 160,
    replacementValue: 500,
    instantBook: true,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: '123 Main St',
      city: 'Brooklyn, NY',
    },
    blockedDates: [],
    createdAt: '2024-01-22',
  },
  {
    id: '7',
    ownerId: '6',
    title: 'Craftsman 5-Drawer Tool Chest',
    description: 'Portable tool chest with drawer lock. Perfect for keeping tools organized on the job site.',
    category: 'automotive',
    brand: 'Craftsman',
    condition: 'fair',
    images: [
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800',
    ],
    pricePerDay: 20,
    pricePerWeek: 80,
    replacementValue: 300,
    instantBook: true,
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '888 Madison Ave',
      city: 'Manhattan, NY',
    },
    blockedDates: [],
    createdAt: '2024-01-28',
  },
  {
    id: '8',
    ownerId: '7',
    title: 'Husqvarna 450 Chainsaw 20"',
    description: 'Powerful chainsaw for larger jobs. Recently serviced with new chain. Great for felling trees.',
    category: 'garden',
    brand: 'Husqvarna',
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1611532221654-244e79e24e2f?w=800',
    ],
    pricePerDay: 65,
    pricePerWeek: 260,
    replacementValue: 950,
    instantBook: false,
    location: {
      lat: 40.7282,
      lng: -73.7949,
      address: '444 Nassau Expy',
      city: 'Jamaica, NY',
    },
    blockedDates: [],
    createdAt: '2024-01-30',
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Mike Chen',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    phone: '555-0101',
    mode: 'both',
    verified: true,
    rating: 4.9,
    reviewCount: 47,
    rentalsCompleted: 52,
    joinedDate: '2023-06-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    phone: '555-0102',
    mode: 'lender',
    verified: true,
    rating: 4.8,
    reviewCount: 32,
    rentalsCompleted: 38,
    joinedDate: '2023-08-20',
  },
  {
    id: '3',
    name: 'David Martinez',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    phone: '555-0103',
    mode: 'both',
    verified: true,
    rating: 4.7,
    reviewCount: 28,
    rentalsCompleted: 31,
    joinedDate: '2023-09-10',
  },
  {
    id: '4',
    name: 'Emily Wong',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    phone: '555-0104',
    mode: 'borrower',
    verified: true,
    rating: 5.0,
    reviewCount: 15,
    rentalsCompleted: 18,
    joinedDate: '2023-11-05',
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    phone: '555-0105',
    mode: 'lender',
    verified: false,
    rating: 4.5,
    reviewCount: 12,
    rentalsCompleted: 14,
    joinedDate: '2023-12-01',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    phone: '555-0106',
    mode: 'lender',
    verified: true,
    rating: 4.6,
    reviewCount: 19,
    rentalsCompleted: 22,
    joinedDate: '2023-10-15',
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
    phone: '555-0107',
    mode: 'both',
    verified: true,
    rating: 4.8,
    reviewCount: 25,
    rentalsCompleted: 28,
    joinedDate: '2023-09-20',
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    toolId: '1',
    renterId: '4',
    ownerId: '1',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    totalPrice: 75,
    deposit: 100,
    status: 'confirmed',
    pickupMethod: 'meetup',
    pickupLocation: 'Central Park Meeting Point',
    createdAt: '2024-02-01',
  },
  {
    id: 'b2',
    toolId: '3',
    renterId: '4',
    ownerId: '3',
    startDate: '2024-01-20',
    endDate: '2024-01-21',
    totalPrice: 110,
    deposit: 200,
    status: 'completed',
    pickupMethod: 'meetup',
    pickupLocation: 'Riverside Park',
    createdAt: '2024-01-15',
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    bookingId: 'b2',
    reviewerId: '4',
    revieweeId: '3',
    toolId: '3',
    rating: 5,
    text: 'Great chainsaw, worked perfectly for my tree removal project. David was very helpful with pickup instructions.',
    createdAt: '2024-01-22',
  },
  {
    id: 'r2',
    bookingId: 'b2',
    reviewerId: '3',
    revieweeId: '4',
    rating: 5,
    text: 'Emily was great! Returned the tool in perfect condition and on time. Would rent to her again.',
    createdAt: '2024-01-22',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'c1',
    participants: ['1', '4'],
    bookingId: 'b1',
    lastMessage: 'Sounds good! See you Saturday at 10am.',
    lastMessageAt: '2024-02-05T14:30:00Z',
    unreadCount: 1,
  },
];

export const messages: Message[] = [
  {
    id: 'm1',
    conversationId: 'c1',
    senderId: '4',
    text: 'Hi! I wanted to confirm the pickup for this weekend.',
    createdAt: '2024-02-05T14:00:00Z',
  },
  {
    id: 'm2',
    conversationId: 'c1',
    senderId: '1',
    text: 'Sounds good! See you Saturday at 10am.',
    createdAt: '2024-02-05T14:30:00Z',
  },
];

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  mode: 'borrower' | 'lender' | 'both';
  verified: boolean;
  rating: number;
  reviewCount: number;
  rentalsCompleted: number;
  joinedDate: string;
};

export type Tool = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  images: string[];
  pricePerDay: number;
  pricePerWeek?: number;
  replacementValue: number;
  instantBook: boolean;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  blockedDates: string[];
  createdAt: string;
};

export type Booking = {
  id: string;
  toolId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'disputed' | 'cancelled';
  pickupMethod: 'meetup' | 'delivery';
  pickupLocation?: string;
  createdAt: string;
};

export type Review = {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  toolId?: string;
  rating: number;
  text: string;
  createdAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  participants: string[];
  bookingId?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
};

import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  uuid,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userModeEnum = pgEnum('user_mode', ['borrower', 'lender', 'both']);
export const toolConditionEnum = pgEnum('tool_condition', ['new', 'like-new', 'good', 'fair']);
export const bookingStatusEnum = pgEnum('booking_status', [
  'pending',
  'accepted',
  'rejected',
  'cancelled',
  'active',
  'completed',
  'disputed',
]);
export const pickupMethodEnum = pgEnum('pickup_method', ['meetup', 'delivery']);

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatar: text('avatar'),
  phone: text('phone'),
  mode: userModeEnum('mode').default('both'),
  stripeAccountId: text('stripe_account_id'),
  stripeAccountStatus: text('stripe_account_status'),
  stripeCustomerId: text('stripe_customer_id'),
  identityVerified: boolean('identity_verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tools = pgTable('tools', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  brand: text('brand'),
  condition: toolConditionEnum('condition').notNull().default('good'),
  images: jsonb('images').$type<string[]>().default([]),
  pricePerDay: decimal('price_per_day', { precision: 10, scale: 2 }).notNull(),
  pricePerWeek: decimal('price_per_week', { precision: 10, scale: 2 }),
  replacementValue: decimal('replacement_value', { precision: 10, scale: 2 }).notNull(),
  instantBook: boolean('instant_book').default(false),
  bufferDays: integer('buffer_days').default(0),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),
  city: text('city'),
  blockedDates: jsonb('blocked_dates').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id').notNull().references(() => tools.id, { onDelete: 'cascade' }),
  renterId: text('renter_id').notNull().references(() => users.id),
  ownerId: text('owner_id').notNull().references(() => users.id),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  deposit: decimal('deposit', { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal('platform_fee', { precision: 10, scale: 2 }).notNull(),
  status: bookingStatusEnum('status').default('pending'),
  pickupMethod: pickupMethodEnum('pickup_method').default('meetup'),
  pickupLocation: text('pickup_location'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  stripePaymentStatus: text('stripe_payment_status'),
  expiresAt: timestamp('expires_at'),
  pickupPhotos: jsonb('pickup_photos').$type<string[]>().default([]),
  returnPhotos: jsonb('return_photos').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingId: uuid('booking_id').notNull().references(() => bookings.id, { onDelete: 'cascade' }),
  reviewerId: text('reviewer_id').notNull().references(() => users.id),
  revieweeId: text('reviewee_id').notNull().references(() => users.id),
  toolId: uuid('tool_id').references(() => tools.id, { onDelete: 'set null' }),
  rating: integer('rating').notNull(),
  text: text('text'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  participants: jsonb('participants').$type<string[]>().notNull(),
  bookingId: uuid('booking_id').references(() => bookings.id, { onDelete: 'set null' }),
  lastMessage: text('last_message'),
  lastMessageAt: timestamp('last_message_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull().references(() => users.id),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tools: many(tools),
  bookingsAsRenter: many(bookings, { relationName: 'renter' }),
  bookingsAsOwner: many(bookings, { relationName: 'owner' }),
}));

export const toolsRelations = relations(tools, ({ one, many }) => ({
  owner: one(users, {
    fields: [tools.ownerId],
    references: [users.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  tool: one(tools, {
    fields: [bookings.toolId],
    references: [tools.id],
  }),
  renter: one(users, {
    fields: [bookings.renterId],
    references: [users.id],
    relationName: 'renter',
  }),
  owner: one(users, {
    fields: [bookings.ownerId],
    references: [users.id],
    relationName: 'owner',
  }),
  reviews: many(reviews),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  booking: one(bookings, {
    fields: [conversations.bookingId],
    references: [bookings.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

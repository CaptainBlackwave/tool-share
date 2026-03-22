# Active Context: ToolShare - P2P Tool Rental Marketplace

## Current State

**Project Status**: ✅ Phase 1 & 2 Complete

ToolShare is now backed by a full-stack infrastructure with authentication, database, payments, and media storage.

## Recently Completed

### Phase 1 & 2 Infrastructure
- [x] Installed dependencies: Clerk, Supabase, Drizzle ORM, UploadThing, Stripe
- [x] Created Drizzle schema with users, tools, bookings, reviews, conversations, messages tables
- [x] Implemented Clerk webhook for user sync to Supabase (`/api/webhooks/clerk`)
- [x] Set up UploadThing for tool image uploads
- [x] Implemented Stripe Connect for lender payouts and renter checkout
- [x] Created Stripe webhook for payment events (`/api/webhooks/stripe`)
- [x] Built Server Actions for tools, bookings, and Stripe onboarding
- [x] Added middleware for protected routes

### MVP (Previously Completed)
- [x] Created SPEC.md with detailed specifications
- [x] Implemented landing page with hero, categories, featured tools
- [x] Built browse/search page with filters
- [x] Created tool detail pages with booking
- [x] Built listing creation flow (5-step wizard)
- [x] Implemented authentication pages (signin, signup, verify)
- [x] Created dashboard with listings, rentals, earnings tabs
- [x] Built messaging system
- [x] Created booking flow with date selection, payment, confirmation
- [x] Applied "Industrial Workshop" design aesthetic with charcoal/orange theme

## Project Structure

### New Infrastructure Files
| File/Directory | Purpose |
|----------------|---------|
| `src/lib/db/schema.ts` | Drizzle ORM schema for Supabase |
| `src/lib/supabase/client.ts` | Supabase client (admin & anon) |
| `src/lib/stripe/server.ts` | Stripe Connect functions |
| `src/lib/uploadthing/router.ts` | UploadThing file router |
| `src/middleware.ts` | Clerk authentication middleware |
| `src/actions/tools.ts` | Server Actions for tool CRUD |
| `src/actions/bookings.ts` | Server Actions for bookings |
| `src/actions/stripe.ts` | Server Actions for Stripe onboarding |
| `src/app/api/webhooks/clerk/route.ts` | Clerk webhook handler |
| `src/app/api/webhooks/stripe/route.ts` | Stripe webhook handler |
| `src/app/api/uploadthing/route.ts` | UploadThing API route |
| `drizzle.config.ts` | Drizzle Kit configuration |

### UI Pages
| File/Directory | Purpose |
|----------------|---------|
| `src/app/page.tsx` | Landing page |
| `src/app/browse/page.tsx` | Search & browse tools |
| `src/app/tools/[id]/page.tsx` | Tool detail page |
| `src/app/list/page.tsx` | Create new listing |
| `src/app/book/[toolId]/page.tsx` | Booking flow |
| `src/app/dashboard/page.tsx` | User dashboard |
| `src/app/messages/page.tsx` | Messaging |
| `src/app/auth/signin/page.tsx` | Sign in |
| `src/app/auth/signup/page.tsx` | Sign up |
| `src/app/auth/verify/page.tsx` | Identity verification |

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4
- Bun package manager
- Clerk (Authentication)
- Supabase (PostgreSQL + Realtime)
- Drizzle ORM
- UploadThing (Media storage)
- Stripe Connect (Payments)

## Environment Variables Required

See `.env.example` for all required keys:
- Clerk: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- UploadThing: `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-03-22 | ToolShare MVP complete - all core features implemented |
| 2026-03-22 | Phase 1 & 2 infrastructure - Clerk, Supabase, Drizzle, Stripe, UploadThing |

## Database Schema

Tables created in Supabase:
- `users` - User profiles with Clerk ID, Stripe account info
- `tools` - Tool listings with geolocation coordinates
- `bookings` - Rental bookings with payment status
- `reviews` - Two-way ratings
- `conversations` - Message threads
- `messages` - Individual messages

## Next Steps

- Run `drizzle-kit push` to create tables in Supabase
- Configure Clerk webhooks in Clerk dashboard
- Configure Stripe webhooks in Stripe dashboard
- Set up UploadThing in dashboard

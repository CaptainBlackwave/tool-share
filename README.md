# ToolShare

A peer-to-peer tool rental marketplace that connects people who own tools with people in their local community who need to rent them for short-term projects.

## Features

### Core Marketplace
- **Browse Tools** - Search and filter tools by category, price, and distance
- **List Your Tools** - Create listings with photos, pricing, and availability
- **Book Tools** - Request rentals with date selection and secure payment
- **Messaging** - In-app communication between renters and owners
- **Dashboard** - Manage your listings, rentals, and earnings

### Trust & Safety
- **Identity Verification** - Secure verification flow for all users
- **Handoff Protocol** - Photo-based condition verification for pickups/returns
- **Double-Blind Reviews** - Both parties review after rental completes
- **Security Deposits** - Pre-authorization holds for damage protection

### Operations
- **Availability Checking** - Real-time booking prevention for double-rentals
- **Booking State Machine** - Strict lifecycle: pending → accepted → active → completed
- **Dispute Resolution** - Admin dashboard for handling issues
- **Cron Jobs** - Automated booking expiration and payout release
- **Marketplace Analytics** - Track liquidity metrics, search-to-fill rate, utilization

### Admin Panel
- **Command Center** - Overview with metrics, alerts, and activity feed
- **User Management** - Suspend users, verify identity
- **Tools Moderation** - Takedown inappropriate listings, filter by category
- **Bookings Management** - Force refund/complete bookings
- **Reviews Moderation** - Delete violating reviews

### Pages
- Landing page with hero, categories, featured tools
- Browse/search with radius filtering and map view
- Tool detail pages with dynamic SEO metadata
- Booking flow with calendar and price calculator
- User dashboard with Lending/Borrowing views
- Messaging with real-time polling
- Full Admin Command Center with sidebar navigation
- Analytics dashboard for marketplace health
- Legal pages (Privacy Policy, Terms of Service)
- Company pages (About, Careers, Press, Blog, Help, Safety, Insurance, Contact)

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, Tailwind CSS 4
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL with PostGIS)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Storage**: UploadThing
- **Payments**: Stripe Connect (marketplace with lender payouts)
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics
- **Package Manager**: Bun

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Run linting
bun lint

# Type checking
bun typecheck

# Push schema to database
bunx drizzle-kit push

# Seed database with admin and mock data
bun run db:seed
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

- **Clerk**: Authentication (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
- **Admin**: Set admin user ID (`ADMIN_CLERK_ID`)
- **Supabase**: Database (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- **UploadThing**: File storage (`UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`)
- **Stripe**: Payments (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`)
- **Sentry**: Error tracking (optional: `NEXT_PUBLIC_SENTRY_DSN`)
- **Google Analytics**: Traffic analytics (optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID`)

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── browse/                     # Browse tools
│   ├── tools/[id]/                # Tool detail page
│   ├── list/                      # Create listing
│   ├── book/[toolId]/            # Booking flow
│   ├── dashboard/                 # User dashboard
│   ├── messages/                  # Messaging
│   ├── admin/                     # Admin panel
│   │   ├── page.tsx              # Command Center
│   │   ├── users/                # User management
│   │   ├── tools/                # Tools moderation
│   │   ├── bookings/             # Bookings management
│   │   └── reviews/              # Reviews moderation
│   ├── analytics/                 # Marketplace analytics
│   ├── privacy/                   # Privacy Policy
│   ├── terms/                     # Terms of Service
│   ├── about/                     # About Us
│   ├── careers/                   # Careers
│   ├── contact/                   # Contact Us
│   ├── blog/                      # Blog & SEO content
│   ├── help/                      # Help Center
│   ├── safety/                    # Safety Center
│   ├── insurance/                  # Insurance info
│   ├── auth/                      # Authentication
│   └── api/                       # API routes, webhooks, cron
├── actions/                        # Server Actions (tools, bookings, admin, etc.)
├── components/
│   ├── layout/                    # Header, Footer
│   ├── ui/                        # Reusable components
│   └── analytics/                 # Analytics tracking
├── lib/                            # Utilities, configs, ORM schema
├── db/
│   └── seed.ts                    # Database seeding script
└── middleware.ts                   # Auth middleware
```

## Database Schema

Tables in Supabase:
- **users** - User profiles with Clerk ID, Stripe account info, location, role
- **tools** - Tool listings with images, pricing, geolocation coordinates
- **bookings** - Rental bookings with payment status, handoff photos
- **reviews** - Two-way ratings (released after both parties review)
- **conversations** - Message threads
- **messages** - Individual messages

## Database Seeding

Run `bun run db:seed` to populate the database with:
- Admin user (set `ADMIN_CLERK_ID` in .env to create)
- 15 mock users with random profiles
- 30 mock tools with Cape Breton coordinates
- 20 mock bookings in various states
- 25 mock reviews

## Booking State Machine

The platform implements a strict booking lifecycle:

1. **pending** - Borrower submits request (expires in 24 hours if not accepted)
2. **accepted** - Lender approves, payment processed
3. **active** - Tool handed over with photo verification
4. **completed** - Tool returned and confirmed
5. **disputed** - Issue reported, admin intervention required
6. **rejected** - Lender declines request
7. **cancelled** - Borrower cancels or system auto-cancels

## Design

- **Primary Color**: Charcoal (#1a1a1a)
- **Accent Color**: Warm Orange (#e85d04)
- **Secondary Accent**: Golden Yellow (#ffbe0b)
- **Success**: Forest Green (#2d6a4f)
- **Typography**: Bebas Neue (headings), DM Sans (body)

## Deployment

```bash
# Run the build
npm run build

# The output is in .next/ directory
# Deploy to Vercel or any Next.js-compatible host
```

## License

MIT
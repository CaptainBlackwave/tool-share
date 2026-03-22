# ToolShare

A peer-to-peer tool rental marketplace that connects people who own tools with people in their local community who need to rent them for short-term projects.

## Features

- **Browse Tools** - Search and filter tools by category, price, and distance
- **List Your Tools** - Create listings with photos, pricing, and availability
- **Book Tools** - Request rentals with date selection and secure payment
- **Messaging** - In-app communication between renters and owners
- **Dashboard** - Manage your listings, rentals, and earnings
- **Identity Verification** - Secure verification flow for all users
- **Calendar & Availability** - Real-time availability checking with date picker
- **Handoff Protocol** - Photo-based condition verification for pickups/returns

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, Tailwind CSS 4
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL with PostGIS)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Storage**: UploadThing
- **Payments**: Stripe Connect
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
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

- Clerk: Authentication
- Supabase: Database
- UploadThing: File storage
- Stripe: Payments

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── browse/               # Browse tools
│   ├── tools/[id]/           # Tool detail page
│   ├── list/                 # Create listing
│   ├── book/[toolId]/       # Booking flow
│   ├── dashboard/            # User dashboard
│   ├── messages/             # Messaging
│   ├── auth/                 # Authentication
│   └── api/                  # API routes & webhooks
├── components/
│   ├── layout/               # Header, Footer
│   └── ui/                   # Reusable components
├── actions/                  # Server Actions
├── lib/                      # Utilities & configs
└── middleware.ts             # Auth middleware
```

## Booking State Machine

The platform implements a strict booking lifecycle:

1. **pending** - Borrower submits request
2. **accepted** - Lender approves
3. **active** - Tool handed over
4. **completed** - Tool returned successfully
5. **disputed** - Issue reported
6. **rejected**/cancelled - Request declined/canceled

## Design

- **Primary Color**: Charcoal (#1a1a1a)
- **Accent Color**: Warm Orange (#e85d04)
- **Typography**: Bebas Neue (headings), DM Sans (body)

## License

MIT

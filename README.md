# ToolShare

A peer-to-peer tool rental marketplace that connects people who own tools with people in their local community who need to rent them for short-term projects.

## Features

- **Browse Tools** - Search and filter tools by category, price, and distance
- **List Your Tools** - Create listings with photos, pricing, and availability
- **Book Tools** - Request rentals with date selection and secure payment
- **Messaging** - In-app communication between renters and owners
- **Dashboard** - Manage your listings, rentals, and earnings
- **Identity Verification** - Secure verification flow for all users

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4
- Bun package manager

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
```

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
│   └── auth/                 # Authentication
├── components/
│   ├── layout/               # Header, Footer
│   └── ui/                   # Reusable components
└── lib/
    └── data.ts               # Mock data
```

## Design

- **Primary Color**: Charcoal (#1a1a1a)
- **Accent Color**: Warm Orange (#e85d04)
- **Typography**: Bebas Neue (headings), DM Sans (body)

## License

MIT

# ToolShare - Product Specification

## 1. Project Overview

**Project Name:** ToolShare
**Type:** Peer-to-peer tool rental marketplace (web application)
**Core Functionality:** A platform connecting tool owners with renters in their local community, enabling short-term tool rentals.
**Target Users:** Homeowners, DIY enthusiasts, contractors, and anyone needing temporary access to tools.

---

## 2. UI/UX Specification

### 2.1 Design Philosophy

ToolShare embraces an **"Industrial Workshop" aesthetic** - combining the warmth of craftsmanship with modern digital convenience. The design evokes feelings of a well-organized garage workshop: functional, trustworthy, and inviting.

### 2.2 Color Palette

| Role | Color | Hex Code |
|------|-------|----------|
| Primary | Deep Charcoal | `#1a1a1a` |
| Secondary | Warm Orange | `#e85d04` |
| Accent | Safety Yellow | `#ffbe0b` |
| Background | Off-White | `#faf9f7` |
| Surface | Light Gray | `#f0ede8` |
| Text Primary | Near Black | `#222222` |
| Text Secondary | Medium Gray | `#6b6b6b` |
| Success | Forest Green | `#2d6a4f` |
| Error | Brick Red | `#d00000` |
| Border | Warm Gray | `#d4d0c8` |

### 2.3 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | "Bebas Neue" (Google Fonts) | 400 | H1: 56px, H2: 40px, H3: 28px |
| Body | "DM Sans" (Google Fonts) | 400, 500, 600 | Body: 16px, Small: 14px |
| Accent/Numbers | "JetBrains Mono" | 500 | Prices, ratings |

### 2.4 Spacing System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Container max-width: 1280px
- Content max-width: 1024px

### 2.5 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 640px | Phones |
| Tablet | 640px - 1024px | Tablets |
| Desktop | > 1024px | Desktops |

### 2.6 Visual Effects

- **Cards:** 2px border with `#d4d0c8`, 8px border-radius, subtle shadow (`0 2px 8px rgba(0,0,0,0.06)`)
- **Buttons:** 6px border-radius, hover lift effect with shadow
- **Images:** 8px border-radius, slight vignette on hover
- **Transitions:** 200ms ease-out for all interactions

### 2.7 Layout Structure

#### Header (all pages)
- Logo (left): "TOOLSHARE" in Bebas Neue, with wrench icon
- Navigation (center): Browse, List a Tool, How It Works
- User area (right): Search icon, Sign In / Avatar dropdown
- Mobile: Hamburger menu with slide-out drawer

#### Footer (all pages)
- 4-column grid: Company, For Renters, For Lenders, Support
- Newsletter signup
- Social links
- Copyright

---

## 3. Page Specifications

### 3.1 Landing Page (/)

**Hero Section:**
- Full-width background with subtle diagonal stripes pattern
- Headline: "Rent Tools From Your Neighbors"
- Subheadline: "Save money. Complete your project. Join thousands of tool-sharers."
- Search bar: Location input + Category dropdown + "Find Tools" button
- Animated floating tool icons (drill, saw, ladder)

**Featured Categories:**
- 6 cards in 3x2 grid
- Categories: Power Tools, Garden & Lawn, Cleaning, Construction, Automotive, Painting
- Each card: Icon + name + count of available tools

**How It Works:**
- 3-step horizontal flow with illustrations
- Step 1: "Find" - Search for tools near you
- Step 2: "Book" - Request dates and coordinate pickup
- Step 3: "Complete" - Finish your project, return the tool

**Featured Tools:**
- Horizontal scrollable carousel
- Tool cards with: Photo, name, price/day, distance, rating

**Trust Section:**
- Stats: "10,000+ Tools", "5,000+ Active Users", "98% Satisfaction"
- Badges: ID Verified, Secure Payments, Insurance Covered

**CTA Section:**
- "Start Earning" button for lenders
- Background: Warm orange gradient

### 3.2 Browse/Search Page (/browse)

**Layout:** 2-column (filters sidebar + results grid)

**Search Bar (sticky):**
- Location input with autocomplete
- Date range picker
- Category dropdown

**Filters Sidebar:**
- Category (checkboxes)
- Distance (slider: 1-25 miles)
- Price range (slider: $0-$200/day)
- Brand (multi-select)
- Condition (New, Like New, Good, Fair)
- Instant Book toggle

**Results Grid:**
- Sort dropdown: Relevance, Price Low-High, Price High-Low, Distance, Rating
- View toggle: Grid / List
- Results count header

**Tool Card:**
- Image (aspect 4:3)
- Title
- Category badge
- Price: $X/day (highlighted in orange)
- Distance
- Rating stars + count
- "Instant Book" badge if eligible

**Pagination:** Numbered pages with prev/next

### 3.3 Tool Detail Page (/tools/[id])

**Image Gallery:**
- Main image (large, 16:9)
- Thumbnail strip below (min 3 images)
- Lightbox on click

**Main Content (2-column):**

*Left Column:*
- Title
- Category & Condition badges
- Owner card: Avatar, name, "X rentals completed", rating
- Description
- What's included (list)
- House rules / notes
- Availability calendar (mini)
- Location (approximate, shown after booking)

*Right Column (sticky):*
- Price: $X/day, $Y/week
- Date picker
- Duration selector
- Price breakdown
- "Request to Book" button
- "Message Owner" button
- Security deposit notice

**Reviews Section:**
- Overall rating (X/5 stars)
- Breakdown: 5 star, 4 star, etc. bars
- Review cards: User, date, rating, text

**Similar Tools:**
- Horizontal carousel of related tools

### 3.4 Listing Creation Flow (/list)

**Step 1: Basic Info**
- Category dropdown
- Title input
- Description textarea
- Brand input

**Step 2: Photos**
- Drag & drop zone
- Minimum 3 photos required
- Reorder capability
- Photo preview

**Step 3: Pricing**
- Daily rate input
- Weekly rate input (optional)
- Smart Price suggestion button
- Replacement value input (for deposit)

**Step 4: Availability**
- Calendar to block dates
- "Instant Book" toggle
- Pickup instructions

**Step 5: Review & Publish**
- Summary of all info
- Publish button

### 3.5 Dashboard (/dashboard)

**Tab Navigation:**
- My Listings (for lenders)
- My Rentals (for renters)
- Messages
- Earnings / Spending

**My Listings Tab:**
- Active listings grid
- Stats per listing: Views, Requests, Earnings
- Actions: Edit, Pause, Delete

**My Rentals Tab:**
- Upcoming rentals
- Past rentals
- Status badges: Pending, Confirmed, Completed, Disputed

### 3.6 Booking Flow (/book/[toolId])

**Step 1: Select Dates**
- Calendar picker
- Duration display

**Step 2: Pickup Details**
- Choose: Meetup location or Owner's address
- Suggested safe spots (police stations, etc.)
- Time selection

**Step 3: Payment**
- Card input (Stripe Elements style)
- Security deposit notice
- Platform fee breakdown
- Terms acceptance

**Step 4: Confirmation**
- Success message
- Booking details
- "Message Owner" quick link

### 3.7 Messages (/messages)

**Layout:** 2-column (conversation list + active chat)

**Conversation List:**
- User avatar + name
- Last message preview
- Timestamp
- Unread indicator

**Chat Area:**
- Header: User + current booking reference
- Message bubbles (sent/received)
- Timestamp per message
- Quick actions: "View Booking", "Report Issue"

### 3.8 Auth Pages

**Sign In (/auth/signin):**
- Email/password form
- "Sign in with Google" button
- "Sign in with Apple" button
- "Forgot password?" link
- "Create account" link

**Sign Up (/auth/signup):**
- Toggle: "I want to rent tools" / "I want to list tools" / "Both"
- Name, email, password
- Phone number (for verification)
- Agree to terms

**Verification (/auth/verify):**
- ID upload flow (mock)
- Selfie with ID (mock)
- Success state

---

## 4. Component Specifications

### 4.1 Core Components

| Component | States | Behavior |
|-----------|--------|----------|
| Button | default, hover, active, disabled, loading | Ripple effect on click |
| Input | default, focus, error, disabled | Floating label animation |
| Card | default, hover, selected | Lift on hover |
| Badge | various colors | Pill shape |
| Avatar | default, with-status | Online indicator dot |
| Rating | display, interactive | Star fill animation |
| Calendar | default, selected-range, blocked | Date range selection |
| Modal | open, closed | Fade + scale animation |
| Toast | success, error, info | Slide in from top-right |

### 4.2 Tool Card Component

```tsx
interface ToolCardProps {
  id: string;
  title: string;
  images: string[];
  pricePerDay: number;
  pricePerWeek?: number;
  distance: number;
  rating: number;
  reviewCount: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  instantBook: boolean;
  owner: {
    name: string;
    avatar: string;
  };
}
```

### 4.3 User Card Component

```tsx
interface UserCardProps {
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  rentalsCompleted: number;
  verified: boolean;
  joinedDate: string;
}
```

---

## 5. Functionality Specification

### 5.1 Core Features

**User Authentication (Mock):**
- Sign up / Sign in forms
- User mode toggle (Borrower/Lender/Both)
- Profile management

**Tool Listings:**
- Create listing flow with multi-step form
- Edit/delete listings
- Photo upload with preview
- Availability calendar management

**Search & Discovery:**
- Text search
- Category filtering
- Distance radius filter
- Price range filter
- Sort options

**Booking System:**
- Date selection
- Price calculation (daily/weekly)
- Booking request flow
- Booking status tracking

**Messaging:**
- Conversation list
- Real-time chat (mock with polling)
- Message notifications

**Reviews:**
- Leave review form
- Rating display
- Review history

### 5.2 Data Models

```typescript
interface User {
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
}

interface Tool {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  condition: string;
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
}

interface Booking {
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
}

interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  toolId?: string;
  rating: number;
  text: string;
  createdAt: string;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  participants: string[];
  bookingId?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}
```

---

## 6. Acceptance Criteria

### 6.1 Visual Checkpoints

- [ ] Landing page loads with hero, categories, how it works, featured tools
- [ ] Color scheme matches spec (charcoal primary, orange accent)
- [ ] Typography uses Bebas Neue for headings, DM Sans for body
- [ ] All cards have correct border radius and shadow
- [ ] Responsive layout works on mobile, tablet, desktop

### 6.2 Functional Checkpoints

- [ ] User can sign up and sign in (forms work)
- [ ] User can toggle between Borrower/Lender modes
- [ ] Search page displays tool cards with filters
- [ ] Tool detail page shows all information
- [ ] Listing creation flow completes all steps
- [ ] Booking flow calculates correct prices
- [ ] Messages page shows conversation list
- [ ] Dashboard shows listings and rentals tabs

### 6.3 Technical Checkpoints

- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] All pages render without console errors
- [ ] Navigation between pages works
- [ ] Mock data displays correctly

---

## 7. Technical Implementation Notes

- Use React Server Components by default
- Use "use client" for interactive components
- Store mock data in JSON files or in-memory
- Use CSS modules or Tailwind for styling
- Implement mock API routes for data operations
- All payment/ID verification is mock only

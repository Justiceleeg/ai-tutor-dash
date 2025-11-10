# Tutor Quality Scoring System

An automated tutor performance evaluation system that processes session data, generates AI-powered insights, and presents actionable recommendations through an interactive dashboard.

## Features

- **Tutor Management**: View and analyze all tutors in the system with advanced filtering
- **Individual Tutor Pages**: Detailed performance views with session timelines and risk analysis
- **Session Tracking**: Track ~2000 sessions with ratings and status
- **Performance Metrics**: Track ratings, success rates, reschedules, and no-shows
- **Interactive Dashboard**: System-wide metrics with visual charts
- **AI-Powered Insights**: Risk scoring, pattern detection, and actionable recommendations using OpenAI
- **Filtering System**: Filter tutors by risk level, rating, success rate, support tickets, and profile completion
- **Session Timeline**: Recharts visualization showing rating trends over time
- **Mock Data Generation**: Generate realistic tutor and session data

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Charts**: Recharts
- **AI/LLM**: Vercel AI SDK with OpenAI GPT-4
- **Data Storage**: Static JSON files

## Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm package manager
- OpenAI API key (for AI features)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then add your OpenAI API key to `.env.local`:

```
OPENAI_API_KEY=your_key_here
```

### Generate Mock Data

Generate tutor profiles and sessions:

```bash
pnpm generate:data
```

This creates:
- `/data/tutors.json` with 50-100 tutors
- `/data/sessions.json` with ~2000-3000 sessions linked to tutors

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Dashboard homepage
│   ├── api/               # API routes
│   │   ├── generate-risk-scores/  # AI risk scoring
│   │   └── analyze-patterns/      # Pattern analysis & recommendations
│   └── tutors/
│       ├── page.tsx       # Tutors list with filtering
│       └── [id]/          # Dynamic tutor detail pages
│           ├── page.tsx
│           ├── loading.tsx
│           └── not-found.tsx
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── dashboard/         # Dashboard-specific components
│   │   └── InsightsPanel.tsx
│   └── tutors/            # Tutor-specific components
│       ├── TutorTable.tsx
│       ├── TutorDetailView.tsx
│       ├── SessionTimeline.tsx
│       ├── TutorFilters.tsx
│       └── TutorsPageClient.tsx
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── data/
│   │   ├── generator.ts   # Mock data generation
│   │   ├── tutors.ts      # Data access functions
│   │   ├── sessions.ts    # Session data access
│   │   ├── processor.ts   # Metrics calculation
│   │   ├── generate-risk-scores.ts  # Risk score helper
│   │   └── generate-insights.ts     # Insights helper
│   └── utils.ts           # Utility functions
├── data/                  # Generated JSON data files
│   ├── tutors.json
│   ├── sessions.json
│   └── insights.json
└── docs/                  # Documentation
    ├── brief.md
    ├── ARCHITECTURE.md
    ├── TASKS.md
    ├── SLICE-3-COMPLETE.md
    ├── SLICE-4-COMPLETE.md
    └── SLICE-5-COMPLETE.md
```

## Data Models

### Tutor

```typescript
{
  id: string              // Unique tutor ID (e.g., "tutor-001")
  name: string            // Full name
  email: string           // Email address
  joinDate: Date          // When tutor joined
  totalSessions: number   // Total sessions completed
  avgRating: number       // Average rating (1-5)
  firstSessionSuccessRate: number  // % of first sessions rated 4+
  rescheduleRate: number  // % of sessions rescheduled
  noShowCount: number     // Number of no-shows
  currentStudentCount: number  // Active students (last 30 days)
  supportTicketCount: number   // Support tickets (last 48 hours)
  profileCompletionRate: number  // Profile completion % (0-100)
  riskScore?: "low" | "medium" | "high"  // AI-generated risk level
  riskReasoning?: string  // Explanation for risk score
  recommendations?: string[]  // Actionable recommendations
}
```

### Session

```typescript
{
  id: string
  tutorId: string
  studentId: string
  date: Date
  isFirstSession: boolean
  rating: number  // 1-5 stars
  duration: number  // minutes
  wasRescheduled: boolean
  wasNoShow: boolean
  wasCancelled: boolean
  feedback?: string
}
```

### Recommendation

```typescript
{
  id: string
  priority: "high" | "medium"
  category: "first_session" | "reliability" | "engagement" | "profile"
  action: string        # What to do
  reasoning: string     # Why this recommendation
}
```

## Development Roadmap

The project is built in vertical slices:

- [x] **Slice 1**: Foundation + Mock Data ✅
  - Next.js setup
  - Data generation
  - Tutor list UI

- [x] **Slice 2**: Session Data + Metrics ✅
  - Session generation (~2000 sessions)
  - Metrics calculation
  - Dashboard with charts

- [x] **Slice 3**: AI Risk Scoring ✅
  - OpenAI integration
  - Risk score generation
  - Visual risk indicators
  - Sortable table with modal

- [x] **Slice 4**: Pattern Detection ✅
  - System-wide analysis
  - Recommendations
  - Insights panel

- [x] **Slice 5**: Detail Views + Polish ✅
  - Individual tutor pages
  - Session timelines with charts
  - Filtering & navigation
  - UI polish & performance optimization

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm generate:data` - Generate mock tutor and session data
- `npx tsx lib/data/update-metrics.ts` - Calculate tutor metrics
- `npx tsx lib/data/generate-risk-scores.ts` - Generate AI risk scores
- `npx tsx lib/data/generate-insights.ts` - Generate system insights and recommendations

## Navigation Guide

### Dashboard (`/`)
- View system-wide metrics and statistics
- See rating distribution chart
- Review AI-generated system insights and patterns
- Quick links to tutor list

### Tutors List (`/tutors`)
- View all tutors with performance metrics
- Filter by:
  - Risk level (Low/Medium/High)
  - Average rating ranges
  - First session success rate
  - Support ticket count
  - Profile completion
- Sort by any column (click headers)
- Click tutor names to view detail pages
- Click risk badges to see risk analysis
- Click recommendation counts for detailed actions

### Tutor Detail Pages (`/tutors/[id]`)
- Comprehensive tutor profile with all metrics
- AI risk analysis with full reasoning
- Prioritized recommendations with categories
- Session timeline with rating trend chart
- Chronological session history with status badges
- Breadcrumb navigation back to list

## Contributing

This project follows the OpenSpec spec-driven development workflow. See `openspec/AGENTS.md` for details.

## License

Private project - All rights reserved

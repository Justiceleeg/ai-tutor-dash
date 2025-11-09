# Tutor Quality Scoring System

An automated tutor performance evaluation system that processes session data, generates AI-powered insights, and presents actionable recommendations through an interactive dashboard.

## Features

- **Tutor Management**: View and analyze all tutors in the system
- **Mock Data Generation**: Generate realistic tutor profiles for testing
- **Performance Metrics**: Track ratings, sessions, and success rates
- **AI-Powered Insights**: Risk scoring and pattern detection using OpenAI
- **Interactive Dashboard**: Visualize data with charts and metrics

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

Generate tutor profiles (50-100 tutors):

```bash
pnpm generate:data
```

This creates `/data/tutors.json` with realistic tutor data.

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
│   ├── page.tsx           # Homepage
│   └── tutors/
│       └── page.tsx       # Tutors list page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── tutors/            # Tutor-specific components
│       └── TutorTable.tsx
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── data/
│   │   ├── generator.ts   # Mock data generation
│   │   └── tutors.ts      # Data access functions
│   └── utils.ts           # Utility functions
├── data/                  # Generated JSON data files
│   └── tutors.json
└── docs/                  # Documentation
    ├── brief.md
    ├── ARCHITECTURE.md
    └── TASKS.md
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
  riskScore?: "low" | "medium" | "high"  // AI-generated risk level
  riskReasoning?: string  // Explanation for risk score
  recommendations?: string[]  // Actionable recommendations
}
```

### Session (Coming in Slice 2)

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

## Development Roadmap

The project is built in vertical slices:

- [x] **Slice 1**: Foundation + Mock Data ✅
  - Next.js setup
  - Data generation
  - Tutor list UI

- [ ] **Slice 2**: Session Data + Metrics
  - Session generation
  - Metrics calculation
  - Dashboard with charts

- [ ] **Slice 3**: AI Risk Scoring
  - OpenAI integration
  - Risk score generation
  - Visual risk indicators

- [ ] **Slice 4**: Pattern Detection
  - System-wide analysis
  - Recommendations
  - Insights panel

- [ ] **Slice 5**: Detail Views
  - Individual tutor pages
  - Session timelines
  - Filtering & navigation

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm generate:data` - Generate mock tutor data

## Contributing

This project follows the OpenSpec spec-driven development workflow. See `openspec/AGENTS.md` for details.

## License

Private project - All rights reserved

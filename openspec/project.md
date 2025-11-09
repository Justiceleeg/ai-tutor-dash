# Project Context

## Purpose

**Tutor Quality Scoring System** - An automated tutor performance evaluation system that processes mock session data, generates AI-powered insights, and presents actionable recommendations through an interactive dashboard.

### Core Goals
- Evaluate tutor performance across every session
- Identify coaching opportunities and patterns leading to poor first session experiences
- Predict which tutors will churn and recommend interventions
- Process 3,000 daily sessions and provide actionable insights within 1 hour of session completion

### Key Business Requirements
- Detect patterns leading to poor first session experiences (24% of churners fail here)
- Flag tutors with high rescheduling rates (98.2% of reschedules are tutor-initiated)
- Identify tutors at risk of no-shows (16% of tutor replacements due to no-shows)

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **UI Library:** shadcn/ui (Radix UI + Tailwind CSS)
- **Charts:** Recharts
- **Language:** TypeScript

### AI/LLM
- **SDK:** Vercel AI SDK
- **Provider:** OpenAI (GPT-4)
- **Use Cases:** Risk score generation, pattern detection, recommendation generation

### Data Storage
- **Static JSON files** (no database needed for MVP)
- Located in `/data` directory

### Runtime & Deployment
- **Platform:** Vercel (recommended for automatic deployments)
- **Package Manager:** pnpm

## Project Conventions

### Code Style
- **Language:** TypeScript (strict mode)
- **Framework:** Next.js App Router pattern
- **Component Structure:** Functional components with hooks
- **File Organization:**
  - `/app` - Pages and API routes
  - `/components/ui` - shadcn/ui components
  - `/components/dashboard` - Dashboard-specific components
  - `/components/tutor` - Tutor detail components
  - `/lib` - Utilities, data processing, and AI logic
  - `/data` - JSON data files

### Architecture Patterns

#### Data Flow
1. **Data Generation (One-time setup):** Script Execution → Generate Mock Data → Save to JSON files
2. **AI Processing (One-time or on-demand):** Read JSON files → Send to OpenAI API → Generate insights → Save results
3. **Dashboard Rendering:** Page Load → Read processed JSON → Display on dashboard → User interaction

#### Component Organization
- Prefer functional components with TypeScript
- UI components in `/components/ui` (shadcn)
- Feature-specific components organized by domain
- Reusable chart components for data visualization

#### API Routes
- `/api/generate-risk-scores` - OpenAI risk scoring endpoint
- `/api/analyze-patterns` - OpenAI pattern detection endpoint

#### Data Models
- **Tutor:** id, name, email, joinDate, totalSessions, avgRating, firstSessionSuccessRate, rescheduleRate, noShowCount, riskScore, riskReasoning, recommendations
- **Session:** id, tutorId, studentId, date, isFirstSession, rating, duration, wasRescheduled, wasNoShow, wasCancelled, feedback
- **Insights:** generatedAt, patterns (firstSessionFailures, commonRiskFactors), systemRecommendations

#### Simplicity First
- Default to <100 lines of new code per component
- Single-file implementations until proven insufficient
- Avoid frameworks without clear justification
- Choose boring, proven patterns
- Static data with pre-computed insights for fast page loads

### Testing Strategy

#### Manual Testing (MVP Approach)
Each slice has a clear manual test:
1. ✅ Can view tutor list
2. ✅ Dashboard shows calculated metrics
3. ✅ Tutors have AI risk scores
4. ✅ System displays pattern insights
5. ✅ Can navigate to tutor details

Manual testing sufficient for MVP - no automated tests needed initially.

#### Future Testing (if needed)
- Add automated tests for data processing logic
- Add integration tests for API routes
- Add E2E tests for critical user flows

### Git Workflow

- **Main branch:** `main` (production-ready code)
- **Development approach:** Vertical slices - each fully testable and builds on previous
- **Commit conventions:** Clear, descriptive commit messages
- **Untracked files currently:** `.cursor/`, `AGENTS.md`, `docs/`, `openspec/` (to be added as development progresses)

## Domain Context

### Education Technology Context
This system operates in a tutoring platform where:
- Tutors conduct 1-on-1 sessions with students
- First session experience is critical (24% churn rate for poor first sessions)
- Tutors frequently reschedule (98.2% tutor-initiated)
- No-shows are a significant problem (16% of replacements)

### Scale Requirements
- **Tutors:** 50-100 tutors in the system
- **Sessions:** ~3,000 sessions daily
- **Processing:** Insights must be generated within 1 hour of session completion

### Risk Scoring
- **Low Risk:** Performing well across all metrics
- **Medium Risk:** Some concerning patterns emerging
- **High Risk:** Multiple red flags, likely to churn or impact student experience

### Key Metrics
- Average rating (1-5 scale)
- First session success rate
- Reschedule rate
- No-show count
- Total sessions completed

## Important Constraints

### MVP Constraints
- No database needed for MVP (static JSON files sufficient)
- No real-time processing required (batch processing acceptable)
- Pre-computed insights for fast page loads
- Simple deployment model

### Performance Requirements
- Process 3,000 daily sessions
- Provide insights within 1 hour of session completion
- Fast dashboard load times (pre-computed data)

### Complexity Triggers
Only add complexity with:
- Performance data showing current solution too slow
- Concrete scale requirements (>1000 users, >100MB data)
- Multiple proven use cases requiring abstraction

### Future Scalability (if needed)
- Move to database (PostgreSQL/Supabase)
- Add real-time processing queue
- Implement caching layer
- Add incremental analysis

## External Dependencies

### OpenAI API
- **Purpose:** Generate risk scores, detect patterns, create recommendations
- **Models:** GPT-4
- **Integration:** Via Vercel AI SDK
- **Required:** `OPENAI_API_KEY` environment variable

### Vercel (Deployment)
- Automatic deployments from Git
- Edge functions for API routes
- Environment variable management
- Zero configuration needed

### shadcn/ui
- Pre-built accessible UI components
- Based on Radix UI primitives
- Styled with Tailwind CSS

### Recharts
- Chart visualization library
- Used for rating distributions, session timelines, and performance metrics

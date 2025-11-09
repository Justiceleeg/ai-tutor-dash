# Tutor Quality Scoring System - Architecture

## System Overview
An automated tutor performance evaluation system that processes mock session data, generates AI-powered insights, and presents actionable recommendations through an interactive dashboard.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **UI Library:** shadcn/ui (Radix UI + Tailwind CSS)
- **Charts:** Recharts
- **Language:** TypeScript

### AI/LLM
- **SDK:** Vercel AI SDK
- **Provider:** OpenAI (GPT-4)
- **Use Cases:** 
  - Risk score generation
  - Pattern detection
  - Recommendation generation

### Data Storage
- **Static JSON files** (no database needed for MVP)
- Located in `/data` directory

---

## Data Architecture

### Core Data Models

#### Tutor
```typescript
{
  id: string
  name: string
  email: string
  joinDate: Date
  totalSessions: number
  avgRating: number
  firstSessionSuccessRate: number
  rescheduleRate: number
  noShowCount: number
  riskScore?: "low" | "medium" | "high"
  riskReasoning?: string
  recommendations?: string[]
}
```

#### Session
```typescript
{
  id: string
  tutorId: string
  studentId: string
  date: Date
  isFirstSession: boolean
  rating: number (1-5)
  duration: number (minutes)
  wasRescheduled: boolean
  wasNoShow: boolean
  wasCancelled: boolean
  feedback?: string
}
```

#### Insights (AI-Generated)
```typescript
{
  generatedAt: Date
  patterns: {
    firstSessionFailures: string[]
    commonRiskFactors: string[]
  }
  systemRecommendations: string[]
}
```

---

## Application Structure

```
/app
  /page.tsx                    # Dashboard overview
  /tutors
    /page.tsx                  # Tutor list
    /[id]
      /page.tsx                # Individual tutor detail
  /api
    /generate-risk-scores
      /route.ts                # OpenAI risk scoring endpoint
    /analyze-patterns
      /route.ts                # OpenAI pattern detection endpoint

/components
  /ui                          # shadcn components
  /dashboard
    /MetricCard.tsx
    /RiskDistributionChart.tsx
    /TutorTable.tsx
    /InsightsPanel.tsx
  /tutor
    /TutorHeader.tsx
    /SessionTimeline.tsx
    /RecommendationsList.tsx

/lib
  /data
    /generator.ts              # Mock data generation
    /processor.ts              # Metrics calculation
  /ai
    /risk-scoring.ts           # AI risk analysis logic
    /pattern-detection.ts      # AI pattern detection logic
  /utils.ts                    # Helper functions

/data
  /tutors.json                 # Generated tutor data
  /sessions.json               # Generated session data
  /insights.json               # AI-generated insights
```

---

## Data Flow

### 1. Data Generation (One-time setup)
```
Script Execution → Generate Mock Data → Save to JSON files
```

### 2. AI Processing (One-time or on-demand)
```
Read JSON files → Send to OpenAI API → Generate insights → Save results
```

### 3. Dashboard Rendering
```
Page Load → Read processed JSON → Display on dashboard → User interaction
```

---

## AI Integration Points

### Risk Scoring (Per Tutor)
**Input:** Tutor metrics + session history  
**Prompt:** Analyze tutor performance and assign risk score (low/medium/high)  
**Output:** Risk score + reasoning + specific recommendations

### Pattern Detection (System-wide)
**Input:** All tutors + sessions data  
**Prompt:** Identify patterns in first session failures and churn indicators  
**Output:** List of detected patterns + system-level recommendations

---

## Key Features by Slice

### Slice 1: Foundation
- Project initialized
- Basic tutor data generated
- Simple table view

### Slice 2: Metrics
- Session data added
- Calculated metrics displayed
- First chart visualization

### Slice 3: AI Risk Scoring
- Risk scores per tutor
- Color-coded risk indicators
- AI reasoning displayed

### Slice 4: Insights
- Pattern detection across all tutors
- Recommendations panel
- System-level insights

### Slice 5: Detail Views
- Individual tutor pages
- Session timeline charts
- Filtering and navigation

---

## Performance Considerations

### Why Static Data Works
- No real-time processing needed
- All insights pre-computed
- Fast page loads
- Simple deployment

### Future Scalability (if needed)
- Move to database (PostgreSQL/Supabase)
- Add real-time processing queue
- Implement caching layer
- Add incremental analysis

---

## Deployment

**Platform:** Vercel (recommended)
- Automatic deployments from Git
- Edge functions for API routes
- Environment variables for OpenAI key
- Zero configuration needed

**Environment Variables Required:**
```
OPENAI_API_KEY=your_key_here
```

---

## Testing Strategy

Each slice has a clear test:
1. ✅ Can view tutor list
2. ✅ Dashboard shows calculated metrics
3. ✅ Tutors have AI risk scores
4. ✅ System displays pattern insights
5. ✅ Can navigate to tutor details

Manual testing sufficient for MVP - no automated tests needed initially.

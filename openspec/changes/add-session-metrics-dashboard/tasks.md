# Implementation Tasks: Add Session Data and Metrics Dashboard

## 1. Data Models Extension
- [x] 1.1 Add Session TypeScript interface to `/lib/types.ts`
- [x] 1.2 Define fields: id, tutorId, studentId, date, rating (1-5), duration
- [x] 1.3 Add boolean flags: isFirstSession, wasRescheduled, wasNoShow, wasCancelled
- [x] 1.4 Add optional feedback field for future use

## 2. Session Data Generation
- [x] 2.1 Update `/lib/data/generator.ts` to include session generation
- [x] 2.2 Implement `generateSessions(tutors)` function
- [x] 2.3 Generate ~3,000 sessions distributed across tutors
- [x] 2.4 Link each session to a valid tutor ID
- [x] 2.5 Generate random student IDs (student-001, student-002, etc.)
- [x] 2.6 Randomize session dates over past 6 months
- [x] 2.7 Assign realistic ratings (weighted toward 3-5 stars)
- [x] 2.8 Mark ~10-15% of sessions as first sessions
- [x] 2.9 Add realistic duration values (30-90 minutes)
- [x] 2.10 Randomly flag some sessions as rescheduled/no-show/cancelled
- [x] 2.11 Save sessions to `/data/sessions.json`
- [x] 2.12 Update generation script to create both tutors and sessions

## 3. Session Data Access
- [x] 3.1 Create `/lib/data/sessions.ts`
- [x] 3.2 Implement `getSessions()` to read all sessions
- [x] 3.3 Implement `getSessionsByTutorId(tutorId)` to filter by tutor
- [x] 3.4 Add helper functions for session queries

## 4. Metrics Calculation Engine
- [x] 4.1 Create `/lib/data/processor.ts` for metrics logic
- [x] 4.2 Implement `calculateTutorMetrics(tutorId, sessions)` function
- [x] 4.3 Calculate average rating from tutor's sessions
- [x] 4.4 Calculate total session count
- [x] 4.5 Calculate first session success rate (% of first sessions rated 4+)
- [x] 4.6 Calculate reschedule rate (% of sessions rescheduled)
- [x] 4.7 Count no-show incidents
- [x] 4.8 Implement `enrichTutorsWithMetrics(tutors, sessions)` to update all tutors
- [x] 4.9 Implement `calculateSystemMetrics(tutors, sessions)` for dashboard totals

## 5. Dashboard Components
- [x] 5.1 Install shadcn card component: `npx shadcn@latest add card`
- [x] 5.2 Create `/components/dashboard/MetricCard.tsx`
- [x] 5.3 Style metric card with title, value, and optional icon
- [x] 5.4 Create `/components/dashboard/RatingDistributionChart.tsx`
- [x] 5.5 Implement Recharts bar chart for rating distribution (1-5 stars)
- [x] 5.6 Add tooltips and labels to chart
- [x] 5.7 Make chart responsive

## 6. Dashboard Page
- [x] 6.1 Update `/app/page.tsx` to dashboard layout
- [x] 6.2 Fetch tutors and sessions data
- [x] 6.3 Calculate system-wide metrics
- [x] 6.4 Display metric cards in grid:
  - [x] Total Tutors
  - [x] Total Sessions
  - [x] Average Rating
  - [x] Active Tutors (tutors with sessions in last 30 days)
- [x] 6.5 Add rating distribution chart below metrics
- [x] 6.6 Add navigation link to tutors page
- [x] 6.7 Add page title: "Tutor Quality Dashboard"

## 7. Update Tutor Table
- [x] 7.1 Modify TutorTable to accept enriched tutor data
- [x] 7.2 Add "Avg Rating" column with star formatting
- [x] 7.3 Add "Sessions" column showing total count
- [x] 7.4 Add "First Session Success" column with percentage
- [x] 7.5 Add sorting capability (optional enhancement)

## 8. Update Data Generation Script
- [x] 8.1 Update npm script to generate both tutors and sessions
- [x] 8.2 Run metrics calculation and enrich tutors data
- [x] 8.3 Optionally save enriched tutors to separate file
- [x] 8.4 Add console output showing generation statistics

## 9. Testing and Validation
- [x] 9.1 Run updated data generation script
- [x] 9.2 Verify sessions.json contains ~3,000 entries
- [x] 9.3 Check that all sessions link to valid tutor IDs
- [x] 9.4 Spot-check metrics calculation accuracy
- [x] 9.5 Navigate to dashboard and verify metrics display
- [x] 9.6 Confirm rating chart renders correctly
- [x] 9.7 Check tutors page shows updated columns
- [x] 9.8 Test on mobile/tablet viewport sizes
- [x] 9.9 Run TypeScript check: `npm run build`
- [x] 9.10 Run lint check: `npm run lint`

## 10. Documentation
- [x] 10.1 Document session data structure
- [x] 10.2 Add comments to metrics calculation functions
- [x] 10.3 Update README with dashboard features


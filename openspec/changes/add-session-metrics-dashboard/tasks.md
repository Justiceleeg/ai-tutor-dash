# Implementation Tasks: Add Session Data and Metrics Dashboard

## 1. Data Models Extension
- [ ] 1.1 Add Session TypeScript interface to `/lib/types.ts`
- [ ] 1.2 Define fields: id, tutorId, studentId, date, rating (1-5), duration
- [ ] 1.3 Add boolean flags: isFirstSession, wasRescheduled, wasNoShow, wasCancelled
- [ ] 1.4 Add optional feedback field for future use

## 2. Session Data Generation
- [ ] 2.1 Update `/lib/data/generator.ts` to include session generation
- [ ] 2.2 Implement `generateSessions(tutors)` function
- [ ] 2.3 Generate ~3,000 sessions distributed across tutors
- [ ] 2.4 Link each session to a valid tutor ID
- [ ] 2.5 Generate random student IDs (student-001, student-002, etc.)
- [ ] 2.6 Randomize session dates over past 6 months
- [ ] 2.7 Assign realistic ratings (weighted toward 3-5 stars)
- [ ] 2.8 Mark ~10-15% of sessions as first sessions
- [ ] 2.9 Add realistic duration values (30-90 minutes)
- [ ] 2.10 Randomly flag some sessions as rescheduled/no-show/cancelled
- [ ] 2.11 Save sessions to `/data/sessions.json`
- [ ] 2.12 Update generation script to create both tutors and sessions

## 3. Session Data Access
- [ ] 3.1 Create `/lib/data/sessions.ts`
- [ ] 3.2 Implement `getSessions()` to read all sessions
- [ ] 3.3 Implement `getSessionsByTutorId(tutorId)` to filter by tutor
- [ ] 3.4 Add helper functions for session queries

## 4. Metrics Calculation Engine
- [ ] 4.1 Create `/lib/data/processor.ts` for metrics logic
- [ ] 4.2 Implement `calculateTutorMetrics(tutorId, sessions)` function
- [ ] 4.3 Calculate average rating from tutor's sessions
- [ ] 4.4 Calculate total session count
- [ ] 4.5 Calculate first session success rate (% of first sessions rated 4+)
- [ ] 4.6 Calculate reschedule rate (% of sessions rescheduled)
- [ ] 4.7 Count no-show incidents
- [ ] 4.8 Implement `enrichTutorsWithMetrics(tutors, sessions)` to update all tutors
- [ ] 4.9 Implement `calculateSystemMetrics(tutors, sessions)` for dashboard totals

## 5. Dashboard Components
- [ ] 5.1 Install shadcn card component: `npx shadcn@latest add card`
- [ ] 5.2 Create `/components/dashboard/MetricCard.tsx`
- [ ] 5.3 Style metric card with title, value, and optional icon
- [ ] 5.4 Create `/components/dashboard/RatingDistributionChart.tsx`
- [ ] 5.5 Implement Recharts bar chart for rating distribution (1-5 stars)
- [ ] 5.6 Add tooltips and labels to chart
- [ ] 5.7 Make chart responsive

## 6. Dashboard Page
- [ ] 6.1 Update `/app/page.tsx` to dashboard layout
- [ ] 6.2 Fetch tutors and sessions data
- [ ] 6.3 Calculate system-wide metrics
- [ ] 6.4 Display metric cards in grid:
  - [ ] Total Tutors
  - [ ] Total Sessions
  - [ ] Average Rating
  - [ ] Active Tutors (tutors with sessions in last 30 days)
- [ ] 6.5 Add rating distribution chart below metrics
- [ ] 6.6 Add navigation link to tutors page
- [ ] 6.7 Add page title: "Tutor Quality Dashboard"

## 7. Update Tutor Table
- [ ] 7.1 Modify TutorTable to accept enriched tutor data
- [ ] 7.2 Add "Avg Rating" column with star formatting
- [ ] 7.3 Add "Sessions" column showing total count
- [ ] 7.4 Add "First Session Success" column with percentage
- [ ] 7.5 Add sorting capability (optional enhancement)

## 8. Update Data Generation Script
- [ ] 8.1 Update npm script to generate both tutors and sessions
- [ ] 8.2 Run metrics calculation and enrich tutors data
- [ ] 8.3 Optionally save enriched tutors to separate file
- [ ] 8.4 Add console output showing generation statistics

## 9. Testing and Validation
- [ ] 9.1 Run updated data generation script
- [ ] 9.2 Verify sessions.json contains ~3,000 entries
- [ ] 9.3 Check that all sessions link to valid tutor IDs
- [ ] 9.4 Spot-check metrics calculation accuracy
- [ ] 9.5 Navigate to dashboard and verify metrics display
- [ ] 9.6 Confirm rating chart renders correctly
- [ ] 9.7 Check tutors page shows updated columns
- [ ] 9.8 Test on mobile/tablet viewport sizes
- [ ] 9.9 Run TypeScript check: `npm run build`
- [ ] 9.10 Run lint check: `npm run lint`

## 10. Documentation
- [ ] 10.1 Document session data structure
- [ ] 10.2 Add comments to metrics calculation functions
- [ ] 10.3 Update README with dashboard features


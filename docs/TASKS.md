# Tutor Quality Scoring System - Task List

## Project Overview
Build an automated tutor performance evaluation system using Next.js, shadcn/ui, Recharts, Vercel AI SDK, and OpenAI.

**Scale:** 50-100 tutors, ~3000 sessions  
**Approach:** Vertical slices - each fully testable and builds on previous

---

## Slice 1: Project Setup + Basic Mock Data Generation ✅
**Deliverable:** Running Next.js app that generates and displays raw tutor data

- [x] Initialize Next.js project with TypeScript
- [x] Install shadcn/ui, Recharts, Vercel AI SDK, OpenAI
- [x] Create data generation script for tutors (50-100 tutors with basic fields)
- [x] Create simple page that displays tutor list in a table
- [x] **Test:** Can see list of generated tutors with their IDs and names

**Completed:** All 41 implementation tasks finished. 90 tutors generated. Build and lint pass.

---

## Slice 2: Session Data + First Metrics ✅
**Deliverable:** Dashboard showing tutor metrics without AI

- [x] Extend data generator to create ~3000 sessions linked to tutors
- [x] Add three new tutor engagement metrics (current students, support tickets, profile completion)
- [x] Calculate basic metrics per tutor (avg rating, session count, first session success rate)
- [x] Create dashboard page with summary cards (total tutors, total sessions, avg rating)
- [x] Add simple Recharts visualization (e.g., rating distribution)
- [x] **Test:** Dashboard displays real calculated metrics from mock data

**Completed:** All 65+ implementation tasks finished. 2,509 sessions generated across 71 tutors. Dashboard with metrics and charts fully functional. Added engagement metrics: current students (0-20 range), support tickets (0-3), and profile completion (20-95%).

---

## Slice 3: Risk Scoring + AI Analysis
**Deliverable:** Tutors have AI-generated risk scores and insights

- [ ] Add risk indicators to session data (reschedules, no-shows, cancellations)
- [ ] Create API route that sends tutor data to OpenAI for risk scoring
- [ ] Generate and save risk scores + reasoning for each tutor
- [ ] Add risk score column to tutor table with color coding
- [ ] **Test:** Each tutor has a risk score (low/medium/high) with AI reasoning

---

## Slice 4: Pattern Detection + Recommendations
**Deliverable:** System identifies patterns and provides actionable recommendations

- [ ] Use OpenAI to analyze first session failure patterns across all tutors
- [ ] Generate specific recommendations for each at-risk tutor
- [ ] Create "Insights" section on dashboard showing detected patterns
- [ ] Add recommendations panel for high-risk tutors
- [ ] **Test:** Dashboard shows pattern insights and tutor-specific recommendations

---

## Slice 5: Tutor Detail View + Polish
**Deliverable:** Complete system with drill-down capabilities

- [ ] Create individual tutor detail page
- [ ] Show tutor timeline/history with session performance chart
- [ ] Display all flags, recommendations, and action items
- [ ] Add filters to tutor list (risk level, flags)
- [ ] Polish UI and add loading states
- [ ] **Test:** Can click tutor, see full details, navigate back

---

## Estimated Timeline
- **Slice 1:** 1 hour
- **Slice 2:** 1.5 hours
- **Slice 3:** 1.5 hours
- **Slice 4:** 1.5 hours
- **Slice 5:** 1.5 hours
- **Total:** ~7 hours

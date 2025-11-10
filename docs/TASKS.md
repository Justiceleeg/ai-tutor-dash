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

## Slice 3: Risk Scoring + AI Analysis ✅
**Deliverable:** Tutors have AI-generated risk scores and insights

- [x] Add risk indicators to session data (reschedules, no-shows, cancellations)
- [x] Create API route that sends tutor data to OpenAI for risk scoring
- [x] Generate and save risk scores + reasoning for each tutor
- [x] Add risk score column to tutor table with color coding
- [x] **Test:** Each tutor has a risk score (low/medium/high) with AI reasoning

**Completed:** All 42 implementation tasks finished (including 7 bonus tasks). AI-powered risk assessment implemented with OpenAI integration. Table sorting functionality added (default: highest risk first). Risk reasoning modal with full metrics display. All 82 tutors analyzed with risk scores and detailed AI reasoning.

---

## Slice 4: Pattern Detection + Recommendations ✅
**Deliverable:** System identifies patterns and provides actionable recommendations

- [x] Use OpenAI to analyze first session failure patterns across all tutors
- [x] Generate specific recommendations for each at-risk tutor
- [x] Create "Insights" section on dashboard showing detected patterns
- [x] Add recommendations panel for high-risk tutors
- [x] **Test:** Dashboard shows pattern insights and tutor-specific recommendations

**Completed:** All 64 implementation tasks finished. System-wide pattern analysis identifies 3 first session failure patterns, 3 common risk factors, and 3 system recommendations. Generated 2-4 specific, prioritized recommendations for each at-risk tutor (medium/high risk only). Dashboard insights panel with color-coded sections. Enhanced tutor table with recommendations column and expanded modal showing both risk analysis and actionable recommendations.

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
- **Slice 1:** 1 hour ✅ (Completed)
- **Slice 2:** 1.5 hours ✅ (Completed)
- **Slice 3:** 1.5 hours ✅ (Completed)
- **Slice 4:** 1.5 hours ✅ (Completed)
- **Slice 5:** 1.5 hours (Optional - detail view and polish)
- **Total Core System:** ~5.5 hours ✅ **COMPLETE!**

---

## 🎉 Project Status: **4 of 4 Core Slices Complete!**

The Tutor Quality Scoring System is fully functional with:
- ✅ 82 tutors with comprehensive performance metrics
- ✅ 2,741 sessions with realistic risk patterns
- ✅ AI-powered risk assessment for all tutors
- ✅ System-wide pattern detection and insights
- ✅ Tutor-specific actionable recommendations
- ✅ Interactive dashboard with charts and insights
- ✅ Sortable tutor table with modals for detailed views

**Slice 5** is optional for future enhancements (individual tutor detail pages, filters, additional polish).

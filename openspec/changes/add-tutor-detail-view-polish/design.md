# Design: Tutor Detail View + Polish

## Context
This change completes the Tutor Quality Scoring System by adding individual tutor detail pages and UI polish. Currently, users can view aggregate data on the dashboard and browse tutors in a table with modals, but there's no way to drill down into individual tutor performance over time or filter the list effectively.

The system needs:
- Deep-dive views for individual tutors with historical context
- Ability to filter and segment the tutor list for targeted analysis
- Production-ready UI with proper loading states and error handling
- Intuitive navigation between list and detail views

## Goals / Non-Goals

### Goals
- Create comprehensive tutor detail page with all relevant information
- Visualize performance trends over time with timeline/chart
- Add practical filtering to tutor list for data exploration
- Polish UI to production-ready standards
- Ensure fast, smooth navigation throughout the app

### Non-Goals
- Real-time data updates or live monitoring
- Editing tutor data or session information (read-only for MVP)
- Advanced analytics or predictive modeling
- Export/download functionality
- User authentication or role-based access

## Decisions

### Decision 1: Dynamic Route Structure
**Choice:** Use Next.js App Router dynamic routes `/tutors/[id]/page.tsx`

**Rationale:**
- Native Next.js pattern for detail pages
- SEO-friendly URLs
- Server-side rendering for fast initial load
- Easy to implement with existing data structure

**Alternatives considered:**
- Modal overlay on /tutors page → Doesn't provide deep linking
- Separate /tutor-detail route with query params → Less clean URLs
- Client-side routing only → Slower initial load

### Decision 2: Session Timeline Visualization
**Choice:** Recharts line chart showing rating trends + chronological session list

**Format:**
- Line chart: X-axis = date, Y-axis = rating (1-5 stars)
- Below chart: Reverse-chronological session list with status badges
- Highlight markers for first sessions, reschedules, no-shows

**Rationale:**
- Visual trends easier to spot than raw data
- Combines quantitative (chart) with qualitative (session details)
- Recharts already in tech stack
- Clear patterns emerge (improving/declining performance)

**Alternatives considered:**
- Calendar heatmap → Less clear for rating trends
- Table only → Misses visual pattern recognition
- Timeline with all details → Too information-dense

### Decision 3: Filter Implementation Strategy
**Choice:** Client-side filtering with useState, no URL params for MVP

**Rationale:**
- Simpler implementation for MVP
- Fast filter response (no network requests)
- All tutor data already loaded in list view
- Can add URL params later if needed for sharing

**Filter Options:**
1. Risk level: All / Low / Medium / High
2. Rating range: slider or presets (e.g., <3.0, 3.0-4.0, >4.0)
3. First session success: <50%, 50-75%, >75%
4. Support tickets: 0, 1, 2+
5. Profile completion: <70%, 70-90%, >90%

### Decision 4: Navigation Pattern
**Choice:** Make tutor names clickable links + back button in detail view

**Implementation:**
- Tutor names in table become `<Link href={`/tutors/${tutor.id}`}>` components
- Add hover underline to indicate clickability
- Breadcrumb: "Dashboard / Tutors / [Tutor Name]"
- Browser back button works naturally with Next.js routing

**Alternatives considered:**
- Eye icon for "view details" → Extra click, less intuitive
- Row click to navigate → Conflicts with modal on risk badge
- Separate "Details" button → Clutters table

### Decision 5: Loading States Strategy
**Choice:** Skeleton UI matching final component structure

**Skeleton components:**
- TutorDetailSkeleton: Gray boxes matching header, metrics, timeline
- SessionTimelineSkeleton: Animated pulse for chart and session cards
- TableSkeleton: Already exists, reuse for tutor list

**Rationale:**
- Professional appearance during loading
- Reduces perceived wait time
- Matches final layout (no layout shift)
- Libraries like react-loading-skeleton available

### Decision 6: Data Organization on Detail Page
**Choice:** Four main sections in order

1. **Header Section**: Name, email, join date, risk badge
2. **Metrics Overview**: Grid of all key metrics (same as modal)
3. **Risk Analysis & Recommendations**: Combined section with both
4. **Session Timeline**: Chart + chronological list

**Rationale:**
- Mirrors information hierarchy (identity → performance → insights → history)
- Most important info (risk, metrics) above the fold
- Timeline last as it's most detailed/scrollable

## Risks / Trade-offs

### Risk: Performance with Large Session Lists
- **Issue:** 100+ sessions per tutor could slow rendering
- **Mitigation:**
  - Implement virtual scrolling or pagination for session list
  - Limit chart data points to last 50-100 sessions
  - Use React.memo for session cards
- **Validation:** Test with tutors who have 100+ sessions

### Risk: Filter Complexity
- **Issue:** Too many filter options could overwhelm users
- **Mitigation:**
  - Start with 3-4 most useful filters
  - Use collapsible filter panel
  - Show clear "Active filters" count
  - Easy "Clear all" button
- **Trade-off:** Fewer filters = less granular data exploration

### Risk: Mobile Experience
- **Issue:** Detail page has a lot of information for small screens
- **Mitigation:**
  - Stack sections vertically on mobile
  - Responsive Recharts (smaller on mobile)
  - Collapsible sections for recommendations/timeline
  - Test on 375px viewport (iPhone SE)
- **Validation:** Manual testing on mobile devices

### Risk: Stale Navigation State
- **Issue:** Back button might lose filter state
- **Mitigation:**
  - Use URL params for filters (can implement later)
  - Or: Store filter state in sessionStorage
  - Or: Accept that filters reset on back (simplest for MVP)
- **MVP stance:** Accept filter reset, can enhance later

## Migration Plan

### Phase 1: Data Access & Routing
1. Create getTutorById and getSessionsByTutorId functions
2. Set up /tutors/[id] route with basic page
3. Test dynamic routing works
4. Add 404 handling

### Phase 2: Detail Page Core
1. Build TutorDetailView component with sections
2. Display tutor header and metrics
3. Show risk analysis and recommendations
4. Test with various tutor profiles

### Phase 3: Timeline Visualization
1. Create SessionTimeline component
2. Implement Recharts line chart for rating trends
3. Add chronological session list
4. Style and polish timeline section

### Phase 4: Navigation
1. Make tutor names clickable in TutorTable
2. Add breadcrumb navigation
3. Ensure smooth transitions
4. Test back navigation

### Phase 5: Filtering
1. Create TutorFilters component
2. Implement client-side filtering logic
3. Add filter UI to /tutors page
4. Test all filter combinations

### Phase 6: Polish & Optimization
1. Add loading skeletons everywhere
2. Implement error boundaries
3. Add responsive design refinements
4. Performance testing and optimization
5. Final UI polish (transitions, tooltips, etc.)

### Phase 7: Testing
1. Manual testing on desktop/mobile
2. Test all navigation paths
3. Verify filtering works correctly
4. Load testing with max data scenarios

### Rollback
If detail pages have issues:
- Detail view can be disabled via feature flag
- Fallback to modal-only approach (current state)
- Filtering can be deployed independently
- No data migrations required (read-only views)

## Open Questions
- Should we add pagination to the tutor list, or is client-side filtering + scrolling sufficient? **Decision: Scrolling sufficient for <100 tutors, can add pagination later if needed**
- Do we want to persist filter state across sessions? **Decision: No for MVP, can add with URL params or localStorage later**
- Should the session timeline include student names/IDs? **Decision: No for privacy, just show session metadata and ratings**
- Do we need export functionality for filtered tutor lists? **Decision: No for MVP, can be added as future enhancement**


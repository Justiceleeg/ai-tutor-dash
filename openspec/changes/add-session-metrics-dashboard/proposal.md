# Change: Add Session Data and Metrics Dashboard

## Why

With the foundation and tutor profiles in place, we need to add session data and calculate meaningful performance metrics to enable quality assessment. The tutoring platform generates ~3,000 sessions daily, and each session contains critical data about tutor performance, student ratings, and behavioral patterns.

This slice transforms the system from a simple tutor directory into an analytics dashboard that surfaces:
- Average tutor ratings across all sessions
- First session success rates (critical given 24% churn correlation)
- Session completion patterns
- System-wide performance trends

Without these metrics, we cannot:
- Identify which tutors are performing well or poorly
- Detect early warning signs of tutor churn
- Provide data-driven coaching recommendations

## What Changes

- Extend data generation to create ~3,000 mock sessions linked to tutors
- Add Session data model with ratings, timestamps, and status flags
- Add three new tutor metrics:
  - **Current Student Count**: Unique students in last 30 days (calculated)
  - **Support Ticket Count**: Tickets in last 48 hours (generated)
  - **Profile Completion Rate**: Profile completion percentage (generated)
- Implement metrics calculation engine for per-tutor statistics:
  - Average rating across all sessions
  - Total session count
  - First session success rate
  - Session completion rate
  - Current student count (NEW)
- Build dashboard page with summary metrics cards
- Add Recharts visualization for rating distribution
- Update tutor table to display calculated metrics

## Impact

### Affected Specs
- **NEW**: `session-data` - Session data generation and management
- **NEW**: `metrics-calculation` - Performance metrics computation
- **NEW**: `dashboard-ui` - Main dashboard with visualizations
- **MODIFIED**: `data-generation` - Extends to include sessions
- **MODIFIED**: `tutor-list-ui` - Adds metric columns to table

### Affected Code
- `/lib/data/generator.ts` - Add session generation logic
- `/lib/data/sessions.ts` - New session data access functions
- `/lib/data/processor.ts` - New metrics calculation module
- `/data/sessions.json` - New session data file
- `/app/page.tsx` - Convert to dashboard with metrics
- `/components/dashboard/` - New dashboard components
- `/components/tutors/TutorTable.tsx` - Add metric columns

### Dependencies
- **REQUIRES**: `add-project-foundation-mock-data` (Slice 1) to be completed
- Sessions must link to existing tutor IDs

## Success Criteria

- ✅ ~3,000 sessions generated and linked to tutors
- ✅ Dashboard displays system-wide metrics (total tutors, total sessions, average rating)
- ✅ Each tutor shows calculated metrics in the table
- ✅ Rating distribution chart visualizes data using Recharts
- ✅ Metrics accurately reflect session data (verified by spot-checking)
- ✅ No performance issues loading/calculating metrics


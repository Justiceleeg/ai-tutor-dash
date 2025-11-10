# Change: Add Tutor Detail View + Polish

## Why
Enable deeper analysis of individual tutors by providing dedicated detail pages with historical performance data and comprehensive views of all flags, recommendations, and action items. This completes the system by adding drill-down capabilities and UI polish that make the system production-ready.

Currently, users can view tutor lists and modals with risk scores and recommendations, but there's no way to:
- See a tutor's performance over time with trend analysis
- View complete session history in chronological order
- Filter the tutor list by risk level or specific flags
- Access a comprehensive view of all tutor data in one place

## What Changes
- Create individual tutor detail page accessible via clicking tutor name in table
- Add session timeline/history visualization showing performance trends over time
- Display comprehensive view of all flags, recommendations, and action items
- Add filtering capabilities to tutor list (by risk level, flags, metrics)
- Polish UI with loading states, error handling, and improved user feedback
- Add breadcrumb navigation for better UX

## Impact
- Affected specs: `tutor-detail-ui` (new), `tutor-list-ui` (modified)
- Affected code:
  - `/app/tutors/[id]/page.tsx` - New tutor detail page
  - `/components/tutors/TutorDetailView.tsx` - Main detail view component
  - `/components/tutors/SessionTimeline.tsx` - Timeline/history visualization
  - `/components/tutors/TutorFilters.tsx` - Filter component for tutor list
  - `/components/tutors/TutorTable.tsx` - Add clickable navigation to names
  - `/lib/data/tutors.ts` - Add getTutorById function
  - `/lib/data/sessions.ts` - Add getSessionsByTutorId function


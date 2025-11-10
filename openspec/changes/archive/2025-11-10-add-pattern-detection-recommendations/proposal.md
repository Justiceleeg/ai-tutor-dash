# Change: Add Pattern Detection + Recommendations

## Why
Enable system-wide pattern analysis and tutor-specific recommendations to identify coaching opportunities and prevent churn. This directly addresses business requirements: detecting patterns leading to poor first session experiences (24% of churners), identifying tutors at risk of no-shows (16% of replacements), and providing actionable interventions.

## What Changes
- Create API route `/api/analyze-patterns` that uses OpenAI to detect patterns across all tutors
- Identify first session failure patterns and common risk factors
- Generate system-wide insights visible on dashboard
- Create tutor-specific, actionable recommendations for at-risk tutors
- Add "Insights" section to dashboard showing detected patterns
- Add recommendations panel to tutor table for high-risk tutors
- Persist insights and recommendations to JSON data

## Impact
- Affected specs: `dashboard-ui`, `tutor-list-ui`
- Affected code:
  - `/app/api/analyze-patterns/route.ts` - New API endpoint for pattern analysis
  - `/app/page.tsx` - Add insights section to dashboard
  - `/components/dashboard/InsightsPanel.tsx` - New component for pattern insights
  - `/components/tutors/TutorTable.tsx` - Add recommendations display
  - `/components/tutors/RecommendationsPanel.tsx` - New component for tutor recommendations
  - `/lib/types.ts` - Add insight and recommendation types
  - `/data/insights.json` - New file for system-wide insights
  - `/data/tutors.json` - Extended with recommendations


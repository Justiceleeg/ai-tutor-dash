# Change: Add Risk Scoring + AI Analysis

## Why
Enable automated tutor risk assessment using OpenAI to identify tutors at risk of churning or negatively impacting student experience. This addresses the business requirement to proactively detect patterns leading to poor performance (24% of churners fail on first sessions, 16% replacements due to no-shows).

## What Changes
- Add risk indicators to session data model (reschedules, no-shows, cancellations)
- Create API route `/api/generate-risk-scores` that sends tutor performance data to OpenAI
- Generate and persist risk scores (low/medium/high) with AI-generated reasoning for each tutor
- Update tutor table UI to display risk scores with color-coded indicators
- Extend tutor data model to include `riskScore` and `riskReasoning` fields

## Impact
- Affected specs: `session-data`, `tutor-list-ui`
- Affected code:
  - `/lib/data/generator.ts` - Add risk indicators to session generation
  - `/lib/data/tutors.ts` - Update tutor data model
  - `/lib/types.ts` - Add risk-related types
  - `/app/api/generate-risk-scores/route.ts` - New API endpoint for OpenAI integration
  - `/components/tutors/TutorTable.tsx` - Add risk score column with visual indicators
  - `/data/tutors.json` - Extended with risk data
  - `/data/sessions.json` - Extended with risk indicators


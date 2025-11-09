# Implementation Tasks

## 1. Data Model Enhancement
- [ ] 1.1 Create `Insight` type for system-wide pattern insights
- [ ] 1.2 Create `Recommendation` type for tutor-specific actions
- [ ] 1.3 Add `recommendations` array field to Tutor type
- [ ] 1.4 Design insight categories (firstSessionFailures, commonRiskFactors, systemRecommendations)

## 2. Pattern Analysis API
- [ ] 2.1 Create `/app/api/analyze-patterns/route.ts` endpoint
- [ ] 2.2 Design prompt to analyze first session failure patterns across all tutors
- [ ] 2.3 Include aggregate data in prompt (tutors with <50% first session success, common characteristics)
- [ ] 2.4 Request OpenAI to identify 3-5 key patterns and root causes
- [ ] 2.5 Parse OpenAI response into structured insight data
- [ ] 2.6 Save insights to `/data/insights.json`
- [ ] 2.7 Handle API errors and rate limiting

## 3. Recommendation Generation
- [ ] 3.1 Design prompt for generating tutor-specific recommendations
- [ ] 3.2 Send individual tutor data with risk score and metrics to OpenAI
- [ ] 3.3 Request 2-4 specific, actionable recommendations per at-risk tutor
- [ ] 3.4 Prioritize recommendations by impact/urgency
- [ ] 3.5 Parse and structure recommendation data
- [ ] 3.6 Save recommendations to tutor records in tutors.json
- [ ] 3.7 Only generate recommendations for medium/high risk tutors

## 4. Dashboard Insights Component
- [ ] 4.1 Create `InsightsPanel.tsx` component
- [ ] 4.2 Display system-wide patterns in card/section format
- [ ] 4.3 Show first session failure patterns
- [ ] 4.4 Display common risk factors across tutors
- [ ] 4.5 Include timestamp of when insights were generated
- [ ] 4.6 Add visual hierarchy (primary insights vs secondary)

## 5. Dashboard Integration
- [ ] 5.1 Add insights section to main dashboard page (`/app/page.tsx`)
- [ ] 5.2 Position insights below metrics cards
- [ ] 5.3 Read insights from `/data/insights.json`
- [ ] 5.4 Handle case where insights haven't been generated yet
- [ ] 5.5 Add refresh/regenerate button (optional for MVP)

## 6. Tutor Recommendations Component
- [ ] 6.1 Create `RecommendationsPanel.tsx` component
- [ ] 6.2 Display recommendations as expandable list or badges
- [ ] 6.3 Show priority/urgency indicators
- [ ] 6.4 Include action-oriented language
- [ ] 6.5 Add icons or visual cues for recommendation types

## 7. Tutor Table Integration
- [ ] 7.1 Modify TutorTable to show recommendations for at-risk tutors
- [ ] 7.2 Add expandable row or tooltip for recommendations
- [ ] 7.3 Display recommendation count badge
- [ ] 7.4 Link recommendations to risk score (only show for medium/high)
- [ ] 7.5 Ensure responsive layout

## 8. Testing & Validation
- [ ] 8.1 Verify insights are generated and display correctly
- [ ] 8.2 Check that patterns are meaningful and actionable
- [ ] 8.3 Confirm recommendations are tutor-specific and relevant
- [ ] 8.4 Test with different risk profiles (no recommendations for low risk)
- [ ] 8.5 Verify UI handles missing insights/recommendations gracefully
- [ ] 8.6 Manual review of AI-generated content quality


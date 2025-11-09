# Implementation Tasks

## 1. Data Model Enhancement
- [ ] 1.1 Add risk indicator flags to Session type (`wasRescheduled`, `wasNoShow`, `wasCancelled`)
- [ ] 1.2 Add risk fields to Tutor type (`riskScore`, `riskReasoning`)
- [ ] 1.3 Create `RiskLevel` type definition ('low' | 'medium' | 'high')

## 2. Session Data Generation
- [ ] 2.1 Update session generator to include realistic risk indicator patterns
- [ ] 2.2 Ensure risk indicators correlate with existing metrics (e.g., high reschedule tutors have more `wasRescheduled` sessions)
- [ ] 2.3 Generate realistic distribution of risk indicators across tutors
- [ ] 2.4 Regenerate sessions.json with new risk indicator data

## 3. OpenAI Integration
- [ ] 3.1 Create `/app/api/generate-risk-scores/route.ts` API endpoint
- [ ] 3.2 Design prompt that sends tutor metrics to OpenAI for risk assessment
- [ ] 3.3 Include context: avgRating, firstSessionSuccessRate, rescheduleRate, noShowCount, currentStudentCount, supportTicketCount, profileCompletionRate
- [ ] 3.4 Parse OpenAI response to extract risk level and reasoning
- [ ] 3.5 Handle API errors and rate limiting gracefully
- [ ] 3.6 Add environment variable check for OPENAI_API_KEY

## 4. Risk Score Generation & Persistence
- [ ] 4.1 Create script or API endpoint to process all tutors
- [ ] 4.2 Send batch requests to OpenAI (consider rate limits)
- [ ] 4.3 Save risk scores and reasoning back to tutors.json
- [ ] 4.4 Add timestamp for when risk scores were generated

## 5. UI Enhancement
- [ ] 5.1 Add risk score column to TutorTable component
- [ ] 5.2 Implement color coding (green=low, yellow=medium, red=high)
- [ ] 5.3 Add tooltip or expandable section showing AI reasoning
- [ ] 5.4 Add visual indicator badge or icon for risk level
- [ ] 5.5 Ensure responsive layout with new column

## 6. Testing & Validation
- [ ] 6.1 Verify all tutors have risk scores after generation
- [ ] 6.2 Manually review AI reasoning for accuracy and helpfulness
- [ ] 6.3 Confirm UI displays risk scores correctly with proper color coding
- [ ] 6.4 Test with different tutor risk profiles (low/medium/high)
- [ ] 6.5 Verify API endpoint handles errors properly


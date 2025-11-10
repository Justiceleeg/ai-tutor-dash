# Implementation Tasks

## 1. Data Model Enhancement
- [x] 1.1 Add risk indicator flags to Session type (`wasRescheduled`, `wasNoShow`, `wasCancelled`)
- [x] 1.2 Add risk fields to Tutor type (`riskScore`, `riskReasoning`)
- [x] 1.3 Create `RiskLevel` type definition ('low' | 'medium' | 'high')

## 2. Session Data Generation
- [x] 2.1 Update session generator to include realistic risk indicator patterns
- [x] 2.2 Ensure risk indicators correlate with existing metrics (e.g., high reschedule tutors have more `wasRescheduled` sessions)
- [x] 2.3 Generate realistic distribution of risk indicators across tutors
- [x] 2.4 Regenerate sessions.json with new risk indicator data

## 3. OpenAI Integration
- [x] 3.1 Create `/app/api/generate-risk-scores/route.ts` API endpoint
- [x] 3.2 Design prompt that sends tutor metrics to OpenAI for risk assessment
- [x] 3.3 Include context: avgRating, firstSessionSuccessRate, rescheduleRate, noShowCount, currentStudentCount, supportTicketCount, profileCompletionRate
- [x] 3.4 Parse OpenAI response to extract risk level and reasoning
- [x] 3.5 Handle API errors and rate limiting gracefully
- [x] 3.6 Add environment variable check for OPENAI_API_KEY

## 4. Risk Score Generation & Persistence
- [x] 4.1 Create script or API endpoint to process all tutors
- [x] 4.2 Send batch requests to OpenAI (consider rate limits)
- [x] 4.3 Save risk scores and reasoning back to tutors.json
- [x] 4.4 Add timestamp for when risk scores were generated

## 5. UI Enhancement
- [x] 5.1 Add risk score column to TutorTable component
- [x] 5.2 Implement color coding (green=low, yellow=medium, red=high)
- [x] 5.3 Add tooltip or expandable section showing AI reasoning
- [x] 5.4 Add visual indicator badge or icon for risk level
- [x] 5.5 Ensure responsive layout with new column

## 6. Testing & Validation
- [x] 6.1 Verify all tutors have risk scores after generation
- [x] 6.2 Manually review AI reasoning for accuracy and helpfulness
- [x] 6.3 Confirm UI displays risk scores correctly with proper color coding
- [x] 6.4 Test with different tutor risk profiles (low/medium/high)
- [x] 6.5 Verify API endpoint handles errors properly

## 7. Additional Enhancements (Bonus)
- [x] 7.1 Add table sorting functionality (default: highest risk first)
- [x] 7.2 Make all metric columns sortable with visual indicators
- [x] 7.3 Create modal dialog for detailed risk reasoning view
- [x] 7.4 Replace tooltip with clickable badge that opens modal
- [x] 7.5 Display all tutor metrics in modal alongside AI reasoning


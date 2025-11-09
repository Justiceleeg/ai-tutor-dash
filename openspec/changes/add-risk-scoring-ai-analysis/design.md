# Design: Risk Scoring + AI Analysis

## Context
This change introduces AI-powered risk assessment for tutors using OpenAI's GPT-4 model. The system needs to:
- Evaluate tutor performance metrics holistically
- Generate actionable risk assessments
- Provide clear reasoning for risk levels
- Process 50-100 tutors in batch mode

Current constraints:
- Static JSON data (no database)
- Vercel AI SDK integration
- OpenAI API rate limits (~60 requests/minute for GPT-4)
- Risk scores should be pre-computed, not real-time

## Goals / Non-Goals

### Goals
- Assign accurate risk levels (low/medium/high) to every tutor
- Provide human-readable AI reasoning for each risk assessment
- Enable quick visual identification of at-risk tutors in the UI
- Create reusable API pattern for future AI features

### Non-Goals
- Real-time risk score generation (batch processing is sufficient)
- Automated interventions or notifications (just identification)
- Historical risk score tracking (single snapshot is sufficient for MVP)
- Complex ensemble models or multiple AI providers

## Decisions

### Decision 1: Risk Score Generation Strategy
**Choice:** Pre-computed batch processing with manual trigger

**Alternatives considered:**
- Real-time computation on page load → Too slow, expensive, unnecessary
- Serverless function on schedule → Over-engineered for MVP
- Batch processing script → **CHOSEN** - Simple, cost-effective, sufficient

**Rationale:**
- MVP doesn't require real-time updates
- Batch processing allows rate limit management
- Manual trigger gives control over costs
- Can be automated later if needed

### Decision 2: OpenAI Prompt Design
**Choice:** Single comprehensive prompt with structured JSON response

**Prompt structure:**
```
Analyze this tutor's performance metrics:
- Average Rating: X/5
- First Session Success Rate: X%
- Reschedule Rate: X%
- No-Show Count: X
- Current Student Count: X
- Support Ticket Count (48h): X
- Profile Completion: X%

Classify risk level (low/medium/high) and provide 2-3 sentence reasoning.
```

**Alternatives considered:**
- Multi-turn conversation → Too complex, unnecessary tokens
- Separate API calls per metric → Inefficient, loses context
- Single prompt with context → **CHOSEN** - Efficient, comprehensive

### Decision 3: Risk Level Thresholds
**Choice:** Let AI determine thresholds based on context, not hard-coded rules

**Rationale:**
- AI can consider metric interactions (e.g., high reschedule + low rating = high risk)
- Hard-coded thresholds miss nuance
- Business requirements emphasize patterns, not single-metric cutoffs
- AI reasoning provides transparency

### Decision 4: Data Persistence
**Choice:** Extend tutors.json with `riskScore` and `riskReasoning` fields

**Alternatives considered:**
- Separate risk-scores.json file → More files to manage
- In-memory only → Lose results, expensive to regenerate
- Extend tutors.json → **CHOSEN** - Simple, keeps data together

### Decision 5: API Endpoint Design
**Choice:** POST `/api/generate-risk-scores` that processes all tutors

**Behavior:**
- Reads tutors.json
- Sends each tutor's metrics to OpenAI
- Writes updated tutors.json with risk data
- Returns summary (X tutors processed, Y high risk, Z medium, etc.)

**Alternatives considered:**
- GET endpoint → Semantically incorrect for side effects
- Per-tutor endpoint → Too many requests, harder to batch
- Batch endpoint → **CHOSEN** - Efficient, simple

## Risks / Trade-offs

### Risk: OpenAI API Costs
- **Estimate:** ~100 tutors × ~500 tokens/tutor × $0.01/1K tokens = ~$0.50/run
- **Mitigation:** Batch processing with manual trigger (not automatic)
- **Future:** Cache risk scores, only update changed tutors

### Risk: OpenAI Rate Limits
- **Constraint:** ~60 requests/minute for GPT-4
- **Mitigation:** Add delay between requests if needed (e.g., 1 second/request = ~100 seconds for 100 tutors)
- **Future:** Use batch API if OpenAI offers it

### Risk: Inconsistent Risk Assessments
- **Issue:** AI might rate similar tutors differently
- **Mitigation:** 
  - Clear prompt with specific metric definitions
  - Include examples of each risk level in prompt
  - Manual review of initial results
- **Trade-off:** Some inconsistency acceptable vs. building complex rule engine

### Risk: UI Clutter
- **Issue:** Adding risk column might make table too wide
- **Mitigation:**
  - Use compact badge design
  - Make reasoning available on hover/click, not inline
  - Test on mobile viewport
- **Future:** Consider separate risk dashboard page

## Migration Plan

### Phase 1: Generate Initial Risk Scores
1. Create and test API endpoint with sample tutors
2. Run batch generation for all tutors
3. Manually review risk assessments for accuracy
4. Adjust prompt if needed and regenerate

### Phase 2: UI Integration
1. Add risk column to table
2. Test visual design with different risk levels
3. Verify tooltips/reasoning display works

### Phase 3: Validation
1. Verify all tutors have risk scores
2. Check risk distribution (expect ~20% high, ~30% medium, ~50% low)
3. Confirm reasoning is helpful for end users

### Rollback
If OpenAI integration fails or results are poor:
- Risk fields are optional in data model
- UI can hide risk column if data missing
- Can fall back to manual risk assessment

## Open Questions
- Should we add a "last updated" timestamp for risk scores? **Decision: Yes, add `riskScoreGeneratedAt` field**
- Do we need to expose the API endpoint to UI for manual re-generation? **Decision: Not for MVP, can trigger via API client or script**
- Should we batch requests to OpenAI or send sequentially? **Decision: Sequential with small delay to avoid rate limits**


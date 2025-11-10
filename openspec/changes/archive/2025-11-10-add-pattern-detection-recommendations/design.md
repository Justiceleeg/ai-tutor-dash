# Design: Pattern Detection + Recommendations

## Context
This change adds AI-powered pattern detection and recommendation generation to help identify systemic issues and provide actionable coaching guidance. The system needs to:
- Analyze patterns across all 50-100 tutors to find common failure modes
- Identify root causes of poor first session experiences (24% churn factor)
- Generate specific, actionable recommendations for individual at-risk tutors
- Present insights in a way that drives immediate action

Current state:
- Risk scores exist for individual tutors (from Slice 3)
- Dashboard shows aggregate metrics but no pattern analysis
- No actionable guidance for what to do about at-risk tutors

## Goals / Non-Goals

### Goals
- Identify 3-5 key patterns causing first session failures
- Generate 2-4 specific recommendations per at-risk tutor (medium/high risk)
- Display system-wide insights prominently on dashboard
- Make recommendations actionable and prioritized
- Create reusable pattern analysis framework

### Non-Goals
- Automated remediation actions (just recommendations)
- Predictive analytics or forecasting (just current pattern analysis)
- Integration with external coaching systems (just display)
- Multi-dimensional clustering or complex ML models

## Decisions

### Decision 1: Two-Tier Analysis Approach
**Choice:** System-wide pattern analysis + individual tutor recommendations

**Analysis tiers:**
1. **Aggregate Analysis:** OpenAI analyzes all tutor data to find common patterns
2. **Individual Recommendations:** OpenAI generates specific actions for each at-risk tutor

**Alternatives considered:**
- Single analysis with both patterns and recommendations → Too complex for one prompt
- Only individual recommendations without patterns → Misses systemic insights
- Two-tier approach → **CHOSEN** - Clear separation, better quality results

**Rationale:**
- System patterns help leadership understand root causes
- Individual recommendations help coaches take action
- Separation allows independent regeneration

### Decision 2: Insight Data Structure
**Choice:** Separate `/data/insights.json` file with structured categories

```typescript
{
  "generatedAt": "2025-11-09T10:30:00Z",
  "patterns": {
    "firstSessionFailures": [
      "Poor technical setup is the #1 cause of low first session ratings...",
      "Tutors with <70% profile completion have 2x worse first sessions..."
    ],
    "commonRiskFactors": [
      "High student load (>15 students) correlates with increased no-shows...",
      "Tutors in their first 30 days have 3x higher reschedule rates..."
    ]
  },
  "systemRecommendations": [
    "Implement mandatory technical check before first session",
    "Provide first-30-days support program for new tutors"
  ]
}
```

**Alternatives considered:**
- Embed in tutors.json → Doesn't fit the data model
- Store in component state → Lost on refresh, can't regenerate
- Separate insights.json → **CHOSEN** - Clean separation, persistent

### Decision 3: Recommendation Targeting
**Choice:** Only generate recommendations for medium and high-risk tutors

**Rationale:**
- Low-risk tutors don't need coaching interventions
- Focuses AI tokens and coach attention on tutors who need help
- Reduces noise in UI for high-performing tutors

**Implementation:**
- Risk score must be 'medium' or 'high' to trigger recommendations
- Low-risk tutors show "No recommendations - performing well" message

### Decision 4: Recommendation Structure
**Choice:** Structured recommendations with priority and action focus

```typescript
{
  "id": "rec-1",
  "priority": "high" | "medium",
  "category": "first_session" | "reliability" | "engagement" | "profile",
  "action": "Schedule technical setup training session",
  "reasoning": "Last 3 first sessions rated <3 stars, students mention tech issues"
}
```

**Alternatives considered:**
- Free-form text only → Hard to prioritize, less actionable
- Complex multi-level structure → Over-engineered
- Structured with priority → **CHOSEN** - Actionable, prioritizable, clear

### Decision 5: Pattern Analysis Prompt Strategy
**Choice:** Aggregate-then-analyze approach

**Prompt flow:**
1. Send aggregate statistics to OpenAI (not raw session data)
2. Include: % of tutors with first session issues, average metrics by risk level, correlation patterns
3. Ask for: Common patterns, root causes, systemic recommendations

**Alternatives considered:**
- Send all raw session data → Too many tokens, expensive
- Send random sample → Misses patterns in full dataset
- Send pre-computed aggregates → **CHOSEN** - Efficient, focused analysis

**Example aggregate data:**
```
- 18 of 90 tutors have <50% first session success rate
- High-risk tutors average: 3.2 rating, 12% reschedule rate, 8.5 students
- Low-risk tutors average: 4.4 rating, 3% reschedule rate, 6.2 students
- 60% of high-risk tutors have profile completion <70%
```

### Decision 6: UI Placement
**Choice:** Insights on dashboard, recommendations in tutor table

**Dashboard insights:**
- Prominent section below metrics cards
- Card-based layout for different insight categories
- Call-out styling to draw attention

**Tutor recommendations:**
- Expandable section in tutor table row
- Badge showing recommendation count
- Only visible for medium/high risk tutors

**Alternatives considered:**
- Both on dashboard → Tutor-specific info doesn't belong there
- Separate insights page → Buries important information
- Hybrid placement → **CHOSEN** - Right information in right place

## Risks / Trade-offs

### Risk: OpenAI Analysis Quality
- **Issue:** AI might identify superficial patterns or miss real root causes
- **Mitigation:** 
  - Provide clear examples in prompt
  - Include specific business context (24% churn from first sessions)
  - Manual review and refinement of prompts
  - Iterate on prompt design based on initial results
- **Validation:** Review first batch of insights with domain expert

### Risk: Recommendation Overload
- **Issue:** Too many recommendations could overwhelm coaches
- **Mitigation:**
  - Limit to 2-4 recommendations per tutor
  - Prioritize recommendations by impact
  - Only show for medium/high risk tutors
- **Trade-off:** Might miss some useful coaching opportunities

### Risk: Stale Insights
- **Issue:** Insights generated once might become outdated
- **Mitigation:**
  - Include generation timestamp on dashboard
  - Document manual regeneration process
  - Future: Add scheduled regeneration
- **MVP stance:** Manual regeneration acceptable

### Risk: API Costs
- **Estimate:** 
  - Pattern analysis: 1 request × ~2K tokens = ~$0.02
  - Recommendations: 40 at-risk tutors × ~800 tokens = ~$0.32
  - Total per run: ~$0.34
- **Mitigation:** Manual trigger, batch processing
- **Trade-off:** Acceptable for business value delivered

## Migration Plan

### Phase 1: Pattern Analysis
1. Create insights data structure and API endpoint
2. Design and test pattern analysis prompt with sample data
3. Run initial analysis and review results
4. Refine prompt based on quality assessment
5. Generate production insights

### Phase 2: Recommendations
1. Create recommendation data structure
2. Design and test recommendation prompt for sample tutors
3. Validate recommendations are actionable and specific
4. Batch generate recommendations for all medium/high risk tutors
5. Save to tutor records

### Phase 3: UI Integration
1. Build and style InsightsPanel component
2. Integrate into dashboard
3. Build and style RecommendationsPanel component
4. Integrate into tutor table
5. Test responsive layouts

### Phase 4: Validation
1. Review insights with stakeholder
2. Sample-check recommendations for relevance
3. Verify UI displays correctly
4. Confirm regeneration process works

### Rollback
If pattern analysis fails or quality is poor:
- Dashboard can hide insights section if data missing
- Tutor table can hide recommendations for all tutors
- Fall back to risk scores only (from Slice 3)
- Can iterate on prompts and regenerate

## Open Questions
- Should recommendations have a status/tracking field (e.g., "completed", "in progress")? **Decision: No for MVP, future enhancement**
- Do we need to track which recommendations were acted upon? **Decision: No for MVP, analytics can be added later**
- Should insights include quantitative benchmarks (e.g., "Industry average: 65% first session success")? **Decision: No external data for MVP, internal comparisons only**
- How often should insights be regenerated? **Decision: Manual for MVP, evaluate after first 2-3 regeneration cycles**


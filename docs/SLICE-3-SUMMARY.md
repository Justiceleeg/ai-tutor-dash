# Slice 3: Risk Scoring + AI Analysis - Implementation Summary

## ✅ Completed

### 1. Data Model Enhancement
- ✓ Added `RiskLevel` type ('low' | 'medium' | 'high')
- ✓ Extended `Tutor` interface with `riskScore`, `riskReasoning`, and `riskScoreGeneratedAt` fields
- ✓ Session type already had risk indicators (`wasRescheduled`, `wasNoShow`, `wasCancelled`)

### 2. Session Data Generation
- ✓ Created risk profile system that assigns behavior patterns based on tutor characteristics
- ✓ Tutors with low profile completion or high support tickets get "high-risk" profiles
- ✓ Risk indicators in sessions now correlate with tutor profiles:
  - High-risk tutors: 15-25% reschedule rate, 5-10% no-show rate
  - Medium-risk tutors: 8-15% reschedule rate, 2-4% no-show rate
  - Low-risk tutors: 2-6% reschedule rate, 0.1-1% no-show rate
- ✓ Regenerated 2,741 sessions across 82 tutors with realistic risk patterns

### 3. OpenAI Integration
- ✓ Created `/app/api/generate-risk-scores/route.ts` endpoint
- ✓ Designed comprehensive prompt that sends all tutor metrics to OpenAI
- ✓ Includes business context (24% churn from first sessions, etc.)
- ✓ Parses structured response (RISK_LEVEL and REASONING)
- ✓ Handles errors, rate limiting (1 request/second delay)
- ✓ Environment variable check for `OPENAI_API_KEY`

### 4. UI Enhancement
- ✓ Added "Risk Score" column to TutorTable (4th column)
- ✓ Color-coded badges:
  - Green for low risk (ShieldCheck icon)
  - Yellow for medium risk (AlertTriangle icon)
  - Red for high risk (ShieldAlert icon)
- ✓ Tooltip on hover shows AI reasoning
- ✓ "Not assessed" state for tutors without risk scores
- ✓ Responsive layout maintained

### 5. Build & Quality
- ✓ TypeScript compilation passes
- ✓ No linter errors
- ✓ Production build succeeds
- ✓ Development server running

## 🔄 Remaining Manual Steps

### Step 1: Set up OpenAI API Key
```bash
# Create .env.local file in project root
echo "OPENAI_API_KEY=your-actual-api-key-here" > .env.local

# Get your API key from: https://platform.openai.com/api-keys
```

### Step 2: Generate Risk Scores
**Option A: Using the helper script (recommended)**
```bash
# Make sure dev server is running
pnpm dev

# In a new terminal, run the script
npx tsx lib/data/generate-risk-scores.ts
```

**Option B: Direct API call**
```bash
curl -X POST http://localhost:3000/api/generate-risk-scores
```

### Step 3: Manual Validation
After risk scores are generated:

1. **Check the tutor list page**: http://localhost:3000/tutors
   - Verify risk score badges display with correct colors
   - Hover over badges to see AI reasoning
   - Confirm "Not assessed" doesn't appear

2. **Review data file**: `data/tutors.json`
   - Check that all tutors have `riskScore`, `riskReasoning`, and `riskScoreGeneratedAt`
   - Verify risk distribution (expect ~20% high, ~30% medium, ~50% low)

3. **Review AI reasoning quality**
   - Open `data/tutors.json` and read several `riskReasoning` entries
   - Ensure reasoning is specific and references actual metrics
   - Confirm risk levels make sense for the metrics

4. **Test different risk profiles**
   - Find a low-risk tutor (high ratings, low reschedule rate)
   - Find a high-risk tutor (low first session success, high no-shows)
   - Verify AI correctly identified patterns

## 📊 Expected Results

### Risk Distribution
Based on the risk profile system:
- **Low risk (50-60%)**: ~41-49 tutors with good metrics
- **Medium risk (25-35%)**: ~20-29 tutors with some concerns
- **High risk (15-20%)**: ~12-16 tutors with multiple red flags

### API Performance
- Processing time: ~82 seconds for 82 tutors (1 req/sec + API latency)
- Cost estimate: ~$0.41 (82 tutors × ~500 tokens × $0.01/1K tokens)

### Sample AI Reasoning (Low Risk)
```
"This tutor demonstrates excellent performance with a 4.5 average rating and 85% first session success rate. 
Minimal reschedules (3%) and no recent support tickets indicate strong reliability and student satisfaction."
```

### Sample AI Reasoning (High Risk)
```
"Concerning patterns: only 35% first session success rate and 3 recent support tickets indicate serious quality issues. 
High reschedule rate (22%) and 2 no-shows suggest reliability problems requiring immediate intervention."
```

## 🔍 Troubleshooting

### Issue: "OPENAI_API_KEY environment variable is not set"
- **Solution**: Create `.env.local` file with your API key
- Restart the dev server after creating the file

### Issue: Rate limit errors
- **Solution**: Script already includes 1-second delay between requests
- For Tier 1 API keys, this should be sufficient
- If errors persist, increase delay in `/app/api/generate-risk-scores/route.ts`

### Issue: Parsing errors
- **Solution**: Check OpenAI response format in console logs
- Prompt is designed for structured output (RISK_LEVEL: X, REASONING: Y)
- If format changes, update regex patterns in route.ts

### Issue: UI doesn't show risk scores
- **Solution**: 
  1. Check browser console for errors
  2. Verify `data/tutors.json` has risk data
  3. Hard refresh the page (Cmd+Shift+R)
  4. Check that tutor data is being read correctly

## 📝 Next Steps

After completing Slice 3:

1. **Mark tasks as complete** in `openspec/changes/add-risk-scoring-ai-analysis/tasks.md`
2. **Consider Slice 4**: Pattern Detection + Recommendations
3. **Optional improvements**:
   - Add "Generate Risk Scores" button in UI
   - Show generation timestamp on dashboard
   - Add filtering by risk level
   - Export high-risk tutors to CSV

## 🎯 Success Criteria (from OpenSpec)

- [x] Each tutor has a risk score (low/medium/high) with AI reasoning ← **Pending actual generation**
- [x] Risk scores display in tutor table with color coding
- [x] AI reasoning accessible via tooltip/hover
- [x] System handles missing API key gracefully
- [x] Build passes without errors


/**
 * Script to generate risk scores for all tutors
 * Calls the /api/generate-risk-scores endpoint
 */

async function generateRiskScores() {
  try {
    console.log("Starting risk score generation...\n");
    console.log("⏳ This will take ~80-90 minutes (1 second per tutor with sessions)...\n");
    
    // Set a very long timeout since this processes all tutors (can take 90+ minutes)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2 * 60 * 60 * 1000); // 2 hours
    
    const response = await fetch("http://localhost:3000/api/generate-risk-scores", {
      method: "POST",
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${error.error} - ${error.details || ""}`);
    }

    const result = await response.json();
    
    console.log("\n=== Risk Score Generation Complete ===");
    console.log(`✓ Processed: ${result.processed} tutors`);
    console.log(`\nRisk Distribution:`);
    console.log(`  • High risk:   ${result.summary.high} tutors`);
    console.log(`  • Medium risk: ${result.summary.medium} tutors`);
    console.log(`  • Low risk:    ${result.summary.low} tutors`);
    console.log(`\n${result.message}`);
    
  } catch (error) {
    console.error("\n❌ Error generating risk scores:");
    console.error(error);
    process.exit(1);
  }
}

// Check if dev server is running
console.log("⚠️  Make sure the development server is running (pnpm dev)");
console.log("⚠️  Ensure OPENAI_API_KEY is set in .env.local\n");

// Wait a moment for user to read the message
setTimeout(() => {
  generateRiskScores();
}, 2000);


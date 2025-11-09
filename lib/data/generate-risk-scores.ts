/**
 * Script to generate risk scores for all tutors
 * Calls the /api/generate-risk-scores endpoint
 */

async function generateRiskScores() {
  try {
    console.log("Starting risk score generation...\n");
    
    const response = await fetch("http://localhost:3000/api/generate-risk-scores", {
      method: "POST",
    });

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


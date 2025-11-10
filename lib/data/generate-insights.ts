/**
 * Helper script to generate system insights and tutor recommendations
 * Run with: npx tsx lib/data/generate-insights.ts
 */

async function generateInsights() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  console.log("🔍 Analyzing patterns and generating recommendations...\n");
  console.log("This will take ~2-3 minutes for all tutors.\n");

  try {
    const response = await fetch(`${API_URL}/api/analyze-patterns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to analyze patterns");
    }

    const result = await response.json();
    
    console.log("✅ Success!\n");
    console.log(`📊 System insights generated: ${result.insightsGenerated ? "Yes" : "No"}`);
    console.log(`👥 Tutors analyzed: ${result.tutorsAnalyzed}`);
    console.log(`💡 Recommendations generated: ${result.recommendationsGenerated}`);
    console.log("\n🎉 Pattern analysis complete!");
    console.log("\nView results:");
    console.log("  - Dashboard: http://localhost:3000");
    console.log("  - Tutors: http://localhost:3000/tutors");
  } catch (error) {
    console.error("❌ Error:", error);
    console.log("\nTroubleshooting:");
    console.log("  1. Make sure dev server is running (pnpm dev)");
    console.log("  2. Check OPENAI_API_KEY in .env.local");
    console.log("  3. Verify you have internet connection");
    process.exit(1);
  }
}

generateInsights();


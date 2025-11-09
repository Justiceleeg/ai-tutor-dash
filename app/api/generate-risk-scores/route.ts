import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Tutor, RiskLevel } from "@/lib/types";

/**
 * POST /api/generate-risk-scores
 * 
 * Generates AI-powered risk scores for all tutors using OpenAI.
 * Reads tutors.json, sends each tutor's metrics to OpenAI, and saves risk assessments back.
 */
export async function POST() {
  try {
    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    // Read tutors data
    const dataDir = join(process.cwd(), "data");
    const tutorsPath = join(dataDir, "tutors.json");
    const tutorsData = JSON.parse(readFileSync(tutorsPath, "utf-8"));

    // Convert JSON dates back to Date objects
    const tutors: Tutor[] = tutorsData.map((t: any) => ({
      ...t,
      joinDate: new Date(t.joinDate),
      riskScoreGeneratedAt: t.riskScoreGeneratedAt
        ? new Date(t.riskScoreGeneratedAt)
        : undefined,
    }));

    console.log(`Processing ${tutors.length} tutors for risk assessment...`);

    let processedCount = 0;
    let highRiskCount = 0;
    let mediumRiskCount = 0;
    let lowRiskCount = 0;

    // Process each tutor
    for (const tutor of tutors) {
      try {
        // Build prompt with tutor's performance metrics
        const prompt = `You are an expert tutor performance analyst. Analyze this tutor's performance metrics and classify their risk level.

Tutor Metrics:
- Average Rating: ${tutor.avgRating.toFixed(2)}/5.0
- First Session Success Rate: ${tutor.firstSessionSuccessRate.toFixed(1)}% (percentage of first sessions rated 4+ stars)
- Total Sessions: ${tutor.totalSessions}
- Reschedule Rate: ${tutor.rescheduleRate.toFixed(1)}% (percentage of sessions rescheduled by tutor)
- No-Show Count: ${tutor.noShowCount} (total sessions where tutor didn't attend)
- Current Student Count: ${tutor.currentStudentCount} (active students in last 30 days)
- Support Ticket Count (48h): ${tutor.supportTicketCount} (recent support tickets about this tutor)
- Profile Completion: ${tutor.profileCompletionRate}%

Context:
- First session experience is critical: 24% of tutor churn correlates with poor first sessions
- No-shows are serious: 16% of tutor replacements are due to no-shows
- Reschedules impact student experience: 98.2% are tutor-initiated

Risk Level Guidelines:
- LOW: Performing well across all metrics, reliable, no concerning patterns
- MEDIUM: Some concerning patterns or declining metrics, needs monitoring
- HIGH: Multiple red flags, likely to churn or negatively impact students

Provide your assessment in this exact format:
RISK_LEVEL: [low|medium|high]
REASONING: [2-3 sentences explaining the risk classification, focusing on specific metrics and patterns]`;

        // Call OpenAI API
        const { text } = await generateText({
          model: openai("gpt-4-turbo"),
          prompt,
          temperature: 0.3, // Lower temperature for more consistent assessments
        });

        // Parse response
        const riskLevelMatch = text.match(/RISK_LEVEL:\s*(low|medium|high)/i);
        const reasoningMatch = text.match(/REASONING:\s*([\s\S]+)/i);

        if (!riskLevelMatch || !reasoningMatch) {
          console.error(
            `Failed to parse OpenAI response for tutor ${tutor.id}`
          );
          continue;
        }

        const riskScore = riskLevelMatch[1].toLowerCase() as RiskLevel;
        const riskReasoning = reasoningMatch[1].trim();

        // Update tutor with risk assessment
        tutor.riskScore = riskScore;
        tutor.riskReasoning = riskReasoning;
        tutor.riskScoreGeneratedAt = new Date();

        // Update counters
        processedCount++;
        if (riskScore === "high") highRiskCount++;
        else if (riskScore === "medium") mediumRiskCount++;
        else lowRiskCount++;

        console.log(
          `✓ ${tutor.id} (${tutor.name}): ${riskScore.toUpperCase()}`
        );

        // Add small delay to avoid rate limits (1 request per second)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error processing tutor ${tutor.id}:`, error);
        // Continue with next tutor
      }
    }

    // Save updated tutors data
    const tutorsForJson = tutors.map((tutor) => ({
      ...tutor,
      joinDate: tutor.joinDate.toISOString(),
      riskScoreGeneratedAt: tutor.riskScoreGeneratedAt
        ? tutor.riskScoreGeneratedAt.toISOString()
        : undefined,
    }));

    writeFileSync(tutorsPath, JSON.stringify(tutorsForJson, null, 2));
    console.log(`✓ Saved risk scores for ${processedCount} tutors`);

    return NextResponse.json({
      success: true,
      processed: processedCount,
      summary: {
        high: highRiskCount,
        medium: mediumRiskCount,
        low: lowRiskCount,
      },
      message: `Successfully generated risk scores for ${processedCount} tutors`,
    });
  } catch (error) {
    console.error("Error generating risk scores:", error);
    return NextResponse.json(
      {
        error: "Failed to generate risk scores",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}


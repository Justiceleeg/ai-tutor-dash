/**
 * API Route: Pattern Analysis and Recommendations
 * Analyzes system-wide patterns and generates tutor-specific recommendations using OpenAI
 */

import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getTutors } from "@/lib/data/tutors";
import { getSessions } from "@/lib/data/sessions";
import fs from "fs";
import path from "path";
import type { Insights, Recommendation } from "@/lib/types";

export async function POST() {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Load data
    const tutors = getTutors();
    const sessions = getSessions();

    console.log(`Analyzing patterns across ${tutors.length} tutors...`);

    // Step 1: Generate system-wide insights
    const insights = await generateSystemInsights(tutors, sessions);
    
    // Save insights
    const insightsPath = path.join(process.cwd(), "data", "insights.json");
    fs.writeFileSync(
      insightsPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          patterns: insights.patterns,
          systemRecommendations: insights.systemRecommendations,
        },
        null,
        2
      )
    );

    console.log("System insights generated and saved.");

    // Step 2: Generate recommendations for at-risk tutors
    const atRiskTutors = tutors.filter(
      (t) => t.riskScore === "medium" || t.riskScore === "high"
    );

    console.log(`Generating recommendations for ${atRiskTutors.length} at-risk tutors...`);

    let recommendationsGenerated = 0;
    const updatedTutors = tutors.map((tutor) => {
      // Clear recommendations for low-risk tutors
      if (tutor.riskScore === "low" || !tutor.riskScore) {
        return { ...tutor, recommendations: [] };
      }
      return tutor;
    });

    // Generate recommendations for at-risk tutors
    for (const tutor of atRiskTutors) {
      try {
        const recommendations = await generateTutorRecommendations(tutor);
        
        // Update tutor in array
        const index = updatedTutors.findIndex((t) => t.id === tutor.id);
        if (index !== -1) {
          updatedTutors[index] = {
            ...updatedTutors[index],
            recommendations,
          };
          recommendationsGenerated++;
        }

        // Rate limiting: 1 request per second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to generate recommendations for tutor ${tutor.id}:`, error);
      }
    }

    // Save updated tutors
    const tutorsPath = path.join(process.cwd(), "data", "tutors.json");
    fs.writeFileSync(
      tutorsPath,
      JSON.stringify(
        updatedTutors.map((t) => ({
          ...t,
          joinDate: t.joinDate,
          riskScoreGeneratedAt: t.riskScoreGeneratedAt,
        })),
        null,
        2
      )
    );

    console.log(`Recommendations generated for ${recommendationsGenerated} tutors.`);

    return NextResponse.json({
      success: true,
      insightsGenerated: true,
      tutorsAnalyzed: atRiskTutors.length,
      recommendationsGenerated,
    });
  } catch (error) {
    console.error("Error in pattern analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze patterns", details: String(error) },
      { status: 500 }
    );
  }
}

async function generateSystemInsights(tutors: any[], sessions: any[]): Promise<Insights> {
  // Calculate aggregate statistics
  const totalTutors = tutors.length;
  const atRiskCount = tutors.filter((t) => t.riskScore !== "low").length;
  const lowFirstSessionTutors = tutors.filter((t) => t.firstSessionSuccessRate < 50);
  
  const highRiskTutors = tutors.filter((t) => t.riskScore === "high");
  const lowRiskTutors = tutors.filter((t) => t.riskScore === "low");

  const highRiskAvg = {
    rating: highRiskTutors.reduce((sum, t) => sum + t.avgRating, 0) / (highRiskTutors.length || 1),
    rescheduleRate: highRiskTutors.reduce((sum, t) => sum + t.rescheduleRate, 0) / (highRiskTutors.length || 1),
    firstSession: highRiskTutors.reduce((sum, t) => sum + t.firstSessionSuccessRate, 0) / (highRiskTutors.length || 1),
    profileCompletion: highRiskTutors.reduce((sum, t) => sum + t.profileCompletionRate, 0) / (highRiskTutors.length || 1),
  };

  const lowRiskAvg = {
    rating: lowRiskTutors.reduce((sum, t) => sum + t.avgRating, 0) / (lowRiskTutors.length || 1),
    rescheduleRate: lowRiskTutors.reduce((sum, t) => sum + t.rescheduleRate, 0) / (lowRiskTutors.length || 1),
    firstSession: lowRiskTutors.reduce((sum, t) => sum + t.firstSessionSuccessRate, 0) / (lowRiskTutors.length || 1),
    profileCompletion: lowRiskTutors.reduce((sum, t) => sum + t.profileCompletionRate, 0) / (lowRiskTutors.length || 1),
  };

  const lowProfileCompletionCount = tutors.filter((t) => t.profileCompletionRate < 70).length;
  const highSupportTicketCount = tutors.filter((t) => t.supportTicketCount >= 2).length;

  // Construct prompt for OpenAI
  const prompt = `You are analyzing a tutoring platform to identify patterns causing poor performance and student churn.

BUSINESS CONTEXT:
- 24% of students churn after poor first sessions
- 98.2% of reschedules are tutor-initiated (tutors being unreliable)
- 16% of students need replacement tutors due to no-shows
- Our goal is to identify root causes and systemic improvements

AGGREGATE DATA:
Total Tutors: ${totalTutors}
At-Risk Tutors (medium/high): ${atRiskCount} (${((atRiskCount/totalTutors)*100).toFixed(1)}%)
Tutors with <50% First Session Success: ${lowFirstSessionTutors.length}

HIGH-RISK TUTORS AVERAGE METRICS:
- Average Rating: ${highRiskAvg.rating.toFixed(2)}/5.0
- Reschedule Rate: ${highRiskAvg.rescheduleRate.toFixed(1)}%
- First Session Success: ${highRiskAvg.firstSession.toFixed(1)}%
- Profile Completion: ${highRiskAvg.profileCompletion.toFixed(1)}%

LOW-RISK TUTORS AVERAGE METRICS:
- Average Rating: ${lowRiskAvg.rating.toFixed(2)}/5.0
- Reschedule Rate: ${lowRiskAvg.rescheduleRate.toFixed(1)}%
- First Session Success: ${lowRiskAvg.firstSession.toFixed(1)}%
- Profile Completion: ${lowRiskAvg.profileCompletion.toFixed(1)}%

ADDITIONAL INSIGHTS:
- Tutors with <70% profile completion: ${lowProfileCompletionCount} (${((lowProfileCompletionCount/totalTutors)*100).toFixed(1)}%)
- Tutors with ≥2 support tickets (48hr): ${highSupportTicketCount}

TASK:
Identify key patterns and provide actionable recommendations.

FORMAT YOUR RESPONSE EXACTLY AS:
FIRST_SESSION_PATTERNS:
- [Pattern 1 about first sessions]
- [Pattern 2 about first sessions]
- [Pattern 3 about first sessions]

COMMON_RISK_FACTORS:
- [Risk factor 1]
- [Risk factor 2]
- [Risk factor 3]

SYSTEM_RECOMMENDATIONS:
- [System-wide recommendation 1]
- [System-wide recommendation 2]

Be specific and data-driven. Focus on actionable insights.`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    temperature: 0.7,
  });

  // Parse response
  const firstSessionMatch = text.match(/FIRST_SESSION_PATTERNS:([\s\S]*?)(?=COMMON_RISK_FACTORS:|$)/i);
  const riskFactorsMatch = text.match(/COMMON_RISK_FACTORS:([\s\S]*?)(?=SYSTEM_RECOMMENDATIONS:|$)/i);
  const recommendationsMatch = text.match(/SYSTEM_RECOMMENDATIONS:([\s\S]*?)$/i);

  const parseList = (str: string | undefined): string[] => {
    if (!str) return [];
    return str
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => line.substring(1).trim())
      .filter((line) => line.length > 0);
  };

  return {
    generatedAt: new Date(),
    patterns: {
      firstSessionFailures: parseList(firstSessionMatch?.[1]),
      commonRiskFactors: parseList(riskFactorsMatch?.[1]),
    },
    systemRecommendations: parseList(recommendationsMatch?.[1]),
  };
}

async function generateTutorRecommendations(tutor: any): Promise<Recommendation[]> {
  const prompt = `You are a coaching advisor for a tutoring platform. Generate specific, actionable recommendations for this tutor.

TUTOR PROFILE:
- Name: ${tutor.name}
- Risk Level: ${tutor.riskScore?.toUpperCase()}
- Average Rating: ${tutor.avgRating.toFixed(2)}/5.0
- First Session Success Rate: ${tutor.firstSessionSuccessRate.toFixed(1)}%
- Total Sessions: ${tutor.totalSessions}
- Reschedule Rate: ${tutor.rescheduleRate.toFixed(1)}%
- No-Shows: ${tutor.noShowCount}
- Support Tickets (48h): ${tutor.supportTicketCount}
- Profile Completion: ${tutor.profileCompletionRate.toFixed(1)}%
- Current Students: ${tutor.currentStudentCount}

CONTEXT:
${tutor.riskReasoning || "No specific risk reasoning available."}

TASK:
Generate 2-4 specific, actionable recommendations for this tutor. Each recommendation should:
1. Address a specific performance issue
2. Be actionable (coach can implement it)
3. Have clear impact on student experience
4. Be prioritized by urgency/impact

FORMAT EACH RECOMMENDATION EXACTLY AS:
---
PRIORITY: [high/medium]
CATEGORY: [first_session/reliability/engagement/profile]
ACTION: [One clear sentence describing the action]
REASONING: [One sentence explaining why this matters]
---

Provide 2-4 recommendations.`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    temperature: 0.7,
  });

  // Parse recommendations
  const recommendations: Recommendation[] = [];
  const blocks = text.split("---").filter((b) => b.trim().length > 0);

  for (const block of blocks) {
    const priorityMatch = block.match(/PRIORITY:\s*(high|medium)/i);
    const categoryMatch = block.match(/CATEGORY:\s*(first_session|reliability|engagement|profile)/i);
    const actionMatch = block.match(/ACTION:\s*([\s\S]+?)(?=REASONING:|$)/i);
    const reasoningMatch = block.match(/REASONING:\s*([\s\S]+?)$/i);

    if (priorityMatch && categoryMatch && actionMatch && reasoningMatch) {
      recommendations.push({
        id: `rec-${tutor.id}-${recommendations.length + 1}`,
        priority: priorityMatch[1].toLowerCase() as "high" | "medium",
        category: categoryMatch[1].toLowerCase() as any,
        action: actionMatch[1].trim(),
        reasoning: reasoningMatch[1].trim(),
      });
    }
  }

  // Ensure we have at least 2 recommendations
  if (recommendations.length === 0) {
    // Fallback recommendations based on metrics
    if (tutor.firstSessionSuccessRate < 60) {
      recommendations.push({
        id: `rec-${tutor.id}-1`,
        priority: "high",
        category: "first_session",
        action: "Schedule first session preparation training",
        reasoning: "Low first session success rate needs immediate attention",
      });
    }
    if (tutor.profileCompletionRate < 70) {
      recommendations.push({
        id: `rec-${tutor.id}-2`,
        priority: "medium",
        category: "profile",
        action: "Complete tutor profile to at least 80%",
        reasoning: "Incomplete profiles correlate with lower performance",
      });
    }
  }

  return recommendations.slice(0, 4); // Max 4 recommendations
}


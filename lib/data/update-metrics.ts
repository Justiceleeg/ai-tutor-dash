/**
 * Script to calculate and update tutor metrics from session data
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Tutor, Session } from "@/lib/types";
import { enrichTutorsWithMetrics } from "./processor";

console.log("=== Processing Tutor Metrics ===\n");

// Read data files
const dataDir = join(process.cwd(), "data");
const tutorsPath = join(dataDir, "tutors.json");
const sessionsPath = join(dataDir, "sessions.json");

console.log("Reading data files...");
const tutorsData = JSON.parse(readFileSync(tutorsPath, "utf-8"));
const sessionsData = JSON.parse(readFileSync(sessionsPath, "utf-8"));

// Convert JSON dates to Date objects
const tutors: Tutor[] = tutorsData.map((t: any) => ({
  ...t,
  joinDate: new Date(t.joinDate),
  riskScoreGeneratedAt: t.riskScoreGeneratedAt ? new Date(t.riskScoreGeneratedAt) : undefined,
}));

const sessions: Session[] = sessionsData.map((s: any) => ({
  ...s,
  date: new Date(s.date),
}));

console.log(`Processing ${tutors.length} tutors with ${sessions.length} sessions...\n`);

// Calculate metrics for all tutors
const enrichedTutors = enrichTutorsWithMetrics(tutors, sessions);

// Show sample before/after
console.log("Sample metrics calculated:");
const sample = enrichedTutors[10]; // Random sample
console.log(`  ${sample.name}:`);
console.log(`    - Total Sessions: ${sample.totalSessions}`);
console.log(`    - Avg Rating: ${sample.avgRating}/5.0`);
console.log(`    - First Session Success: ${sample.firstSessionSuccessRate}%`);
console.log(`    - Reschedule Rate: ${sample.rescheduleRate}%`);
console.log(`    - No-Shows: ${sample.noShowCount}`);
console.log(`    - Current Students: ${sample.currentStudentCount}`);

// Convert back to JSON format
const tutorsForJson = enrichedTutors.map((t) => ({
  ...t,
  joinDate: t.joinDate.toISOString(),
  riskScoreGeneratedAt: t.riskScoreGeneratedAt ? t.riskScoreGeneratedAt.toISOString() : undefined,
}));

// Save updated tutors
writeFileSync(tutorsPath, JSON.stringify(tutorsForJson, null, 2));

console.log(`\n✓ Updated metrics for ${enrichedTutors.length} tutors`);
console.log(`✓ Saved to ${tutorsPath}`);

// Show summary stats
const withSessions = enrichedTutors.filter((t) => t.totalSessions > 0);
const avgRating = withSessions.reduce((sum, t) => sum + t.avgRating, 0) / withSessions.length;
const avgFirstSession = withSessions.reduce((sum, t) => sum + t.firstSessionSuccessRate, 0) / withSessions.length;

console.log(`\n=== Summary ===`);
console.log(`Tutors with sessions: ${withSessions.length}/${tutors.length}`);
console.log(`Average rating: ${avgRating.toFixed(2)}/5.0`);
console.log(`Average first session success: ${avgFirstSession.toFixed(1)}%`);


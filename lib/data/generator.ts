/**
 * Mock data generator for tutor profiles
 * Generates realistic tutor data for testing and development
 */

import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { join } from "path";
import type { Tutor } from "@/lib/types";

/**
 * Generate a random number of tutors between min and max
 */
function getRandomTutorCount(): number {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50; // 50-100 tutors
}

/**
 * Generate a single tutor profile with realistic data
 */
function generateTutor(index: number): Tutor {
  const joinDate = faker.date.past({ years: 2 });

  return {
    id: `tutor-${String(index + 1).padStart(3, "0")}`,
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    joinDate,
    totalSessions: 0, // Will be calculated from sessions
    avgRating: 0, // Will be calculated from sessions
    firstSessionSuccessRate: 0, // Will be calculated from sessions
    rescheduleRate: 0, // Will be calculated from sessions
    noShowCount: 0, // Will be calculated from sessions
  };
}

/**
 * Generate multiple tutor profiles
 */
export function generateTutors(): Tutor[] {
  const count = getRandomTutorCount();
  console.log(`Generating ${count} tutor profiles...`);

  const tutors: Tutor[] = [];
  for (let i = 0; i < count; i++) {
    tutors.push(generateTutor(i));
  }

  return tutors;
}

/**
 * Save tutors data to JSON file
 */
export function saveTutors(tutors: Tutor[]): void {
  const dataDir = join(process.cwd(), "data");
  const filePath = join(dataDir, "tutors.json");

  // Convert dates to ISO strings for JSON serialization
  const tutorsForJson = tutors.map((tutor) => ({
    ...tutor,
    joinDate: tutor.joinDate.toISOString(),
  }));

  writeFileSync(filePath, JSON.stringify(tutorsForJson, null, 2));
  console.log(`✓ Saved ${tutors.length} tutors to ${filePath}`);
}

/**
 * Main execution: Generate and save tutors
 */
function main() {
  console.log("=== Tutor Data Generation ===\n");

  const tutors = generateTutors();
  saveTutors(tutors);

  console.log("\n=== Generation Complete ===");
  console.log(`Total tutors: ${tutors.length}`);
}

// Run if executed directly
if (require.main === module) {
  main();
}


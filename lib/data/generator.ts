/**
 * Mock data generator for tutor profiles and sessions
 * Generates realistic tutor and session data for testing and development
 */

import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";
import { join } from "path";
import type { Tutor, Session } from "@/lib/types";

/**
 * Generate a random number of tutors between min and max
 */
function getRandomTutorCount(): number {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50; // 50-100 tutors
}

/**
 * Tutor risk profile - determines behavior patterns for session generation
 */
interface TutorRiskProfile {
  rescheduleChance: number; // 0-1
  noShowChance: number; // 0-1
  cancellationChance: number; // 0-1
  avgRatingModifier: number; // -1 to +1
  firstSessionPerformance: number; // 0-1 (lower = worse first sessions)
}

/**
 * Assign a risk profile to a tutor based on their characteristics
 */
function getTutorRiskProfile(profileCompletionRate: number, supportTicketCount: number): TutorRiskProfile {
  // Determine risk tier based on profile completion and support tickets
  const hasLowCompletion = profileCompletionRate < 60;
  const hasHighTickets = supportTicketCount >= 2;
  
  if (hasLowCompletion || hasHighTickets) {
    // High-risk tutor (unreliable, poor performance)
    return {
      rescheduleChance: faker.number.float({ min: 0.15, max: 0.25 }), // 15-25% reschedule rate
      noShowChance: faker.number.float({ min: 0.05, max: 0.10 }), // 5-10% no-show rate
      cancellationChance: faker.number.float({ min: 0.08, max: 0.12 }), // 8-12% cancellation
      avgRatingModifier: faker.number.float({ min: -1.0, max: -0.5 }), // Lower ratings
      firstSessionPerformance: faker.number.float({ min: 0.3, max: 0.5 }), // 30-50% first session success
    };
  } else if (profileCompletionRate < 70 || supportTicketCount === 1) {
    // Medium-risk tutor (some issues)
    return {
      rescheduleChance: faker.number.float({ min: 0.08, max: 0.15 }), // 8-15% reschedule rate
      noShowChance: faker.number.float({ min: 0.02, max: 0.04 }), // 2-4% no-show rate
      cancellationChance: faker.number.float({ min: 0.04, max: 0.08 }), // 4-8% cancellation
      avgRatingModifier: faker.number.float({ min: -0.5, max: 0 }), // Slightly lower ratings
      firstSessionPerformance: faker.number.float({ min: 0.55, max: 0.70 }), // 55-70% first session success
    };
  } else {
    // Low-risk tutor (reliable, good performance)
    return {
      rescheduleChance: faker.number.float({ min: 0.02, max: 0.06 }), // 2-6% reschedule rate
      noShowChance: faker.number.float({ min: 0.001, max: 0.01 }), // 0.1-1% no-show rate
      cancellationChance: faker.number.float({ min: 0.02, max: 0.04 }), // 2-4% cancellation
      avgRatingModifier: faker.number.float({ min: 0, max: 0.5 }), // Higher ratings
      firstSessionPerformance: faker.number.float({ min: 0.75, max: 0.95 }), // 75-95% first session success
    };
  }
}

/**
 * Generate a single tutor profile with realistic data
 */
function generateTutor(index: number): Tutor {
  const joinDate = faker.date.past({ years: 2 });

  // Profile completion weighted toward 70-90% (most tutors complete most fields)
  const rand = Math.random();
  let profileCompletionRate: number;
  if (rand < 0.70) {
    profileCompletionRate = faker.number.int({ min: 70, max: 95 }); // 70% have good completion
  } else if (rand < 0.90) {
    profileCompletionRate = faker.number.int({ min: 50, max: 69 }); // 20% partial
  } else {
    profileCompletionRate = faker.number.int({ min: 20, max: 49 }); // 10% poor completion
  }

  // Support tickets weighted heavily toward 0 (most tutors have no recent issues)
  const ticketRand = Math.random();
  let supportTicketCount: number;
  if (ticketRand < 0.80) supportTicketCount = 0; // 80% no tickets
  else if (ticketRand < 0.95) supportTicketCount = 1; // 15% one ticket
  else if (ticketRand < 0.99) supportTicketCount = 2; // 4% two tickets
  else supportTicketCount = 3; // 1% three tickets (red flag)

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
    currentStudentCount: 0, // Will be calculated from sessions
    supportTicketCount,
    profileCompletionRate,
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
 * Generate sessions for tutors
 */
export function generateSessions(tutors: Tutor[]): Session[] {
  const targetSessionCount = 3000;
  const sessions: Session[] = [];
  
  console.log(`Generating ~${targetSessionCount} sessions...`);
  
  for (const tutor of tutors) {
    // Get tutor's risk profile based on their characteristics
    const riskProfile = getTutorRiskProfile(tutor.profileCompletionRate, tutor.supportTicketCount);
    
    // Each tutor gets between 20-50 sessions (weighted toward 30-40)
    const sessionCount = Math.floor(faker.number.int({ min: 20, max: 50 }));
    
    for (let i = 0; i < sessionCount; i++) {
      const isFirstSession = i < Math.floor(sessionCount * 0.12); // ~12% are first sessions
      
      // Generate session date within past 6 months
      const date = faker.date.recent({ days: 180 });
      
      // Rating influenced by tutor's risk profile
      // First sessions have slightly lower ratings on average, modified by tutor performance
      let rating: number;
      if (isFirstSession) {
        // First session ratings influenced by tutor's first session performance
        const successThreshold = riskProfile.firstSessionPerformance;
        const isSuccessfulFirstSession = Math.random() < successThreshold;
        
        if (isSuccessfulFirstSession) {
          // Successful first session (4-5 stars)
          rating = Math.random() < 0.6 ? 5 : 4;
        } else {
          // Poor first session (1-3 stars)
          const rand = Math.random();
          if (rand < 0.4) rating = 3;
          else if (rand < 0.7) rating = 2;
          else rating = 1;
        }
      } else {
        // Regular session ratings
        const baseRating = faker.number.float({ min: 3.0, max: 5.0 });
        const modifiedRating = Math.max(1, Math.min(5, baseRating + riskProfile.avgRatingModifier));
        rating = Math.round(modifiedRating);
      }
      
      // Duration between 30-90 minutes
      const duration = faker.number.int({ min: 30, max: 90 });
      
      // Risk indicators based on tutor's profile (mutually exclusive)
      const wasRescheduled = Math.random() < riskProfile.rescheduleChance;
      const wasNoShow = !wasRescheduled && Math.random() < riskProfile.noShowChance;
      const wasCancelled = !wasRescheduled && !wasNoShow && Math.random() < riskProfile.cancellationChance;
      
      const session: Session = {
        id: `session-${String(sessions.length + 1).padStart(4, "0")}`,
        tutorId: tutor.id,
        studentId: `student-${String(faker.number.int({ min: 1, max: 500 })).padStart(3, "0")}`,
        date,
        isFirstSession,
        rating,
        duration,
        wasRescheduled,
        wasNoShow,
        wasCancelled,
      };
      
      sessions.push(session);
    }
  }
  
  // Shuffle sessions so they're not grouped by tutor
  sessions.sort(() => Math.random() - 0.5);
  
  return sessions;
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
 * Save sessions data to JSON file
 */
export function saveSessions(sessions: Session[]): void {
  const dataDir = join(process.cwd(), "data");
  const filePath = join(dataDir, "sessions.json");

  // Convert dates to ISO strings for JSON serialization
  const sessionsForJson = sessions.map((session) => ({
    ...session,
    date: session.date.toISOString(),
  }));

  writeFileSync(filePath, JSON.stringify(sessionsForJson, null, 2));
  console.log(`✓ Saved ${sessions.length} sessions to ${filePath}`);
}

/**
 * Main execution: Generate and save tutors and sessions
 */
function main() {
  console.log("=== Tutor Quality Scoring System - Data Generation ===\n");

  // Generate tutors
  const tutors = generateTutors();
  saveTutors(tutors);

  // Generate sessions
  const sessions = generateSessions(tutors);
  saveSessions(sessions);

  // Calculate statistics
  const firstSessionCount = sessions.filter((s) => s.isFirstSession).length;
  const rescheduledCount = sessions.filter((s) => s.wasRescheduled).length;
  const noShowCount = sessions.filter((s) => s.wasNoShow).length;
  const cancelledCount = sessions.filter((s) => s.wasCancelled).length;

  console.log("\n=== Generation Complete ===");
  console.log(`Total tutors: ${tutors.length}`);
  console.log(`Total sessions: ${sessions.length}`);
  console.log(`First sessions: ${firstSessionCount} (${((firstSessionCount / sessions.length) * 100).toFixed(1)}%)`);
  console.log(`Rescheduled: ${rescheduledCount} (${((rescheduledCount / sessions.length) * 100).toFixed(1)}%)`);
  console.log(`No-shows: ${noShowCount} (${((noShowCount / sessions.length) * 100).toFixed(1)}%)`);
  console.log(`Cancelled: ${cancelledCount} (${((cancelledCount / sessions.length) * 100).toFixed(1)}%)`);
}

// Run if executed directly
if (require.main === module) {
  main();
}


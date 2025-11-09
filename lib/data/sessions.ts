/**
 * Data access layer for session records
 * Provides functions to read and query session data
 */

import { readFileSync } from "fs";
import { join } from "path";
import type { Session } from "@/lib/types";

/**
 * Read all sessions from the JSON file
 */
export function getSessions(): Session[] {
  try {
    const filePath = join(process.cwd(), "data", "sessions.json");
    const fileContents = readFileSync(filePath, "utf-8");
    const sessions = JSON.parse(fileContents);

    // Convert ISO date strings back to Date objects
    return sessions.map((session: Omit<Session, "date"> & { date: string }) => ({
      ...session,
      date: new Date(session.date),
    }));
  } catch (error) {
    console.error("Error reading sessions data:", error);
    return [];
  }
}

/**
 * Get sessions for a specific tutor
 */
export function getSessionsByTutorId(tutorId: string): Session[] {
  const sessions = getSessions();
  return sessions.filter((session) => session.tutorId === tutorId);
}

/**
 * Get count of total sessions
 */
export function getSessionCount(): number {
  return getSessions().length;
}

/**
 * Get sessions within a date range
 */
export function getSessionsByDateRange(startDate: Date, endDate: Date): Session[] {
  const sessions = getSessions();
  return sessions.filter(
    (session) => session.date >= startDate && session.date <= endDate
  );
}


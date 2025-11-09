/**
 * Data access layer for tutor profiles
 * Provides functions to read and query tutor data
 */

import { readFileSync } from "fs";
import { join } from "path";
import type { Tutor } from "@/lib/types";

/**
 * Read all tutors from the JSON file
 */
export function getTutors(): Tutor[] {
  try {
    const filePath = join(process.cwd(), "data", "tutors.json");
    const fileContents = readFileSync(filePath, "utf-8");
    const tutors = JSON.parse(fileContents);

    // Convert ISO date strings back to Date objects
    return tutors.map((tutor: Omit<Tutor, "joinDate"> & { joinDate: string }) => ({
      ...tutor,
      joinDate: new Date(tutor.joinDate),
    }));
  } catch (error) {
    console.error("Error reading tutors data:", error);
    return [];
  }
}

/**
 * Get a single tutor by ID
 */
export function getTutorById(id: string): Tutor | undefined {
  const tutors = getTutors();
  return tutors.find((tutor) => tutor.id === id);
}

/**
 * Get count of total tutors
 */
export function getTutorCount(): number {
  return getTutors().length;
}


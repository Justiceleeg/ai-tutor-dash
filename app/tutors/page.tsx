/**
 * Tutors Page
 * Displays a list of all tutors with their performance metrics
 */

import { getTutors } from "@/lib/data/tutors";
import { getSessions } from "@/lib/data/sessions";
import { enrichTutorsWithMetrics } from "@/lib/data/processor";
import { TutorsPageClient } from "@/components/tutors/TutorsPageClient";

export default function TutorsPage() {
  const tutors = getTutors();
  const sessions = getSessions();
  
  // Enrich tutors with calculated metrics
  const enrichedTutors = enrichTutorsWithMetrics(tutors, sessions);

  return <TutorsPageClient tutors={enrichedTutors} />;
}

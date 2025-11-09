/**
 * Tutors Page
 * Displays a list of all tutors with their performance metrics
 */

import { getTutors } from "@/lib/data/tutors";
import { getSessions } from "@/lib/data/sessions";
import { enrichTutorsWithMetrics } from "@/lib/data/processor";
import { TutorTable } from "@/components/tutors/TutorTable";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TutorsPage() {
  const tutors = getTutors();
  const sessions = getSessions();
  
  // Enrich tutors with calculated metrics
  const enrichedTutors = enrichTutorsWithMetrics(tutors, sessions);

  return (
    <div className="container mx-auto py-10">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Tutors</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all tutors in the system ({enrichedTutors.length} total)
        </p>
      </div>

      {/* Table */}
      <TutorTable tutors={enrichedTutors} />
    </div>
  );
}

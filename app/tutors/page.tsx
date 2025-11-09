/**
 * Tutors Page
 * Displays a list of all tutors in the system
 */

import { getTutors } from "@/lib/data/tutors";
import { TutorTable } from "@/components/tutors/TutorTable";

export default function TutorsPage() {
  const tutors = getTutors();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Tutors</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all tutors in the system ({tutors.length} total)
        </p>
      </div>

      <TutorTable tutors={tutors} />
    </div>
  );
}


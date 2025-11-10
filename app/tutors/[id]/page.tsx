/**
 * Tutor Detail Page
 * Displays comprehensive information about a single tutor including performance metrics,
 * risk analysis, recommendations, and session timeline
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getTutorById } from "@/lib/data/tutors";
import { getSessionsByTutorId } from "@/lib/data/sessions";
import { TutorDetailView } from "@/components/tutors/TutorDetailView";
import type { Tutor, Session } from "@/lib/types";

interface TutorDetailPageProps {
  params: {
    id: string;
  };
}

export default function TutorDetailPage({ params }: TutorDetailPageProps) {
  // Fetch tutor data
  const tutor = getTutorById(params.id);

  // Handle 404 case
  if (!tutor) {
    notFound();
  }

  // Fetch sessions for this tutor
  const sessions = getSessionsByTutorId(params.id);

  return (
    <div className="container mx-auto py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link 
          href="/" 
          className="hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link 
          href="/tutors" 
          className="hover:text-foreground transition-colors"
        >
          Tutors
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{tutor.name}</span>
      </nav>

      {/* Tutor Detail View */}
      <TutorDetailView tutor={tutor} sessions={sessions} />
    </div>
  );
}


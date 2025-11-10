/**
 * Tutors Page
 * Displays a list of all tutors with their performance metrics and filtering
 */

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tutor } from "@/lib/types";
import { TutorTable } from "@/components/tutors/TutorTable";
import { TutorFilters, FilterState, defaultFilters } from "@/components/tutors/TutorFilters";

interface TutorsPageClientProps {
  tutors: Tutor[];
}

export function TutorsPageClient({ tutors }: TutorsPageClientProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Apply filters to tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Risk Level filter
      if (filters.riskLevel !== "all" && tutor.riskScore !== filters.riskLevel) {
        return false;
      }

      // Rating Range filter
      if (filters.ratingRange !== "all") {
        if (filters.ratingRange === "low" && tutor.avgRating >= 3.0) return false;
        if (filters.ratingRange === "medium" && (tutor.avgRating < 3.0 || tutor.avgRating > 4.0)) return false;
        if (filters.ratingRange === "high" && tutor.avgRating <= 4.0) return false;
      }

      // First Session Success filter
      if (filters.firstSessionSuccess !== "all") {
        if (filters.firstSessionSuccess === "low" && tutor.firstSessionSuccessRate >= 50) return false;
        if (
          filters.firstSessionSuccess === "medium" &&
          (tutor.firstSessionSuccessRate < 50 || tutor.firstSessionSuccessRate > 75)
        )
          return false;
        if (filters.firstSessionSuccess === "high" && tutor.firstSessionSuccessRate <= 75) return false;
      }

      // Support Tickets filter
      if (filters.supportTickets !== "all") {
        if (filters.supportTickets === "none" && tutor.supportTicketCount !== 0) return false;
        if (filters.supportTickets === "some" && tutor.supportTicketCount !== 1) return false;
        if (filters.supportTickets === "many" && tutor.supportTicketCount < 2) return false;
      }

      // Profile Completion filter
      if (filters.profileCompletion !== "all") {
        if (filters.profileCompletion === "low" && tutor.profileCompletionRate >= 70) return false;
        if (
          filters.profileCompletion === "medium" &&
          (tutor.profileCompletionRate < 70 || tutor.profileCompletionRate > 90)
        )
          return false;
        if (filters.profileCompletion === "high" && tutor.profileCompletionRate <= 90) return false;
      }

      return true;
    });
  }, [tutors, filters]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.riskLevel !== "all") count++;
    if (filters.ratingRange !== "all") count++;
    if (filters.firstSessionSuccess !== "all") count++;
    if (filters.supportTickets !== "all") count++;
    if (filters.profileCompletion !== "all") count++;
    return count;
  }, [filters]);

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
          View and manage all tutors in the system ({filteredTutors.length} of {tutors.length} shown)
        </p>
      </div>

      {/* Filters */}
      <TutorFilters filters={filters} onFiltersChange={setFilters} activeCount={activeFilterCount} />

      {/* Table */}
      {filteredTutors.length > 0 ? (
        <TutorTable tutors={filteredTutors} />
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-2">No tutors match your current filters.</p>
          <button
            onClick={() => setFilters(defaultFilters)}
            className="text-sm text-primary hover:underline"
          >
            Clear filters to see all tutors
          </button>
        </div>
      )}
    </div>
  );
}


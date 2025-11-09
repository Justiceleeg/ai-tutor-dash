/**
 * Metrics calculation engine
 * Processes session data to calculate tutor performance metrics
 */

import type { Tutor, Session } from "@/lib/types";

/**
 * Calculate metrics for a single tutor based on their sessions
 */
export function calculateTutorMetrics(
  tutorId: string,
  sessions: Session[]
): Partial<Tutor> {
  const tutorSessions = sessions.filter((s) => s.tutorId === tutorId);

  if (tutorSessions.length === 0) {
    return {
      totalSessions: 0,
      avgRating: 0,
      firstSessionSuccessRate: 0,
      rescheduleRate: 0,
      noShowCount: 0,
      currentStudentCount: 0,
    };
  }

  // Calculate average rating
  const totalRating = tutorSessions.reduce((sum, s) => sum + s.rating, 0);
  const avgRating = parseFloat((totalRating / tutorSessions.length).toFixed(1));

  // Calculate first session success rate (sessions rated 4+ out of first sessions)
  const firstSessions = tutorSessions.filter((s) => s.isFirstSession);
  const successfulFirstSessions = firstSessions.filter((s) => s.rating >= 4);
  const firstSessionSuccessRate =
    firstSessions.length > 0
      ? parseFloat(((successfulFirstSessions.length / firstSessions.length) * 100).toFixed(1))
      : 0;

  // Calculate reschedule rate
  const rescheduled = tutorSessions.filter((s) => s.wasRescheduled);
  const rescheduleRate = parseFloat(
    ((rescheduled.length / tutorSessions.length) * 100).toFixed(1)
  );

  // Count no-shows
  const noShowCount = tutorSessions.filter((s) => s.wasNoShow).length;

  // Calculate current student count (unique students in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentSessions = tutorSessions.filter((s) => s.date >= thirtyDaysAgo);
  const uniqueStudents = new Set(recentSessions.map((s) => s.studentId));
  const currentStudentCount = uniqueStudents.size;

  return {
    totalSessions: tutorSessions.length,
    avgRating,
    firstSessionSuccessRate,
    rescheduleRate,
    noShowCount,
    currentStudentCount,
  };
}

/**
 * Enrich all tutors with calculated metrics from sessions
 */
export function enrichTutorsWithMetrics(
  tutors: Tutor[],
  sessions: Session[]
): Tutor[] {
  return tutors.map((tutor) => {
    const metrics = calculateTutorMetrics(tutor.id, sessions);
    return {
      ...tutor,
      ...metrics,
    };
  });
}

/**
 * Calculate system-wide metrics across all tutors and sessions
 */
export interface SystemMetrics {
  totalTutors: number;
  totalSessions: number;
  avgRating: number;
  activeTutors: number; // Tutors with sessions in last 30 days
  ratingDistribution: { rating: number; count: number }[];
}

export function calculateSystemMetrics(
  tutors: Tutor[],
  sessions: Session[]
): SystemMetrics {
  const totalTutors = tutors.length;
  const totalSessions = sessions.length;

  // Calculate overall average rating
  const totalRating = sessions.reduce((sum, s) => sum + s.rating, 0);
  const avgRating = totalSessions > 0 ? parseFloat((totalRating / totalSessions).toFixed(1)) : 0;

  // Calculate active tutors (with sessions in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentSessions = sessions.filter((s) => s.date >= thirtyDaysAgo);
  const activeTutorIds = new Set(recentSessions.map((s) => s.tutorId));
  const activeTutors = activeTutorIds.size;

  // Calculate rating distribution (1-5 stars)
  const ratingCounts = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: sessions.filter((s) => s.rating === rating).length,
  }));

  return {
    totalTutors,
    totalSessions,
    avgRating,
    activeTutors,
    ratingDistribution: ratingCounts,
  };
}


/**
 * Core data models for the Tutor Quality Scoring System
 */

export interface Tutor {
  id: string;
  name: string;
  email: string;
  joinDate: Date;
  totalSessions: number;
  avgRating: number;
  firstSessionSuccessRate: number;
  rescheduleRate: number;
  noShowCount: number;
  riskScore?: "low" | "medium" | "high";
  riskReasoning?: string;
  recommendations?: string[];
}

export interface Session {
  id: string;
  tutorId: string;
  studentId: string;
  date: Date;
  isFirstSession: boolean;
  rating: number; // 1-5 stars
  duration: number; // minutes
  wasRescheduled: boolean;
  wasNoShow: boolean;
  wasCancelled: boolean;
  feedback?: string;
}

export interface Insights {
  generatedAt: Date;
  patterns: {
    firstSessionFailures: string[];
    commonRiskFactors: string[];
  };
  systemRecommendations: string[];
}


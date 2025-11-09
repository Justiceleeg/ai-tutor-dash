/**
 * TutorTable Component
 * Displays a list of tutors with their performance metrics in a responsive table format
 */

import { Tutor, RiskLevel } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Users, AlertCircle, CheckCircle2, AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";

interface TutorTableProps {
  tutors: Tutor[];
}

/**
 * Format a date to a readable string
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Format a rating with star icon
 */
function formatRating(rating: number) {
  if (rating === 0) return <span className="text-muted-foreground">N/A</span>;
  
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
      <span className="font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

/**
 * Format percentage with color coding
 */
function formatPercentage(value: number) {
  if (value === 0) return <span className="text-muted-foreground">0%</span>;
  
  let colorClass = "text-foreground";
  if (value >= 75) colorClass = "text-green-600 dark:text-green-400";
  else if (value >= 50) colorClass = "text-yellow-600 dark:text-yellow-400";
  else colorClass = "text-red-600 dark:text-red-400";
  
  return <span className={`font-medium ${colorClass}`}>{value.toFixed(0)}%</span>;
}

/**
 * Format support ticket count with alert styling
 */
function formatSupportTickets(count: number) {
  if (count === 0) return <span className="text-muted-foreground">0</span>;
  
  return (
    <div className="flex items-center justify-center gap-1.5">
      <AlertCircle className={`h-3.5 w-3.5 ${count >= 2 ? 'text-red-500' : 'text-yellow-500'}`} />
      <span className={`font-medium ${count >= 2 ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
        {count}
      </span>
    </div>
  );
}

/**
 * Format profile completion with visual indicator
 */
function formatProfileCompletion(rate: number) {
  let colorClass = "text-foreground";
  let icon = CheckCircle2;
  
  if (rate >= 80) colorClass = "text-green-600 dark:text-green-400";
  else if (rate >= 60) colorClass = "text-yellow-600 dark:text-yellow-400";
  else colorClass = "text-red-600 dark:text-red-400";
  
  return (
    <div className="flex items-center gap-1.5">
      <span className={`font-medium ${colorClass}`}>{rate}%</span>
    </div>
  );
}

/**
 * Format risk score with color-coded badge and tooltip
 */
function formatRiskScore(riskScore?: RiskLevel, riskReasoning?: string) {
  if (!riskScore) {
    return (
      <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
        <span className="text-xs">Not assessed</span>
      </div>
    );
  }
  
  let bgColor = "";
  let textColor = "";
  let Icon = ShieldCheck;
  
  if (riskScore === "low") {
    bgColor = "bg-green-100 dark:bg-green-950";
    textColor = "text-green-700 dark:text-green-300";
    Icon = ShieldCheck;
  } else if (riskScore === "medium") {
    bgColor = "bg-yellow-100 dark:bg-yellow-950";
    textColor = "text-yellow-700 dark:text-yellow-300";
    Icon = AlertTriangle;
  } else {
    bgColor = "bg-red-100 dark:bg-red-950";
    textColor = "text-red-700 dark:text-red-300";
    Icon = ShieldAlert;
  }
  
  return (
    <div className="flex items-center justify-center">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${bgColor} ${textColor}`}
        title={riskReasoning || "No reasoning available"}
      >
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs font-medium capitalize">{riskScore}</span>
      </div>
    </div>
  );
}

export function TutorTable({ tutors }: TutorTableProps) {
  if (tutors.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No tutors found. Run the data generation script to create tutors.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Risk Score</TableHead>
            <TableHead className="text-center">Avg Rating</TableHead>
            <TableHead className="text-right">Sessions</TableHead>
            <TableHead className="text-right">Current Students</TableHead>
            <TableHead className="text-right">First Session Success</TableHead>
            <TableHead className="text-center">Support Tickets</TableHead>
            <TableHead className="text-right">Profile</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tutors.map((tutor) => (
            <TableRow key={tutor.id}>
              <TableCell className="font-medium">{tutor.id}</TableCell>
              <TableCell>{tutor.name}</TableCell>
              <TableCell className="text-muted-foreground">{tutor.email}</TableCell>
              <TableCell className="text-center">
                {formatRiskScore(tutor.riskScore, tutor.riskReasoning)}
              </TableCell>
              <TableCell className="text-center">{formatRating(tutor.avgRating)}</TableCell>
              <TableCell className="text-right">{tutor.totalSessions}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{tutor.currentStudentCount}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatPercentage(tutor.firstSessionSuccessRate)}
              </TableCell>
              <TableCell className="text-center">
                {formatSupportTickets(tutor.supportTicketCount)}
              </TableCell>
              <TableCell className="text-right">
                {formatProfileCompletion(tutor.profileCompletionRate)}
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDate(tutor.joinDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

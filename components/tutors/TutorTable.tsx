/**
 * TutorTable Component
 * Displays a list of tutors with their performance metrics in a responsive table format
 */

"use client";

import { useState } from "react";
import { Tutor, RiskLevel } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, Users, AlertCircle, CheckCircle2, AlertTriangle, ShieldCheck, ShieldAlert, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface TutorTableProps {
  tutors: Tutor[];
}

type SortKey = "name" | "riskScore" | "avgRating" | "totalSessions" | "firstSessionSuccessRate" | "currentStudentCount" | "supportTicketCount" | "profileCompletionRate";
type SortDirection = "asc" | "desc";

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
 * Format risk score with color-coded badge (clickable, no tooltip)
 */
function formatRiskScore(riskScore?: RiskLevel, onClick?: () => void) {
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
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${bgColor} ${textColor} hover:opacity-80 transition-opacity cursor-pointer`}
      >
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs font-medium capitalize">{riskScore}</span>
      </button>
    </div>
  );
}

export function TutorTable({ tutors }: TutorTableProps) {
  // Sorting state - default to highest risk first
  const [sortKey, setSortKey] = useState<SortKey>("riskScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  
  // Modal state for risk reasoning
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle sort column click
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Toggle direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New column - default to descending for metrics, ascending for name
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
  };

  // Sort tutors
  const sortedTutors = [...tutors].sort((a, b) => {
    if (!sortKey) return 0;

    let aVal: any = a[sortKey];
    let bVal: any = b[sortKey];

    // Handle risk score specially (high > medium > low for "desc")
    if (sortKey === "riskScore") {
      const riskOrder = { high: 3, medium: 2, low: 1 };
      aVal = riskOrder[a.riskScore || "low"];
      bVal = riskOrder[b.riskScore || "low"];
    }

    // Handle undefined/null values
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    // Comparison
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Render sort indicator
  const SortIndicator = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" />
    );
  };

  // Handle risk badge click
  const handleRiskClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  if (tutors.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No tutors found. Run the data generation script to create tutors.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1.5">
                  Name
                  <SortIndicator column="name" />
                </div>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead
                className="text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("riskScore")}
              >
                <div className="flex items-center justify-center gap-1.5">
                  Risk Score
                  <SortIndicator column="riskScore" />
                </div>
              </TableHead>
              <TableHead
                className="text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("avgRating")}
              >
                <div className="flex items-center justify-center gap-1.5">
                  Avg Rating
                  <SortIndicator column="avgRating" />
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("totalSessions")}
              >
                <div className="flex items-center justify-end gap-1.5">
                  Sessions
                  <SortIndicator column="totalSessions" />
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("currentStudentCount")}
              >
                <div className="flex items-center justify-end gap-1.5">
                  Current Students
                  <SortIndicator column="currentStudentCount" />
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("firstSessionSuccessRate")}
              >
                <div className="flex items-center justify-end gap-1.5">
                  First Session Success
                  <SortIndicator column="firstSessionSuccessRate" />
                </div>
              </TableHead>
              <TableHead
                className="text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("supportTicketCount")}
              >
                <div className="flex items-center justify-center gap-1.5">
                  Support Tickets
                  <SortIndicator column="supportTicketCount" />
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("profileCompletionRate")}
              >
                <div className="flex items-center justify-end gap-1.5">
                  Profile
                  <SortIndicator column="profileCompletionRate" />
                </div>
              </TableHead>
              <TableHead>Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTutors.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell className="font-medium">{tutor.id}</TableCell>
                <TableCell>{tutor.name}</TableCell>
                <TableCell className="text-muted-foreground">{tutor.email}</TableCell>
                <TableCell className="text-center">
                  {formatRiskScore(tutor.riskScore, () => handleRiskClick(tutor))}
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

      {/* Risk Reasoning Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Risk Assessment: {selectedTutor?.name}
              {selectedTutor?.riskScore && (
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                  selectedTutor.riskScore === "low"
                    ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                    : selectedTutor.riskScore === "medium"
                    ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                    : "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                }`}>
                  {selectedTutor.riskScore === "low" ? (
                    <ShieldCheck className="h-3.5 w-3.5" />
                  ) : selectedTutor.riskScore === "medium" ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <ShieldAlert className="h-3.5 w-3.5" />
                  )}
                  {selectedTutor.riskScore}
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="sr-only">
              AI-generated risk assessment and reasoning for this tutor
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-lg font-semibold">{selectedTutor?.avgRating.toFixed(1)}/5.0</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">First Session Success</p>
                <p className="text-lg font-semibold">{selectedTutor?.firstSessionSuccessRate.toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-lg font-semibold">{selectedTutor?.totalSessions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reschedule Rate</p>
                <p className="text-lg font-semibold">{selectedTutor?.rescheduleRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">No-Shows</p>
                <p className="text-lg font-semibold">{selectedTutor?.noShowCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Support Tickets (48h)</p>
                <p className="text-lg font-semibold">{selectedTutor?.supportTicketCount}</p>
              </div>
            </div>

            {/* AI Reasoning */}
            <div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedTutor?.riskReasoning || "No reasoning available."}
              </p>
            </div>

            {selectedTutor?.riskScoreGeneratedAt && (
              <p className="text-xs text-muted-foreground">
                Generated: {formatDate(selectedTutor.riskScoreGeneratedAt)}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

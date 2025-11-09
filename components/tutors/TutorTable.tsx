/**
 * TutorTable Component
 * Displays a list of tutors in a responsive table format
 */

import { Tutor } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Total Sessions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tutors.map((tutor) => (
            <TableRow key={tutor.id}>
              <TableCell className="font-medium">{tutor.id}</TableCell>
              <TableCell>{tutor.name}</TableCell>
              <TableCell>{tutor.email}</TableCell>
              <TableCell>{formatDate(tutor.joinDate)}</TableCell>
              <TableCell className="text-right">{tutor.totalSessions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


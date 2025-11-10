/**
 * Not Found Page for Invalid Tutor IDs
 * Displays when a tutor with the given ID doesn't exist
 */

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="container mx-auto py-20">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <CardTitle className="text-2xl">Tutor Not Found</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The tutor you're looking for doesn't exist or may have been removed from the system.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/tutors">View All Tutors</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


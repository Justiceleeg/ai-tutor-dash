/**
 * Homepage / Dashboard
 * Main dashboard displaying system metrics and visualizations
 */

import Link from "next/link";
import { getTutors } from "@/lib/data/tutors";
import { getSessions } from "@/lib/data/sessions";
import { calculateSystemMetrics } from "@/lib/data/processor";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RatingDistributionChart } from "@/components/dashboard/RatingDistributionChart";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { Users, Calendar, Star, TrendingUp } from "lucide-react";
import fs from "fs";
import path from "path";
import type { Insights } from "@/lib/types";

export default function DashboardPage() {
  // Load and process data
  const tutors = getTutors();
  const sessions = getSessions();
  const metrics = calculateSystemMetrics(tutors, sessions);

  // Load insights if available
  let insights: Insights | null = null;
  try {
    const insightsPath = path.join(process.cwd(), "data", "insights.json");
    if (fs.existsSync(insightsPath)) {
      const data = JSON.parse(fs.readFileSync(insightsPath, "utf-8"));
      insights = {
        ...data,
        generatedAt: new Date(data.generatedAt),
      };
    }
  } catch (error) {
    console.error("Failed to load insights:", error);
  }

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Tutor Quality Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor tutor performance, track metrics, and identify coaching opportunities
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Total Tutors"
          value={metrics.totalTutors}
          description="Active in the system"
          icon={Users}
        />
        <MetricCard
          title="Total Sessions"
          value={metrics.totalSessions.toLocaleString()}
          description="Sessions completed"
          icon={Calendar}
        />
        <MetricCard
          title="Average Rating"
          value={`${metrics.avgRating} / 5.0`}
          description="Across all sessions"
          icon={Star}
        />
        <MetricCard
          title="Active Tutors"
          value={metrics.activeTutors}
          description="With sessions in last 30 days"
          icon={TrendingUp}
        />
      </div>

      {/* Rating Distribution Chart */}
      <div className="mb-8">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Distribution of session ratings across the platform
          </p>
          <RatingDistributionChart data={metrics.ratingDistribution} />
        </div>
      </div>

      {/* System Insights */}
      <div className="mb-8">
        <InsightsPanel insights={insights} />
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <Link
          href="/tutors"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View All Tutors
        </Link>
      </div>
    </div>
  );
}

/**
 * InsightsPanel Component
 * Displays AI-generated system-wide pattern insights on the dashboard
 */

"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingDown, Lightbulb, Clock } from "lucide-react";
import type { Insights } from "@/lib/types";

interface InsightsPanelProps {
  insights: Insights | null;
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  if (!insights) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
          <h2 className="text-xl font-semibold">System Insights</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          No insights available yet. Run pattern analysis to generate insights.
        </p>
      </Card>
    );
  }

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-semibold">System Insights</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Generated: {formatDate(insights.generatedAt)}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* First Session Failure Patterns */}
        <Card className="p-6 border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold text-lg">First Session Failure Patterns</h3>
          </div>
          {insights.patterns.firstSessionFailures.length > 0 ? (
            <ul className="space-y-3">
              {insights.patterns.firstSessionFailures.map((pattern, index) => (
                <li key={index} className="text-sm leading-relaxed flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground flex-1">{pattern}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No patterns identified</p>
          )}
        </Card>

        {/* Common Risk Factors */}
        <Card className="p-6 border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold text-lg">Common Risk Factors</h3>
          </div>
          {insights.patterns.commonRiskFactors.length > 0 ? (
            <ul className="space-y-3">
              {insights.patterns.commonRiskFactors.map((factor, index) => (
                <li key={index} className="text-sm leading-relaxed flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 text-xs font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground flex-1">{factor}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No risk factors identified</p>
          )}
        </Card>
      </div>

      {/* System Recommendations */}
      {insights.systemRecommendations.length > 0 && (
        <Card className="p-6 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-lg">System-Wide Recommendations</h3>
          </div>
          <ul className="space-y-3">
            {insights.systemRecommendations.map((recommendation, index) => (
              <li key={index} className="text-sm leading-relaxed flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-medium text-foreground flex-1">{recommendation}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}


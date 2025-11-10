/**
 * TutorDetailView Component
 * Comprehensive view of a single tutor's performance, risk analysis, and session history
 */

"use client";

import { memo } from "react";
import { Tutor, Session } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Star,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Shield,
  ShieldAlert,
  Target,
  Zap,
  Clock,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { SessionTimeline } from "./SessionTimeline";

interface TutorDetailViewProps {
  tutor: Tutor;
  sessions: Session[];
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
 * Format risk score badge
 */
function formatRiskBadge(riskScore?: string) {
  if (!riskScore) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
        <Shield className="h-4 w-4" />
        <span className="text-sm font-medium">No Score</span>
      </div>
    );
  }

  const config = {
    low: {
      bgColor: "bg-green-100 dark:bg-green-950",
      textColor: "text-green-700 dark:text-green-300",
      icon: CheckCircle2,
    },
    medium: {
      bgColor: "bg-yellow-100 dark:bg-yellow-950",
      textColor: "text-yellow-700 dark:text-yellow-300",
      icon: AlertCircle,
    },
    high: {
      bgColor: "bg-red-100 dark:bg-red-950",
      textColor: "text-red-700 dark:text-red-300",
      icon: ShieldAlert,
    },
  };

  const { bgColor, textColor, icon: Icon } = config[riskScore as keyof typeof config] || config.low;

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${bgColor} ${textColor}`}>
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium capitalize">{riskScore} Risk</span>
    </div>
  );
}

export const TutorDetailView = memo(function TutorDetailView({ tutor, sessions }: TutorDetailViewProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{tutor.name}</h1>
          <p className="text-muted-foreground">{tutor.email}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined {formatDate(tutor.joinDate)}</span>
          </div>
        </div>
        <div>{formatRiskBadge(tutor.riskScore)}</div>
      </div>

      {/* Metrics Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Rating */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">{tutor.avgRating.toFixed(1)}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        {/* Total Sessions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tutor.totalSessions}</div>
          </CardContent>
        </Card>

        {/* First Session Success */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              First Session Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                tutor.firstSessionSuccessRate >= 75
                  ? "text-green-600 dark:text-green-400"
                  : tutor.firstSessionSuccessRate >= 50
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {tutor.firstSessionSuccessRate.toFixed(0)}%
            </div>
          </CardContent>
        </Card>

        {/* Current Students */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Current Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tutor.currentStudentCount}</div>
          </CardContent>
        </Card>

        {/* Reschedule Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-orange-500" />
              Reschedule Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                tutor.rescheduleRate > 20
                  ? "text-red-600 dark:text-red-400"
                  : tutor.rescheduleRate > 10
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-foreground"
              }`}
            >
              {tutor.rescheduleRate.toFixed(0)}%
            </div>
          </CardContent>
        </Card>

        {/* No-Shows */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              No-Shows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                tutor.noShowCount > 0 ? "text-red-600 dark:text-red-400" : "text-foreground"
              }`}
            >
              {tutor.noShowCount}
            </div>
          </CardContent>
        </Card>

        {/* Support Tickets */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Support Tickets (48h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                tutor.supportTicketCount >= 2
                  ? "text-red-600 dark:text-red-400"
                  : tutor.supportTicketCount >= 1
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-foreground"
              }`}
            >
              {tutor.supportTicketCount}
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-500" />
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                tutor.profileCompletionRate >= 80
                  ? "text-green-600 dark:text-green-400"
                  : tutor.profileCompletionRate >= 60
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {tutor.profileCompletionRate.toFixed(0)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis & Recommendations Section */}
      {(tutor.riskScore && tutor.riskScore !== "low") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-500" />
              Risk Analysis & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Reasoning */}
            {tutor.riskReasoning && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  Risk Assessment
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tutor.riskReasoning}
                </p>
                {tutor.riskScoreGeneratedAt && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Generated on {formatDate(tutor.riskScoreGeneratedAt)}
                  </p>
                )}
              </div>
            )}

            {/* Recommendations */}
            {tutor.recommendations && tutor.recommendations.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  Recommendations ({tutor.recommendations.length})
                </h3>
                <div className="space-y-3">
                  {tutor.recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        rec.priority === "high"
                          ? "border-l-red-500 bg-red-50/50 dark:bg-red-950/20"
                          : "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Zap
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                            rec.priority === "high" ? "text-red-500" : "text-yellow-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className={`text-xs font-semibold uppercase ${
                                rec.priority === "high"
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-yellow-600 dark:text-yellow-400"
                              }`}
                            >
                              {rec.priority} Priority
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground capitalize">
                              {rec.category.replace("_", " ")}
                            </span>
                          </div>
                          <p className="text-sm font-medium mb-1">{rec.action}</p>
                          <p className="text-xs text-muted-foreground">{rec.reasoning}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No recommendations yet */}
            {(!tutor.recommendations || tutor.recommendations.length === 0) && (
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                  Recommendations pending. Run pattern analysis to generate.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Low Risk Message */}
      {tutor.riskScore === "low" && (
        <Card className="border-green-200 dark:border-green-900">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
              <CheckCircle2 className="h-6 w-6" />
              <div>
                <p className="font-semibold">Great Performance!</p>
                <p className="text-sm text-muted-foreground">
                  This tutor is performing well with no significant risk factors identified.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Timeline */}
      <SessionTimeline tutor={tutor} sessions={sessions} />
    </div>
  );
});


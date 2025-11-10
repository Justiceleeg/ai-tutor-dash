/**
 * SessionTimeline Component
 * Displays a tutor's session history with a rating trend chart and chronological list
 */

"use client";

import { Tutor, Session } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, Star, Calendar, AlertCircle, RefreshCw, XCircle, Sparkles } from "lucide-react";
import { useMemo, memo } from "react";

interface SessionTimelineProps {
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
 * Format a short date for chart
 */
function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// Memoize the component for better performance
export const SessionTimeline = memo(function SessionTimeline({ tutor, sessions }: SessionTimelineProps) {
  // Prepare chart data (last 20 sessions for readability)
  const chartData = useMemo(() => {
    return sessions
      .slice(0, 20)
      .reverse()
      .map((session) => ({
        date: formatShortDate(session.date),
        rating: session.rating,
        fullDate: session.date,
      }));
  }, [sessions]);

  // Calculate session statistics
  const stats = useMemo(() => {
    const completed = sessions.filter((s) => !s.wasCancelled && !s.wasNoShow).length;
    const rescheduled = sessions.filter((s) => s.wasRescheduled).length;
    const noShows = sessions.filter((s) => s.wasNoShow).length;
    const cancelled = sessions.filter((s) => s.wasCancelled).length;
    const firstSessions = sessions.filter((s) => s.isFirstSession).length;

    return { completed, rescheduled, noShows, cancelled, firstSessions };
  }, [sessions]);

  if (sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Session History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No session history available for this tutor.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Session History ({sessions.length} total)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Session Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.firstSessions}</div>
            <div className="text-xs text-muted-foreground">First Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.rescheduled}</div>
            <div className="text-xs text-muted-foreground">Rescheduled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.noShows}</div>
            <div className="text-xs text-muted-foreground">No-Shows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.cancelled}</div>
            <div className="text-xs text-muted-foreground">Cancelled</div>
          </div>
        </div>

        {/* Rating Trend Chart */}
        {chartData.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Rating Trend (Last {Math.min(20, sessions.length)} Sessions)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis 
                  domain={[0, 5]} 
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Chronological Session List */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            Recent Sessions
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sessions.slice(0, 10).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{formatDate(session.date)}</span>
                    <div className="flex items-center gap-1.5">
                      {session.isFirstSession && (
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                          <Sparkles className="h-3 w-3" />
                          First
                        </span>
                      )}
                      {session.wasRescheduled && (
                        <span className="inline-flex items-center gap-1 text-xs bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full">
                          <RefreshCw className="h-3 w-3" />
                          Rescheduled
                        </span>
                      )}
                      {session.wasNoShow && (
                        <span className="inline-flex items-center gap-1 text-xs bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full">
                          <AlertCircle className="h-3 w-3" />
                          No-Show
                        </span>
                      )}
                      {session.wasCancelled && (
                        <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                          <XCircle className="h-3 w-3" />
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.duration} min
                    </span>
                    {session.feedback && (
                      <span className="truncate max-w-xs">{session.feedback}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{session.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
          {sessions.length > 10 && (
            <p className="text-sm text-muted-foreground text-center mt-3">
              Showing 10 of {sessions.length} sessions
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
});


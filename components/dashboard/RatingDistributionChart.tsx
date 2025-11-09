/**
 * RatingDistributionChart Component
 * Displays a bar chart showing the distribution of ratings (1-5 stars)
 */

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RatingDistributionChartProps {
  data: { rating: number; count: number }[];
}

export function RatingDistributionChart({ data }: RatingDistributionChartProps) {
  // Format data for recharts
  const chartData = data.map((item) => ({
    rating: `${item.rating} Star${item.rating !== 1 ? "s" : ""}`,
    count: item.count,
    ratingValue: item.rating,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="rating"
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          labelStyle={{ color: "hsl(var(--card-foreground))" }}
        />
        <Legend />
        <Bar
          dataKey="count"
          fill="hsl(var(--primary))"
          name="Number of Sessions"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}


/**
 * TutorFilters Component
 * Provides filtering controls for the tutor list
 */

"use client";

import { memo } from "react";
import { RiskLevel } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";

export interface FilterState {
  riskLevel: RiskLevel | "all";
  ratingRange: "all" | "low" | "medium" | "high";
  firstSessionSuccess: "all" | "low" | "medium" | "high";
  supportTickets: "all" | "none" | "some" | "many";
  profileCompletion: "all" | "low" | "medium" | "high";
}

export const defaultFilters: FilterState = {
  riskLevel: "all",
  ratingRange: "all",
  firstSessionSuccess: "all",
  supportTickets: "all",
  profileCompletion: "all",
};

interface TutorFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeCount: number;
}

export const TutorFilters = memo(function TutorFilters({ filters, onFiltersChange, activeCount }: TutorFiltersProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange(defaultFilters);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Filters</h3>
            {activeCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeCount} active
              </Badge>
            )}
          </div>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Risk Level Filter */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Risk Level
            </label>
            <select
              value={filters.riskLevel}
              onChange={(e) => updateFilter("riskLevel", e.target.value as FilterState["riskLevel"])}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Rating Range Filter */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Avg Rating
            </label>
            <select
              value={filters.ratingRange}
              onChange={(e) => updateFilter("ratingRange", e.target.value as FilterState["ratingRange"])}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="low">&lt; 3.0</option>
              <option value="medium">3.0 - 4.0</option>
              <option value="high">&gt; 4.0</option>
            </select>
          </div>

          {/* First Session Success Filter */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              First Session Success
            </label>
            <select
              value={filters.firstSessionSuccess}
              onChange={(e) =>
                updateFilter("firstSessionSuccess", e.target.value as FilterState["firstSessionSuccess"])
              }
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="low">&lt; 50%</option>
              <option value="medium">50% - 75%</option>
              <option value="high">&gt; 75%</option>
            </select>
          </div>

          {/* Support Tickets Filter */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Support Tickets (48h)
            </label>
            <select
              value={filters.supportTickets}
              onChange={(e) => updateFilter("supportTickets", e.target.value as FilterState["supportTickets"])}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="none">0</option>
              <option value="some">1</option>
              <option value="many">2+</option>
            </select>
          </div>

          {/* Profile Completion Filter */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Profile Completion
            </label>
            <select
              value={filters.profileCompletion}
              onChange={(e) =>
                updateFilter("profileCompletion", e.target.value as FilterState["profileCompletion"])
              }
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="low">&lt; 70%</option>
              <option value="medium">70% - 90%</option>
              <option value="high">&gt; 90%</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});


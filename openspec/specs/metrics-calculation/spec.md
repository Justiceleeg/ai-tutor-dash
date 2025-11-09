# metrics-calculation Specification

## Purpose
TBD - created by archiving change add-session-metrics-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Per-Tutor Metrics Calculation
The system SHALL calculate performance metrics for each tutor based on their session history.

#### Scenario: Calculate average rating
- **GIVEN** a tutor has 10 sessions with ratings [5, 4, 5, 3, 4, 5, 4, 5, 3, 5]
- **WHEN** metrics are calculated
- **THEN** the avgRating SHALL be 4.3
- **AND** the result SHALL be rounded to one decimal place

#### Scenario: Calculate total session count
- **GIVEN** a tutor has 45 sessions in the dataset
- **WHEN** metrics are calculated
- **THEN** totalSessions SHALL equal 45
- **AND** it SHALL count all sessions regardless of status flags

#### Scenario: Calculate first session success rate
- **GIVEN** a tutor has 5 first sessions with ratings [5, 3, 4, 5, 2]
- **WHEN** metrics are calculated
- **THEN** firstSessionSuccessRate SHALL be 60% (3 out of 5 rated 4+)
- **AND** success SHALL be defined as rating >= 4

#### Scenario: Handle tutor with no first sessions
- **GIVEN** a tutor has 20 sessions but none marked as first sessions
- **WHEN** metrics are calculated
- **THEN** firstSessionSuccessRate SHALL be 0 or null
- **AND** the system SHALL handle this gracefully

#### Scenario: Calculate reschedule rate
- **GIVEN** a tutor has 30 sessions and 9 are marked wasRescheduled
- **WHEN** metrics are calculated
- **THEN** rescheduleRate SHALL be 30% (9/30)
- **AND** the result SHALL be expressed as a percentage

#### Scenario: Count no-shows
- **GIVEN** a tutor has 3 sessions marked as wasNoShow
- **WHEN** metrics are calculated
- **THEN** noShowCount SHALL equal 3
- **AND** this SHALL be an integer count, not a rate

### Requirement: System-Wide Metrics Aggregation
The system SHALL calculate aggregate metrics across all tutors and sessions for dashboard display.

#### Scenario: Calculate total tutors
- **GIVEN** 75 tutors exist in the system
- **WHEN** system metrics are calculated
- **THEN** totalTutors SHALL equal 75

#### Scenario: Calculate total sessions
- **GIVEN** 3,124 sessions exist in the system
- **WHEN** system metrics are calculated
- **THEN** totalSessions SHALL equal 3,124

#### Scenario: Calculate system average rating
- **GIVEN** all sessions across all tutors
- **WHEN** system average rating is calculated
- **THEN** it SHALL be the mean of all session ratings
- **AND** it SHALL be rounded to one decimal place

#### Scenario: Calculate active tutors
- **GIVEN** the current date is 2024-01-15
- **AND** 60 tutors have sessions in the past 30 days
- **WHEN** active tutors metric is calculated
- **THEN** activeTutors SHALL equal 60
- **AND** a tutor is active if they have at least one session with date >= 2023-12-16

### Requirement: Metrics Enrichment
The system SHALL enrich tutor profiles with calculated metrics for efficient display and analysis.

#### Scenario: Enrich tutors with metrics
- **GIVEN** raw tutor data and session data
- **WHEN** `enrichTutorsWithMetrics(tutors, sessions)` is called
- **THEN** each tutor object SHALL be updated with calculated metrics
- **AND** original tutor data SHALL remain intact
- **AND** the enriched data SHALL be ready for UI display

#### Scenario: Handle missing sessions
- **GIVEN** a tutor has no sessions in the dataset
- **WHEN** metrics are calculated
- **THEN** avgRating SHALL be 0 or null
- **AND** totalSessions SHALL be 0
- **AND** rates and counts SHALL be 0
- **AND** the system SHALL NOT throw an error


## ADDED Requirements

### Requirement: AI Pattern Analysis
The system SHALL provide an API endpoint that analyzes patterns across all tutors using OpenAI.

#### Scenario: Successful pattern analysis
- **WHEN** POST request is made to `/api/analyze-patterns`
- **THEN** the system SHALL analyze all tutor data and generate structured insights about common patterns

#### Scenario: First session pattern detection
- **WHEN** pattern analysis is performed
- **THEN** the system SHALL identify patterns related to poor first session experiences

#### Scenario: Risk factor identification
- **WHEN** pattern analysis is performed
- **THEN** the system SHALL identify common characteristics of at-risk tutors

#### Scenario: System recommendation generation
- **WHEN** patterns are identified
- **THEN** the system SHALL generate actionable system-wide recommendations to address the patterns

#### Scenario: Insights persistence
- **WHEN** pattern analysis completes
- **THEN** the system SHALL save insights to `/data/insights.json` with a timestamp

### Requirement: Tutor-Specific Recommendations
The system SHALL generate and display actionable recommendations for at-risk tutors.

#### Scenario: Recommendation generation for at-risk tutors
- **WHEN** generating recommendations
- **THEN** the system SHALL create 2-4 specific, actionable recommendations for each medium and high-risk tutor

#### Scenario: Low-risk tutor exclusion
- **WHEN** a tutor has risk score "low"
- **THEN** the system SHALL NOT generate recommendations for that tutor

#### Scenario: Recommendation prioritization
- **WHEN** generating recommendations
- **THEN** each recommendation SHALL include a priority level (high/medium) based on impact and urgency

#### Scenario: Recommendation categories
- **WHEN** recommendations are generated
- **THEN** they SHALL be categorized by type (first_session, reliability, engagement, profile)

#### Scenario: Recommendation persistence
- **WHEN** recommendations are generated
- **THEN** the system SHALL save them to the tutor's record in tutors.json

### Requirement: Recommendations Display
The system SHALL display tutor-specific recommendations in the tutor table.

#### Scenario: Recommendations for medium-risk tutor
- **WHEN** viewing a medium-risk tutor in the table
- **THEN** the system SHALL display a recommendations indicator showing the count of recommendations

#### Scenario: Recommendations for high-risk tutor
- **WHEN** viewing a high-risk tutor in the table
- **THEN** the system SHALL display a recommendations indicator showing the count of recommendations

#### Scenario: Recommendations for low-risk tutor
- **WHEN** viewing a low-risk tutor in the table
- **THEN** the system SHALL NOT display recommendations or SHALL show "No recommendations - performing well"

#### Scenario: Viewing recommendation details
- **WHEN** a user interacts with the recommendations indicator (click or expand)
- **THEN** the system SHALL display the full list of recommendations with priority and reasoning

#### Scenario: Recommendation visual design
- **WHEN** displaying recommendations
- **THEN** high-priority recommendations SHALL be visually distinguished from medium-priority ones

#### Scenario: Missing recommendations
- **WHEN** an at-risk tutor has no recommendations generated
- **THEN** the system SHALL display a message indicating recommendations are pending or unavailable

### Requirement: Recommendations Data Model
The system SHALL extend the tutor data model to include recommendations.

#### Scenario: Tutor with recommendations
- **WHEN** a tutor has generated recommendations
- **THEN** the tutor data SHALL include a `recommendations` array with objects containing: id, priority, category, action, and reasoning

#### Scenario: Tutor without recommendations
- **WHEN** a tutor has no recommendations
- **THEN** the `recommendations` field SHALL be an empty array or null


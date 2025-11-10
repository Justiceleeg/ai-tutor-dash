# tutor-list-ui Specification

## Purpose
TBD - created by archiving change add-project-foundation-mock-data. Update Purpose after archive.
## Requirements
### Requirement: Tutor List Display
The system SHALL display all tutor profiles in a tabular format for easy browsing and overview.

#### Scenario: Display tutor table
- **GIVEN** tutor data has been generated
- **WHEN** a user navigates to `/tutors`
- **THEN** a table SHALL display all tutors
- **AND** the table SHALL show columns: ID, Name, Email, Join Date, Total Sessions
- **AND** the table SHALL be responsive on different screen sizes

#### Scenario: Format tutor data
- **GIVEN** a tutor with joinDate "2023-06-15T00:00:00.000Z" is displayed
- **WHEN** the table renders
- **THEN** the date SHALL be formatted as a human-readable string (e.g., "Jun 15, 2023")
- **AND** numeric fields SHALL display with appropriate formatting

#### Scenario: Handle empty data
- **GIVEN** no tutor data exists
- **WHEN** the tutors page loads
- **THEN** a message SHALL display "No tutors found"
- **OR** an empty state component SHALL be shown

### Requirement: Page Layout
The system SHALL provide clear navigation and context for the tutor list view.

#### Scenario: Page title and description
- **GIVEN** a user is on the tutors list page
- **WHEN** the page renders
- **THEN** a page title "Tutors" SHALL be displayed
- **AND** a description or subtitle MAY provide context

#### Scenario: Navigation to tutor list
- **GIVEN** a user is on the home page
- **WHEN** they view the page
- **THEN** a link or button to view all tutors SHALL be available
- **AND** clicking it SHALL navigate to `/tutors`

### Requirement: Table Accessibility
The system SHALL ensure the tutor table is accessible to all users including those using assistive technologies.

#### Scenario: Semantic HTML structure
- **GIVEN** the tutor table is rendered
- **WHEN** the HTML is generated
- **THEN** proper table elements SHALL be used (table, thead, tbody, tr, th, td)
- **AND** column headers SHALL be marked with th elements
- **AND** the table SHALL have appropriate ARIA labels if needed

#### Scenario: Keyboard navigation
- **GIVEN** a user is navigating with keyboard
- **WHEN** they use tab key on the tutors page
- **THEN** they SHALL be able to navigate through interactive elements
- **AND** focus indicators SHALL be clearly visible

### Requirement: AI Risk Score Generation
The system SHALL provide an API endpoint that generates AI-powered risk scores for tutors using OpenAI.

#### Scenario: Successful risk score generation
- **WHEN** POST request is made to `/api/generate-risk-scores`
- **THEN** the system SHALL process all tutors and assign risk scores (low/medium/high) with AI-generated reasoning

#### Scenario: OpenAI API integration
- **WHEN** generating a risk score for a tutor
- **THEN** the system SHALL send tutor performance metrics (avgRating, firstSessionSuccessRate, rescheduleRate, noShowCount, currentStudentCount, supportTicketCount, profileCompletionRate) to OpenAI

#### Scenario: Risk score persistence
- **WHEN** risk scores are generated
- **THEN** the system SHALL save `riskScore`, `riskReasoning`, and `riskScoreGeneratedAt` to the tutor data

#### Scenario: Missing OpenAI API key
- **WHEN** the OPENAI_API_KEY environment variable is not set
- **THEN** the API SHALL return an error indicating the missing configuration

### Requirement: Risk Score Display
The system SHALL display tutor risk scores in the tutor list with visual indicators.

#### Scenario: Low risk tutor display
- **WHEN** viewing a tutor with risk score "low"
- **THEN** the system SHALL display a green indicator with the risk level

#### Scenario: Medium risk tutor display
- **WHEN** viewing a tutor with risk score "medium"
- **THEN** the system SHALL display a yellow indicator with the risk level

#### Scenario: High risk tutor display
- **WHEN** viewing a tutor with risk score "high"
- **THEN** the system SHALL display a red indicator with the risk level

#### Scenario: Risk reasoning access
- **WHEN** a user interacts with a risk score indicator (hover or click)
- **THEN** the system SHALL display the AI-generated reasoning for that risk assessment

#### Scenario: Missing risk score
- **WHEN** viewing a tutor without a risk score
- **THEN** the system SHALL display a neutral indicator showing "Not assessed" or similar placeholder

### Requirement: Risk Score Data Model
The system SHALL extend the tutor data model to include risk assessment data.

#### Scenario: Tutor with risk assessment
- **WHEN** a tutor has been risk-assessed
- **THEN** the tutor data SHALL include `riskScore` ('low' | 'medium' | 'high'), `riskReasoning` (string), and `riskScoreGeneratedAt` (ISO timestamp)

#### Scenario: Tutor without risk assessment
- **WHEN** a tutor has not been risk-assessed
- **THEN** the risk fields SHALL be optional or null

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


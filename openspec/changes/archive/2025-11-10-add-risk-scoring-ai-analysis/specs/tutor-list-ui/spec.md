## ADDED Requirements

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


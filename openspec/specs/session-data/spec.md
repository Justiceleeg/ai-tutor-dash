# session-data Specification

## Purpose
TBD - created by archiving change add-session-metrics-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Session Data Generation
The system SHALL generate realistic mock session records representing tutor-student interactions to enable performance analysis.

#### Scenario: Generate session dataset
- **GIVEN** tutor data has been generated
- **WHEN** the session generation process runs
- **THEN** approximately 3,000 session records SHALL be created
- **AND** sessions SHALL be distributed across all tutors
- **AND** each session SHALL have a unique ID

#### Scenario: Link sessions to tutors
- **GIVEN** a session is being generated
- **WHEN** the tutorId field is assigned
- **THEN** it SHALL reference a valid tutor ID from the tutors dataset
- **AND** every tutor SHALL have at least one session
- **AND** session distribution SHALL be somewhat realistic (not perfectly uniform)

#### Scenario: Generate session ratings
- **GIVEN** a session is being created
- **WHEN** the rating is assigned
- **THEN** it SHALL be an integer between 1 and 5 (inclusive)
- **AND** ratings SHALL be weighted toward positive values (3-5 stars more common)
- **AND** the distribution SHALL include some low ratings for realism

#### Scenario: Mark first sessions
- **GIVEN** sessions are being generated for a tutor
- **WHEN** the isFirstSession flag is set
- **THEN** approximately 10-15% of sessions SHALL be marked as first sessions
- **AND** each tutor SHALL have at least one first session

#### Scenario: Simulate session issues
- **GIVEN** a session is being created
- **WHEN** status flags are assigned
- **THEN** a small percentage SHALL be marked as wasRescheduled (5-10%)
- **AND** a smaller percentage SHALL be marked as wasNoShow (2-5%)
- **AND** a small percentage SHALL be marked as wasCancelled (3-7%)
- **AND** these flags SHALL NOT all be true for the same session

### Requirement: Session Data Persistence
The system SHALL store session data in a structured format for efficient querying and analysis.

#### Scenario: Save session data
- **GIVEN** sessions have been generated
- **WHEN** the generation process completes
- **THEN** all sessions SHALL be written to `/data/sessions.json`
- **AND** the file SHALL be valid JSON
- **AND** dates SHALL be stored as ISO 8601 strings

#### Scenario: Session data structure
- **GIVEN** a session is saved
- **WHEN** the JSON is written
- **THEN** it SHALL include: id, tutorId, studentId, date, rating, duration
- **AND** it SHALL include: isFirstSession, wasRescheduled, wasNoShow, wasCancelled
- **AND** it MAY include an optional feedback field

### Requirement: Session Data Access
The system SHALL provide functions to retrieve and filter session data efficiently.

#### Scenario: Retrieve all sessions
- **GIVEN** session data exists in `/data/sessions.json`
- **WHEN** `getSessions()` is called
- **THEN** all session records SHALL be returned as an array
- **AND** each session SHALL conform to the Session TypeScript interface

#### Scenario: Filter sessions by tutor
- **GIVEN** a tutor with ID "tutor-123" has 45 sessions
- **WHEN** `getSessionsByTutorId("tutor-123")` is called
- **THEN** exactly 45 session records SHALL be returned
- **AND** all returned sessions SHALL have tutorId === "tutor-123"

#### Scenario: Handle missing session data
- **GIVEN** the sessions.json file does not exist
- **WHEN** session access functions are called
- **THEN** an empty array SHALL be returned
- **OR** a helpful error SHALL be thrown

### Requirement: Risk Indicator Tracking
The system SHALL track risk indicators for each session to enable AI-powered risk assessment.

#### Scenario: Session with reschedule
- **WHEN** a session is rescheduled by the tutor
- **THEN** the session SHALL have `wasRescheduled` set to true

#### Scenario: Session with no-show
- **WHEN** a tutor fails to attend a scheduled session
- **THEN** the session SHALL have `wasNoShow` set to true

#### Scenario: Session with cancellation
- **WHEN** a session is cancelled
- **THEN** the session SHALL have `wasCancelled` set to true

#### Scenario: Normal completed session
- **WHEN** a session completes without issues
- **THEN** all risk indicators (`wasRescheduled`, `wasNoShow`, `wasCancelled`) SHALL be false

### Requirement: Risk Indicator Distribution
The system SHALL generate realistic risk indicator patterns that correlate with tutor performance metrics.

#### Scenario: High-risk tutor sessions
- **WHEN** generating sessions for a tutor with high reschedule rate
- **THEN** a proportionally higher number of sessions SHALL have `wasRescheduled` set to true

#### Scenario: Reliable tutor sessions
- **WHEN** generating sessions for a tutor with low no-show count
- **THEN** few or no sessions SHALL have `wasNoShow` set to true

#### Scenario: System-wide distribution
- **WHEN** all sessions are generated
- **THEN** the distribution SHALL reflect realistic tutoring platform patterns (e.g., 5-15% reschedules, 1-3% no-shows, 3-8% cancellations)


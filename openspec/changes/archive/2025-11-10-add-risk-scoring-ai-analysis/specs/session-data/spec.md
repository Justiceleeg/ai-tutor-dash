## ADDED Requirements

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


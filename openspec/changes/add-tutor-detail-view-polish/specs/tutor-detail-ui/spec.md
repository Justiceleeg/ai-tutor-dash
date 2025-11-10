# Tutor Detail UI - Spec Delta

## ADDED Requirements

### Requirement: Individual Tutor Detail Page
The system SHALL provide a dedicated detail page for each tutor accessible via dynamic routing.

#### Scenario: Navigate to tutor detail page
- **WHEN** a user clicks on a tutor's name in the tutor list
- **THEN** the system SHALL navigate to `/tutors/[tutorId]` showing the tutor's detail page

#### Scenario: Display tutor header
- **WHEN** viewing a tutor detail page
- **THEN** the system SHALL display the tutor's name, email, join date, and risk score badge prominently

#### Scenario: Invalid tutor ID
- **WHEN** a user navigates to a detail page with a non-existent tutor ID
- **THEN** the system SHALL display a 404 error page

#### Scenario: Loading state
- **WHEN** a tutor detail page is loading
- **THEN** the system SHALL display skeleton UI matching the final component structure

### Requirement: Comprehensive Metrics Display
The system SHALL display all tutor performance metrics in an organized grid on the detail page.

#### Scenario: Metrics grid display
- **WHEN** viewing a tutor detail page
- **THEN** the system SHALL display all key metrics: average rating, total sessions, first session success rate, current students, reschedule rate, no-shows, support tickets, and profile completion

#### Scenario: Metrics formatting
- **WHEN** displaying metrics
- **THEN** the system SHALL use consistent formatting with color coding for performance levels (same as table view)

### Requirement: Risk Analysis Section
The system SHALL display comprehensive risk analysis with AI reasoning on the detail page.

#### Scenario: Display risk analysis
- **WHEN** viewing a detail page for a tutor with a risk score
- **THEN** the system SHALL display the full AI-generated risk reasoning

#### Scenario: Display recommendations
- **WHEN** viewing a detail page for an at-risk tutor (medium/high)
- **THEN** the system SHALL display all recommendations with priority levels, categories, actions, and reasoning

#### Scenario: Low-risk tutor
- **WHEN** viewing a detail page for a low-risk tutor
- **THEN** the system SHALL display a positive message indicating no recommendations needed

### Requirement: Session Timeline Visualization
The system SHALL provide a timeline view of all sessions for the tutor with performance trends.

#### Scenario: Rating trend chart
- **WHEN** viewing a tutor with sessions
- **THEN** the system SHALL display a line chart showing rating trends over time using Recharts

#### Scenario: Chronological session list
- **WHEN** viewing the session timeline
- **THEN** the system SHALL display sessions in reverse chronological order (newest first)

#### Scenario: Session status indicators
- **WHEN** displaying sessions in the timeline
- **THEN** the system SHALL highlight first sessions, reschedules, no-shows, and cancellations with visual indicators

#### Scenario: Session details
- **WHEN** viewing a session in the timeline
- **THEN** the system SHALL display the date, rating, duration, and status flags for each session

#### Scenario: Empty session history
- **WHEN** viewing a tutor with no sessions
- **THEN** the system SHALL display a message indicating no session history is available

### Requirement: Breadcrumb Navigation
The system SHALL provide breadcrumb navigation for easy traversal back to the tutor list.

#### Scenario: Breadcrumb display
- **WHEN** viewing a tutor detail page
- **THEN** the system SHALL display breadcrumbs: "Dashboard / Tutors / [Tutor Name]"

#### Scenario: Breadcrumb navigation
- **WHEN** a user clicks on a breadcrumb link
- **THEN** the system SHALL navigate to the corresponding page

### Requirement: Responsive Design
The system SHALL ensure the tutor detail page is fully responsive across all device sizes.

#### Scenario: Mobile layout
- **WHEN** viewing the detail page on a mobile device (≤768px width)
- **THEN** the system SHALL stack all sections vertically and adjust chart sizing appropriately

#### Scenario: Tablet layout
- **WHEN** viewing the detail page on a tablet (768-1024px width)
- **THEN** the system SHALL use an optimized 2-column grid for metrics where appropriate

#### Scenario: Desktop layout
- **WHEN** viewing the detail page on desktop (>1024px width)
- **THEN** the system SHALL use the full layout with charts and content side-by-side where appropriate


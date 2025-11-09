# dashboard-ui Specification

## Purpose
TBD - created by archiving change add-session-metrics-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Dashboard Summary Metrics
The system SHALL display key performance indicators in a clear, scannable format on the main dashboard.

#### Scenario: Display metric cards
- **GIVEN** system metrics have been calculated
- **WHEN** the dashboard page loads
- **THEN** four metric cards SHALL be displayed:
  - Total Tutors
  - Total Sessions
  - Average Rating
  - Active Tutors (last 30 days)
- **AND** cards SHALL be arranged in a responsive grid layout
- **AND** each card SHALL show a title and large numeric value

#### Scenario: Format metric values
- **GIVEN** the average rating is 4.27
- **WHEN** displayed on the dashboard
- **THEN** it SHALL show as "4.3" with one decimal place
- **AND** it MAY include a star icon for visual clarity

#### Scenario: Highlight important metrics
- **GIVEN** metric cards are displayed
- **WHEN** rendered
- **THEN** values SHALL be prominent and easy to read
- **AND** positive trends MAY be indicated with color or icons
- **AND** the design SHALL be clean and uncluttered

### Requirement: Rating Distribution Visualization
The system SHALL visualize the distribution of session ratings across the platform to identify performance trends.

#### Scenario: Display rating chart
- **GIVEN** sessions with various ratings exist
- **WHEN** the dashboard page loads
- **THEN** a bar chart SHALL display rating distribution
- **AND** the X-axis SHALL show rating values (1-5 stars)
- **AND** the Y-axis SHALL show count or percentage of sessions
- **AND** each bar SHALL be clearly labeled

#### Scenario: Chart interactivity
- **GIVEN** the rating distribution chart is displayed
- **WHEN** a user hovers over a bar
- **THEN** a tooltip SHALL show the exact count and percentage
- **AND** the interaction SHALL feel responsive

#### Scenario: Responsive chart sizing
- **GIVEN** the dashboard is viewed on different devices
- **WHEN** the screen size changes
- **THEN** the chart SHALL resize appropriately
- **AND** labels SHALL remain readable
- **AND** the chart SHALL maintain its aspect ratio

### Requirement: Dashboard Navigation
The system SHALL provide clear paths to detailed views from the dashboard.

#### Scenario: Navigate to tutors list
- **GIVEN** a user is on the dashboard
- **WHEN** they view the page
- **THEN** a link or button to "View All Tutors" SHALL be visible
- **AND** clicking it SHALL navigate to `/tutors`

#### Scenario: Dashboard page title
- **GIVEN** a user lands on the dashboard
- **WHEN** the page loads
- **THEN** the title "Tutor Quality Dashboard" SHALL be displayed
- **AND** it MAY include a subtitle or description

### Requirement: Dashboard Performance
The system SHALL render the dashboard quickly even with thousands of session records.

#### Scenario: Fast initial load
- **GIVEN** the dashboard has 3,000+ sessions to process
- **WHEN** a user navigates to the dashboard
- **THEN** the page SHALL load within 2 seconds
- **AND** metrics SHALL be pre-calculated or cached
- **AND** no client-side blocking calculations SHALL occur

#### Scenario: Efficient data loading
- **GIVEN** the dashboard requires tutor and session data
- **WHEN** the page component loads
- **THEN** data SHALL be fetched on the server (Next.js server component)
- **AND** only necessary data SHALL be sent to the client


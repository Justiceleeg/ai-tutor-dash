## ADDED Requirements

### Requirement: System-Wide Insights Display
The system SHALL display AI-generated pattern insights on the dashboard to help identify systemic issues.

#### Scenario: Display first session failure patterns
- **WHEN** viewing the dashboard with generated insights
- **THEN** the system SHALL display 2-5 key patterns related to first session failures

#### Scenario: Display common risk factors
- **WHEN** viewing the dashboard with generated insights
- **THEN** the system SHALL display 2-5 common risk factors identified across tutors

#### Scenario: Display system recommendations
- **WHEN** viewing the dashboard with generated insights
- **THEN** the system SHALL display 1-3 system-wide recommendations for addressing identified patterns

#### Scenario: Insights timestamp
- **WHEN** insights are displayed
- **THEN** the system SHALL show when the insights were generated

#### Scenario: Missing insights
- **WHEN** insights have not been generated
- **THEN** the system SHALL display a message indicating insights are unavailable and optionally provide a way to generate them

### Requirement: Insights Panel Component
The system SHALL provide a dedicated component for displaying pattern insights on the dashboard.

#### Scenario: Insights panel layout
- **WHEN** the insights panel is rendered
- **THEN** it SHALL organize insights into clear categories (first session failures, risk factors, system recommendations)

#### Scenario: Visual hierarchy
- **WHEN** displaying multiple insights
- **THEN** critical patterns SHALL be emphasized more than secondary insights

#### Scenario: Responsive design
- **WHEN** viewed on different screen sizes
- **THEN** the insights panel SHALL maintain readability and proper layout


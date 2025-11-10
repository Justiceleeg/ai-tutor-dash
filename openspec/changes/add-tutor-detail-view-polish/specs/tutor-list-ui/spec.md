# Tutor List UI - Spec Delta

## ADDED Requirements

### Requirement: Clickable Tutor Names
The system SHALL make tutor names in the list clickable to navigate to detail pages.

#### Scenario: Tutor name as link
- **WHEN** viewing the tutor list
- **THEN** each tutor's name SHALL be rendered as a clickable link

#### Scenario: Navigate on click
- **WHEN** a user clicks on a tutor's name
- **THEN** the system SHALL navigate to that tutor's detail page at `/tutors/[tutorId]`

#### Scenario: Visual indication
- **WHEN** hovering over a tutor's name
- **THEN** the system SHALL display visual feedback (e.g., underline, color change) to indicate it is clickable

### Requirement: Tutor List Filtering
The system SHALL provide filtering capabilities to segment and explore the tutor list.

#### Scenario: Risk level filter
- **WHEN** a user selects a risk level filter (Low, Medium, High)
- **THEN** the system SHALL display only tutors matching that risk level

#### Scenario: Rating range filter
- **WHEN** a user applies a rating range filter
- **THEN** the system SHALL display only tutors with average ratings in that range

#### Scenario: First session success filter
- **WHEN** a user applies a first session success rate filter
- **THEN** the system SHALL display only tutors meeting the success rate criteria

#### Scenario: Support ticket filter
- **WHEN** a user applies a support ticket count filter
- **THEN** the system SHALL display only tutors matching the ticket count criteria

#### Scenario: Profile completion filter
- **WHEN** a user applies a profile completion filter
- **THEN** the system SHALL display only tutors meeting the completion threshold

#### Scenario: Multiple filters active
- **WHEN** multiple filters are applied simultaneously
- **THEN** the system SHALL display tutors matching ALL active filter criteria (AND logic)

#### Scenario: Clear filters
- **WHEN** a user clicks the "Clear Filters" button
- **THEN** the system SHALL remove all active filters and display the full tutor list

#### Scenario: Active filter count
- **WHEN** filters are applied
- **THEN** the system SHALL display the number of active filters

#### Scenario: No matching tutors
- **WHEN** filters result in no matching tutors
- **THEN** the system SHALL display a message indicating no tutors match the criteria

### Requirement: Filter UI Component
The system SHALL provide an intuitive filter interface for the tutor list.

#### Scenario: Filter panel display
- **WHEN** viewing the tutor list page
- **THEN** the system SHALL display a filter panel above or beside the tutor table

#### Scenario: Filter options visibility
- **WHEN** the filter panel is displayed
- **THEN** all available filter options SHALL be clearly visible and labeled

#### Scenario: Filter state persistence
- **WHEN** a user applies filters and scrolls the page
- **THEN** the filter selections SHALL remain active and visible

### Requirement: Loading States for List
The system SHALL display loading states while fetching or filtering tutor data.

#### Scenario: Initial load
- **WHEN** the tutor list page is first loading
- **THEN** the system SHALL display skeleton UI for the table

#### Scenario: Filter application
- **WHEN** filters are being applied (if any async operations)
- **THEN** the system SHALL indicate processing with loading indicators

### Requirement: Empty States
The system SHALL provide helpful empty state messages for various scenarios.

#### Scenario: No tutors found
- **WHEN** no tutors exist in the system
- **THEN** the system SHALL display a message indicating no tutors are available and suggest next steps

#### Scenario: Filtered to zero results
- **WHEN** active filters result in no matching tutors
- **THEN** the system SHALL display a message suggesting filter adjustment


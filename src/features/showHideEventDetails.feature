
Feature: Show/Hide an Event’s Details

    Scenario: An event element is collapsed by default.
    Given the list of events is open
    When the user scrolls though the list of events
    Then the event details should be hidden

    Scenario: User can expand an event to see its details.
    Given the list of events should be open
    When the user clicks on show button
    Then the user should be shown the clicked event details

    Scenario: User can collapse an event to hide its details.
    Given the event details are shown
    When the user clicks on hide button
    Then the event details should be hidden

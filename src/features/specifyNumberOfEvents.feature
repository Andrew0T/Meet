
Feature: Specify Number of Events

    Scenario: When user has not specified a number, 32 is the default number.
    Given the user has not specified the number of events
    When the user opens the app
    Then the user should see a list of 32 events by default

    Scenario: User can change the number of events they want to see.
    Given the list of events is open
    When the user changes the number of events to be displayed
    Then the user is shown the choosen number of events

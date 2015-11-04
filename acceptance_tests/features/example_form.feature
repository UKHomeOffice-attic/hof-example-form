Feature: I am able to navigate through my example form

  Scenario: I am able to navigate through my example form
    Given I am on the start page for the form
    Then I can see the questions for the first page of the form
    When I complete the first page of the form incorrectly
    Then I am presented with validation errors for the first page
    When I complete the first page of the form correctly
    Then I am taken to the second page of the form
    When I complete the second page of the form correctly
    Then I am taken to the summary page
    When I confirm that my details are correct
    Then I am informed about what will happen next
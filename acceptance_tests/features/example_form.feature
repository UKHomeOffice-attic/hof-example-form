Feature: I am able to navigate through my example form

  Scenario: I am able to navigate through my example form
    Given I am on the start page for the form
    Then I can see the questions for the first page of the form
    When I complete the first page of the form incorrectly
    Then I am presented with validation errors for the first page
    When I complete the first page of the form correctly
    Then I am taken to the second page of the form
    When I select yes on the radio button
    Then I can see another field appear
    When I select no on the radio button
    Then the hidden field disappears again
    When I click continue
    Then I am taken to the third page of the form
    When I select the yes radio button
    And I click continue
    Then I am presented with an error for the field that is dependent on Yes being selected
    When I select the no radio button
    And I click continue
    Then I am taken to the fourth page
    When I click continue
    Then I am presented with my custom validation errors
    When I fill out the fields correctly
    And click continue
    Then I am taken to the summary page
    When I confirm that my details are correct
    Then I am informed about what will happen next
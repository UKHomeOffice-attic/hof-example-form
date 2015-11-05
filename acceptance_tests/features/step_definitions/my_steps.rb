Given(/^I am on the start page for the form$/) do
  visit config['example_app_host']
end

Then(/^I can see the questions for the first page of the form$/) do
  expect(page).to have_content 'Step 1 of '
  expect(page).to have_content 'Example radio buttons'
  expect(page).to have_content 'Example date group'
  expect(page).to have_content 'Example text input'
  expect(page).to have_content 'Example text input with validation for email address'
  expect(page).to have_content 'Example checkbox'
end

When(/^I complete the first page of the form incorrectly$/) do
  fill_in "example-dob-day", :with => 'ff'
  fill_in "example-dob-month", :with => 'ff'
  fill_in "example-dob-year", :with => 'ff'
  fill_in "example-email", :with => 'notvalid'
  click_button("Continue")
end

Then(/^I am presented with validation errors for the first page$/) do
  expect(page).to have_content 'Tell us which is your favourite superhero'
  expect(page).to have_content 'Date must only contain numbers'
  expect(page).to have_content 'Enter your favourite colour'
  expect(page).to have_content 'The email address isn\'t valid, enter a valid email address'
end

When(/^I complete the first page of the form correctly$/) do
  find_by_id('example-radio-superman').click
  fill_in "example-dob-day", :with => '10'
  fill_in "example-dob-month", :with => '10'
  fill_in "example-dob-year", :with => '1980'
  fill_in "example-email", :with => 'valid@valid.woohoo'
  fill_in "example-text", :with => 'Brown'
  click_button("Continue")
end

Then(/^I am taken to the second page of the form$/) do
  expect(page).to have_content 'Step 2 of '
  expect(page).to have_content 'What is your favourite superhero?'
  expect(page).to have_content 'When was this superhero born?'
end
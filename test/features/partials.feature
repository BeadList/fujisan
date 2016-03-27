Feature: Partials

Scenario: Partials usage in ejs
  Given a fixture app "partials"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/muscle.html
  ---
  And the contents of it should be:
  ---
  <p>
    Quote:
    <q>Oh, I see. You want to take things slow.</q>
  </p>
  ---

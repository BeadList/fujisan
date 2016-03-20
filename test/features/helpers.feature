Feature: Pages


Scenario: Simple helpers usage
  Given a fixture app "helpers"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/index.html
  ---
  And the contents of it should be:
  ---
  <h1>hi</h1>
  <p>there</p>

  ---

Scenario: block helpers usage
  Given a fixture app "helpers"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/wrapped.html
  ---
  And the contents of it should be:
  ---
  <strong>hello</strong><div class="wrapped">  <p>there</p>
  </div>
  ---

Feature: Helpers

Scenario: Helpers usage in ejs
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

@smoke
Scenario: Helpers usage in handlebars
  Given a fixture app "helpers"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/wrapped.html
  ---
  And the contents of it should be:
  ---
  <h1>hola</h1>
  <strong>hello</strong><div class="wrapped">  <p>there</p>
  </div>
  ---


Scenario: Helpers usage in jade
  Given a fixture app "helpers"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/jungle.html
  ---
  And the contents of it should be:
  ---
  <h1>Princess Jungle</h1><h2>
  was in "What is life?"</h2>
  ---

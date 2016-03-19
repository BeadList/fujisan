Feature: Pages

Scenario: Compile simple file
  Given a fixture app "stylesheets"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/stylesheets/main.css
  ---
  And the contents of it should be:
  ---
  .header {
    color: red; }

  ---

Scenario: Compile file with imports
  Given a fixture app "stylesheets"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/stylesheets/has-imports.css
  ---
  And the contents of it should be:
  ---
  .header {
    color: blue; }

  ---

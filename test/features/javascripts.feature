Feature: Pages

@Focus
Scenario: Compile simple file
  Given a fixture app "javascripts"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/javascripts/main.js
  ---
  And the contents of it should be:
  ---
  (function() {
    (function() {
      return console.log('hi');
    });
   
  }).call(this);

  ---

Feature: JavaScripts

Scenario: Compile simple file
  Given a fixture app "javascripts"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/javascripts/main.js
  ---
  And the contents of it should be:
  ---
  'use strict';

  (function () {
    (function () {
      return console.log('hi');
    });
  }).call(undefined);
  ---

Scenario: Compile with babel
  Given a fixture app "javascripts"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/javascripts/babel-example.js
  ---
  And the contents of it should be:
  ---
  "use strict";
  
  var q = 50;
  var myVariable = q + " cents";
  ---

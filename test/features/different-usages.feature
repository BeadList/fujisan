Feature: Pages

Scenario: Simple one everything included
  Given a fixture app "different-usages"
  When I run "gulp --gulpfile=simple.js --tasks-simple"
  Then it outputs:
  ---
  fuji:build:public
  fuji:build:pages
  fuji:build:stylesheets
  fuji:build:javascripts
  fuji:build
  fuji
  default

  ---

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

Scenario: Use different prefix
  Given a fixture app "different-usages"
  When I run "gulp --gulpfile=with-prefix.js --tasks-simple"
  Then it outputs:
  ---
  bravo:build:public
  bravo:build:pages
  bravo:build:stylesheets
  bravo:build:javascripts
  bravo:build
  bravo
  default

  ---

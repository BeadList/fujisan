Feature: Copying public files

Scenario: Copy default public path
  Given a fixture app "public"
  When I run "gulp fuji:build"
  Then the following files should exist:
  ---
  build/robots.txt
  ---

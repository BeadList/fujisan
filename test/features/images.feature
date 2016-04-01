Feature: Images

Scenario: Copy images to buld
  Given a fixture app "images"
  When I run "gulp fuji:build"
  Then the following files should exist:
  ---
  build/images/mount.jpg
  ---

Feature: Pug

@focus
Scenario: Extends and includes
  Given a fixture app "pug"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/sigiriya.html
  ---
  And the contents of it should be:
  ---
  <!DOCTYPE html><html><head><title>Sigiriya</title></head><body><h1>Sigiriya</h1><p>Sigiriya today is a UNESCO listed World Heritage Site. It is one of the
  best preserved examples of ancient urban planning. It is the most
  visited historic site in Sri Lanka.</p></body></html>
  ---

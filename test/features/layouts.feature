Feature: Layouts

Scenario: Layouts usage in ejs
  Given a fixture app "layouts"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/pilcrow.html
  ---
  And the contents of it should be:
  ---
  <html>
    <body>
      <h1>¶</h1>

    </body>
  </html>
  ---

Scenario: Layouts usage in jade
  Given a fixture app "layouts"
  When I run "gulp fuji:build --gulpfile=with-header.js"
  Then the following file should exist:
  ---
  build/obelus.html
  ---
  And the contents of it should be:
  ---
  <html><body><header>Marks</header><h1>÷</h1></body></html>
  ---

Scenario: Layouts usage in handlebars
  Given a fixture app "layouts"
  When I run "gulp fuji:build --gulpfile=with-footer.js"
  Then the following file should exist:
  ---
  build/tie.html
  ---
  And the contents of it should be:
  ---
  <html>
    <body>
      <h1>⁀</h1>
  
    </body>
  </html>
  ---

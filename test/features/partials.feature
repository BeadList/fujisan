Feature: Partials

Scenario: Partials usage in ejs
  Given a fixture app "partials"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/muscle.html
  ---
  And the contents of it should be:
  ---
  <h1>Princess</h1>


  <p>
    Quote:
    <q>Oh, I see. You want to take things slow.</q>

    Info:
    <strong>Her phone looks like a dumbbell with the tips twisted to shape like a real phone.</strong>
    Appearances:
  </p>
  <ul>
    <li>What is Life?</li>
    <li>Loyalty to the King</li>
    <li>To Cut a Woman&#x27;s Hair</li>
    <li>Princess Monster Wife</li>
    <li>Princess Potluck</li>
    <li>Betty</li>
    <li>Breezy</li>
    <li>Princess Day</li>
  </ul>
  ---

Scenario: Partials usage in jade
  Given a fixture app "partials"
  When I run "gulp fuji:build"
  Then the following file should exist:
  ---
  build/ghost.html
  ---
  And the contents of it should be:
  ---
  <h1>Princess</h1>
  <p>Quote:<q>I&#39;m really nervous right now... I-I just really want to meet a nice king.</q>
  Info:<strong>Her phone consists of five floating squares.</strong>Appearances:</p><ul>
    <li>Prisoners of Love</li>
    <li>Loyalty to the King</li>
    <li>Ghost Princess</li>
    <li>Hitman</li>
    <li>Princess Monster Wife</li>
    <li>What is Life?</li>
  </ul>
  ---

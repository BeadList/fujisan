/*global require, featureFile, scenarios, steps, process */
var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();
new Yadda.FeatureFileSearch('./test/features').each(function(file) {
  var focused = process.env.FOCUS;
  featureFile(file, function(feature) {

    var library = require('./steps/default-steps');
    var yadda = Yadda.createInstance(library, { context: {} });
    scenarios(feature.scenarios, function(scenario) {
      if (focused && !scenario.annotations.focus){
        return;
      }
      steps(scenario.steps, function(step, done) {
        yadda.run(step, done);
      });
    });
  });
});

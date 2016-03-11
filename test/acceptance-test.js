var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();
new Yadda.FeatureFileSearch('./test/features').each(function(file) {

  featureFile(file, function(feature) {

    var library = require('./steps/default-steps');
    var yadda = Yadda.createInstance(library, { context: {} });

    scenarios(feature.scenarios, function(scenario) {
      steps(scenario.steps, function(step, done) {
        yadda.run(step, done);
      });
    });
  });
});

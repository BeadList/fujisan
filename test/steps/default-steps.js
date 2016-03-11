var exec = require('child_process').exec;
var fs = require('fs');
var process = require('process');
var expect =  require('chai').expect;

_ = require('lodash');
var English = require('yadda').localisation.English;

module.exports = English.library()
  .given('a fixture app "$APP"', function(app, next) {
    this.context.fixtureApp = app;
    process.chdir('./test/fixtures/' + app);
    next();
  })
  .when('I run "$COMMAND"', function(command, next) {
    exec(command,  function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      }
      next(error);
    });
  })
  .then('the following files should exist:\n((.|\n)+)', function(files, na,next) {
    _.forEach(files.split('\n'), function(file) {
      expect(fs.existsSync(file)).to.be.true;
    });
    next();
  });

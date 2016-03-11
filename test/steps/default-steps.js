var exec = require('child_process').exec;
var fs = require('fs-extra');
var process = require('process');
var expect =  require('chai').expect;

var _ = require('lodash');
var English = require('yadda').localisation.English;

var TEMP = 'temp';
module.exports = English.library()
  .given('a fixture app "$APP"', function(app, next) {
    var testFixture = './test/fixtures/' + app;
    var tempFixture = './temp/fixtures/' + app;
    fs.removeSync(tempFixture);
    fs.copySync(testFixture, tempFixture);
    process.chdir(tempFixture);
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

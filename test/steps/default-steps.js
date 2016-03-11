var thenifyAll = require('thenify-all');
var exec = require('mz/child_process').exec;
var fs =  thenifyAll(require('fs-extra'), {}, [
  'remove',
  'copy',
  'exists'
]);
var process = require('process');
var expect =  require('chai').expect;

var _ = require('lodash');
var English = require('yadda').localisation.English;

var TEMP = 'temp';
module.exports = English.library()
  .given('a fixture app "$APP"', function(app, next) {
    var testFixture = './test/fixtures/' + app;
    var tempFixture = './temp/fixtures/' + app;

    fs.remove(tempFixture)
      .then(function(){
        return fs.copy(testFixture, tempFixture);
      })
      .then(function(){
        process.chdir(tempFixture);
        next();
      })
      .catch(next);

  })
  .when('I run "$COMMAND"', function(command, next) {
    exec(command).then(function (stdout, stderr) {
      next();
    }).catch(next);
  })
  .then('the following files should exist:\n((.|\n)+)', function(files, na,next) {
    // HACK: use promises
    _.forEach(files.split('\n'), function(file) {
      expect(fs.existsSync(file)).to.be.true;
    });
    next();
  });

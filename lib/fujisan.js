/*global module, require, __dirname */

var config = require('./default-config');

var options = { config: config };

var rawBuild = require('require-dir')(__dirname + '/build', { recurse: true });

var build = {};

Object.keys(rawBuild).forEach(function (k) {
  build[k] = rawBuild[k](options);
});

var combiner = require('stream-combiner2').obj;

var buildTask = function(name, options) {
  var gulp = options.gulp;

  gulp.task('fuji:build:' + name, function() {
    var streams = build[name].slice();
    streams.unshift(gulp.src(config.paths.source[name]));
    streams.push(gulp.dest(config.paths.build[name]));
    return combiner(streams);
  });
}

var fujisan = function(options) {
  var gulp = options.gulp;
  var config = config;

  buildTask('public', options);
  buildTask('pages', options);
  buildTask('stylesheets', options);
  buildTask('javascripts', options);

  gulp.task('fuji:build', [
    'fuji:build:public',
    'fuji:build:pages',
    'fuji:build:stylesheets',
    'fuji:build:javascripts'
  ]);
};

module.exports = fujisan;

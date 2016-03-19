/*global module, require, __dirname */

var defaultConfig = require('./default-config');

var options = { config: defaultConfig };

var rawBuild = require('require-dir')(__dirname + '/build', { recurse: true });

var build = {};

Object.keys(rawBuild).forEach(function (k) {
  build[k] = rawBuild[k](options);
});

var combiner = require('stream-combiner2').obj;

var buildTask = function(name, options) {
  var gulp = options.gulp;
  var config = options.config;

  gulp.task(config.prefix + ':build:' + name, function() {
    var streams = build[name].slice();
    streams.unshift(gulp.src(config.paths.source[name]));
    streams.push(gulp.dest(config.paths.build[name]));
    return combiner(streams);
  });
};

var fujisan = function(options) {
  var gulp = options.gulp;
  var config = Object.assign({}, defaultConfig, options.config);

  buildTask('public', { config: config, gulp: gulp });
  buildTask('pages', { config: config, gulp: gulp });
  buildTask('stylesheets', { config: config, gulp: gulp });
  buildTask('javascripts', { config: config, gulp: gulp });

  gulp.task(config.prefix + ':build', [
    config.prefix + ':build:public',
    config.prefix + ':build:pages',
    config.prefix + ':build:stylesheets',
    config.prefix + ':build:javascripts'
  ]);

  gulp.task(config.prefix, [config.prefix + ':build']);
  gulp.task('default', [config.prefix]);
};

module.exports = fujisan;

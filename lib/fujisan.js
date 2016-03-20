/*global module, require, __dirname */

var path = require('path');
var process = require('process');
var requireDir = require('require-dir');
var combiner = require('stream-combiner2').obj;

var defaultConfig = require('./default-config');

var buildStreams = requireDir(__dirname + '/build', { recurse: true });

// HACK: refactor to class and add tests
var fujisan = function(inOptions) {
  fujisan.streams(inOptions);
  var options = fujisan.options;

  var gulp = options.gulp;
  var config = options.config;

  fujisan.makeTask('public', options);
  fujisan.makeTask('pages', options);
  fujisan.makeTask('stylesheets', options);
  fujisan.makeTask('javascripts', options);

  gulp.task(config.prefix + ':build', [
    config.prefix + ':build:public',
    config.prefix + ':build:pages',
    config.prefix + ':build:stylesheets',
    config.prefix + ':build:javascripts'
  ]);

  gulp.task(config.prefix, [config.prefix + ':build']);
  gulp.task('default', [config.prefix]);
};

fujisan.streams = function(inOptions) {
  if(this._streams) {
    return this._streams;
  }
  this._streams = { build: {} };


  this.prepareOptions(inOptions);
  var options = this.options;

  Object.keys(buildStreams).forEach((function (k) {
    this._streams.build[k] = buildStreams[k](options);
  }).bind(this));
  return this._streams;
};

fujisan.prepareOptions = function(options) {
  if (this.options) {
    return;
  }
  var gulp = options.gulp;
  var config = Object.assign({}, defaultConfig, options.config);

  config.cwd = config.cwd || process.cwd();

  var helpers = requireDir(path.join(config.cwd,config.paths.source.helpers));
  this.registerHelpers(helpers, config.build.preprocessors);
  this.options = { config: config, gulp: gulp };
};

fujisan.registerHelpers = function(helpers, preprocessors) {
  preprocessors.all = preprocessors.all || {};
  preprocessors.ejs = preprocessors.ejs || {};
  Object.assign(preprocessors.all.helpers, helpers);
  Object.assign(preprocessors.ejs, helpers);
};

fujisan.makeTask = function(name) {
  var gulp = this.options.gulp;
  var config = this.options.config;

  gulp.task(config.prefix + ':build:' + name, (function() {
    var streams = this.streams().build[name].slice();
    streams.unshift(gulp.src(config.paths.source[name]));
    streams.push(gulp.dest(config.paths.build[name]));
    return combiner(streams);
  }).bind(this));
};


module.exports = fujisan;

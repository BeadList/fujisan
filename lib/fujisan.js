/*global module, require, __dirname */
var fs = require('fs');
var path = require('path');
var process = require('process');
var requireDir = require('require-dir');

var defaultConfig = require('./default-config');

var partial = require('./shame/partial-helper');
var buildStreams = requireDir(__dirname + '/build', { recurse: true });
var PublicExtension = require('./extensions/public-extension');
var PagesExtension = require('./extensions/pages-extension');
var StylesheetsExtension = require('./extensions/stylesheets-extension');
var JavascriptsExtension = require('./extensions/javascripts-extension');
var PartialsExtension = require('./extensions/partials-extension');
var LayoutsExtension = require('./extensions/layouts-extension');
// HACK: refactor to class and add tests
var fujisan = function(inOptions) {
  fujisan.streams(inOptions);
  var options = fujisan.options;

  var gulp = options.gulp;
  var config = options.config;

  var publicExtension = new PublicExtension(options);
  var pagesExtension = new PagesExtension(options);
  var stylesheetsExtension = new StylesheetsExtension(options);
  var javascriptsExtension = new JavascriptsExtension(options);
  var layoutsExtension = new LayoutsExtension(options);
  var partialsExtension = new PartialsExtension(options);

  partialsExtension.registerTasks();
  layoutsExtension.registerTasks();
  publicExtension.registerTasks();
  pagesExtension.registerTasks();
  stylesheetsExtension.registerTasks();
  javascriptsExtension.registerTasks();

  gulp.task(config.prefix + ':build',
            gulp.series(
              gulp.parallel(
                config.prefix + ':build:partials',
                config.prefix + ':build:layouts'
              ),
              gulp.parallel(
                config.prefix + ':build:public',
                config.prefix + ':build:pages',
                config.prefix + ':build:stylesheets',
                config.prefix + ':build:javascripts')
            ));

  gulp.task(config.prefix, gulp.parallel(config.prefix + ':build'));
  gulp.task('default', gulp.parallel(config.prefix));
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

  this.registerHelpers(config);
  this.options = { config: config, gulp: gulp };
};

fujisan.registerHelpers = function(config) {
  // HACK: move to gulp task
  var helpersPath = path.join(config.cwd, config.paths.source.helpers);

  var helpersDirExists = false;
  try {
    helpersDirExists = false;
    fs.statSync(helpersPath);
    helpersDirExists = true;
  } catch (err) {
    if (err.code == 'ENOENT') {
    } else {
      throw err;
    }
  }
  var helpers = {};
  helpers.partial = partial(config);
  if (helpersDirExists) {
    helpers = requireDir(helpersPath);
  }

  config.preprocessors.all = config.preprocessors.all || {};
  config.preprocessors.ejs = config.preprocessors.ejs || {};
  config.preprocessors.jade = config.preprocessors.jade || {};
  // HACK: Should be an option in chained preprocessors
  Object.assign(config.preprocessors.all.helpers, helpers);
  Object.assign(config.preprocessors.ejs, helpers);
  Object.assign(config.preprocessors.jade, helpers);
};

module.exports = fujisan;

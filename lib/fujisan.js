/*global module, require, __dirname */
var process = require('process');

var defaultConfig = require('./default-config');

var PublicExtension = require('./extensions/public-extension');
var PagesExtension = require('./extensions/pages-extension');
var StylesheetsExtension = require('./extensions/stylesheets-extension');
var JavascriptsExtension = require('./extensions/javascripts-extension');
var HelpersExtension = require('./extensions/helpers-extension');
var PartialsExtension = require('./extensions/partials-extension');
var LayoutsExtension = require('./extensions/layouts-extension');

// HACK: refactor to class and add tests
var fujisan = function(inOptions) {
  fujisan.prepareOptions(inOptions);
  var options = fujisan.options;

  var gulp = options.gulp;
  var config = options.config;

  var publicExtension = new PublicExtension(options);
  var pagesExtension = new PagesExtension(options);
  options.pages = pagesExtension;
  var stylesheetsExtension = new StylesheetsExtension(options);
  var javascriptsExtension = new JavascriptsExtension(options);
  var helpersExtension = new HelpersExtension(options);
  var partialsExtension = new PartialsExtension(options);
  var layoutsExtension = new LayoutsExtension(options);

  helpersExtension.registerTasks();
  partialsExtension.registerTasks();
  layoutsExtension.registerTasks();
  publicExtension.registerTasks();
  pagesExtension.registerTasks();
  stylesheetsExtension.registerTasks();
  javascriptsExtension.registerTasks();

  gulp.task(config.prefix + ':build',
            gulp.series(
              gulp.parallel(
                config.prefix + ':build:helpers',
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

fujisan.prepareOptions = function(options) {
  if (this.options) {
    return;
  }
  var gulp = options.gulp;
  var config = Object.assign({}, defaultConfig, options.config);

  config.cwd = config.cwd || process.cwd();
  config.preprocessors.all = config.preprocessors.all || {};
  config.preprocessors.all.helpers = config.preprocessors.all.helper || {};
  config.preprocessors.ejs = config.preprocessors.ejs || {};
  config.preprocessors.jade = config.preprocessors.jade || {};

  this.options = { config: config, gulp: gulp };
};

module.exports = fujisan;

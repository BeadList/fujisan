'use strict';

const process = require('process');
const requireDir = require('require-dir');

const defaultConfig = require('./default-config');

let requiredExtensions = requireDir(__dirname + '/extensions');

// HACK: refactor to class and add tests
var fujisan = function(inOptions) {
  fujisan.prepareOptions(inOptions);
  var runner = fujisan.options;

  var gulp = runner.gulp;
  var config = runner.config;

  let extensionNames = [
    'public',
    'pages',
    'stylesheets',
    'javascripts',
    'helpers',
    'partials',
    'layouts'
  ];
  extensionNames.forEach((e) => {
    runner[e] = new requiredExtensions[`${e}-extension`](runner);
    runner[e].registerTasks();
  });
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

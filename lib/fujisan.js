'use strict';

const process = require('process');
const requireDir = require('require-dir');

const defaultConfig = require('./default-config');
const isGulp4 = require('./utils/is-gulp4');

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
    'images',
    'helpers',
    'partials',
    'layouts'
  ];

  extensionNames.forEach((e) => {
    runner[e] = new requiredExtensions[`${e}-extension`](runner);
    runner[e].registerTasks();
  });

  const tasksToLoad = [
    config.prefix + ':build:helpers',
    config.prefix + ':build:partials',
    config.prefix + ':build:layouts'
  ];

  const tasksToBuild = [
    config.prefix + ':build:public',
    config.prefix + ':build:pages',
    config.prefix + ':build:stylesheets',
    config.prefix + ':build:javascripts',
    config.prefix + ':build:images'
  ];

  if(isGulp4(gulp)) {
    gulp.task(config.prefix + ':build',
              gulp.series(
                gulp.parallel.apply(gulp.parallel, tasksToLoad),
                gulp.parallel.apply(gulp.parallel, tasksToBuild)
              ));

    gulp.task(config.prefix, gulp.parallel(config.prefix + ':build'));

    gulp.task('default', gulp.parallel(config.prefix));

  } else {
    const runSequence = require('run-sequence').use(gulp);
    gulp.task(config.prefix + ':build', (cb) => {
      runSequence(tasksToLoad, tasksToBuild, cb);
    });

    gulp.task(config.prefix, [config.prefix + ':build']);

    gulp.task('default', [config.prefix]);
  }
};

fujisan.prepareOptions = function(options) {
  if (this.options) {
    return;
  }

  var gulp = options.gulp;
  var config = Object.assign({}, defaultConfig, options.config);
  config.cwd = config.cwd || process.cwd();

  config.preprocessors.jade = config.preprocessors.jade || {};
  // FIXME: do not use source string
  config.preprocessors.jade.basedir = `${config.cwd}/source`;
  Object.freeze(config);

  this.options = { config: config, gulp: gulp, renderer: {} };
};

module.exports = fujisan;

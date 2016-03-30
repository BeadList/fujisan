/*global module, require, __dirname */
var fs = require('fs');
var path = require('path');
var process = require('process');
var requireDir = require('require-dir');
var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');

var defaultConfig = require('./default-config');

var buildStreams = requireDir(__dirname + '/build', { recurse: true });
var through2 = require('through2');
var deasync = require('deasync');

var PublicExtension = require('./extensions/public-extension');
var PagesExtension = require('./extensions/pages-extension');
var StylesheetsExtension = require('./extensions/stylesheets-extension');
var JavascriptsExtension = require('./extensions/javascripts-extension');
var LayoutsExtension = require('./extensions/layouts-extension');

// HACK: refactor to class and add tests
var fujisan = function(inOptions) {
  fujisan.streams(inOptions);
  var options = fujisan.options;

  var gulp = options.gulp;
  var config = options.config;

  fujisan.makeTask('partials', true);

  var layoutsExtension = new LayoutsExtension(options);
  var publicExtension = new PublicExtension(options);
  var pagesExtension = new PagesExtension(options);
  var stylesheetsExtension = new StylesheetsExtension(options);
  var javascriptsExtension = new JavascriptsExtension(options);
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

  if (helpersDirExists) {
    helpers = requireDir(helpersPath);
  }


  var render = function(file, context, resultCb) {
    var stream = through2.obj();
    var options = Object.assign({}, config.preprocessors);
    options.all = Object.assign({ cache: false }, config.preprocessors.all, context);
    combiner([
      stream,
      chainedPreprocessors(options),
      through2.obj(function (file, enc, cb) {
        resultCb(null, file.contents.toString());
        cb();
      })
    ]);
    stream.write(file.clone());
  };

  var isHandlebars = function (context) {
    return !!(context &&
              context.name == 'partial' &&
              context.hash &&
              context.data);
  };

  helpers.partial = function (name, inputContext) {
    var context;
    if(isHandlebars(inputContext)) {
      context = inputContext.hash;
    } else {
      context = inputContext;
    }

    var filePath = Object.keys(config.partials).find((k) => {
      var file = config.partials[k];
      // HACK: make smarter extension strip
      var searchName = file.path
            .replace(file.base, '')
            .replace(/\..+/, '');
      return searchName == name;
    });
    var file = config.partials[filePath];
    return deasync(render)(file, context);
  };

  config.preprocessors.all = config.preprocessors.all || {};
  config.preprocessors.ejs = config.preprocessors.ejs || {};
  config.preprocessors.jade = config.preprocessors.jade || {};
  // HACK: Should be an option in chained preprocessors
  Object.assign(config.preprocessors.all.helpers, helpers);
  Object.assign(config.preprocessors.ejs, helpers);
  Object.assign(config.preprocessors.jade, helpers);
};

fujisan.makeTask = function(name, justSource) {
  var gulp = this.options.gulp;
  var config = this.options.config;

  gulp.task(config.prefix + ':build:' + name, (function() {
    var streams = this.streams().build[name].slice();
    streams.unshift(gulp.src(config.paths.source[name]));
    if(!justSource) {
      streams.push(gulp.dest(config.paths.build[name]));
    }
    return combiner(streams);
  }).bind(this));
};


module.exports = fujisan;

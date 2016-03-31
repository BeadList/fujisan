'use strict';
var FujisanExtension = require('../fujisan-extension');

var Combiner = require('stream-combiner2');
var through2 = require('through2');

var renderer = require('../gulp-renderer');
var layouts = require('../shame/layouts');

class LayoutsExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);
    this.config.layouts = this.config.layouts || {};
    this.runner.pages.pipeThrough(layouts(this.config, this.renderStream.bind(this)));
  }

  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.layouts)
      .pipe(through2.obj((file, enc, cb) => {
        this.registerLayout(file.path, file);
        cb();
      }));
  }

  renderStream(stream, context, resultCb) {
    return Combiner.obj([
      stream,
      renderer(this.runner, context),
      through2.obj(function (file, enc, cb) {
        resultCb(null, file.contents.toString());
        cb();
      })
    ]);
  }

  registerLayout(name, file) {
    this.config.layouts[name] = file;
  }

  registerTasks() {
    // HACK: Rename to loadLayouts
    this.gulp.task(`${this.config.prefix}:build:layouts`, () => {
      return this.getStream();
    });
  }
}

module.exports = LayoutsExtension;

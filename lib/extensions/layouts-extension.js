'use strict';
var FujisanExtension = require('../fujisan-extension');

var chainedPreprocessors = require('gulp-chained-preprocessors');
var layouts = require('../shame/layouts');
const through2 = require('through2');

class LayoutsExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);
    this.config.layouts = this.config.layouts || {};
    this.runner.pages.pipeThrough(layouts(this.config));
  }

  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.layouts)
      .pipe(through2.obj((file, enc, cb) => {
        this.registerLayout(file.path, file);
        cb();
      }));
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

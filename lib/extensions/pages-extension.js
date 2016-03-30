/*global module, require */

'use strict';
var FujisanExtension = require('../fujisan-extension');

var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');
var layouts = require('../shame/layouts');

class PagesExtension extends FujisanExtension {
  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.pages)
      .pipe(chainedPreprocessors(this.config.preprocessors))
      .pipe(layouts(this.config))
      .pipe(gulp.dest(this.config.paths.build.pages));
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:pages`, () => {
      return this.getStream();
    });
  }
}

module.exports = PagesExtension;

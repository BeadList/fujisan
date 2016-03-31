'use strict';
var FujisanExtension = require('../fujisan-extension');

var chainedPreprocessors = require('gulp-chained-preprocessors');
const Combine = require('stream-combiner2');

class PagesExtension extends FujisanExtension {
  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.pages)
      .pipe(chainedPreprocessors(this.config.preprocessors))
      .pipe(insert())
      .pipe(gulp.dest(this.config.paths.build.pages));
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:pages`, () => {
      return this.getStream();
    });
  }
}

module.exports = PagesExtension;

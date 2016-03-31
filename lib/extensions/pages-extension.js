'use strict';
let FujisanExtension = require('../fujisan-extension');
let renderer = require('../gulp-renderer');

class PagesExtension extends FujisanExtension {
  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.pages)
      .pipe(renderer(this.runner))
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

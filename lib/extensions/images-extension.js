'use strict';
const FujisanExtension = require('../fujisan-extension');

class ImagesExtension extends FujisanExtension {
  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.images)
      .pipe(gulp.dest(this.config.paths.build.images));
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:images`, () => {
      return this.getStream();
    });
  }
}

module.exports = ImagesExtension;

'use strict';
const FujisanExtension = require('../fujisan-extension');

class PublicExtension extends FujisanExtension {
  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.public)
      .pipe(gulp.dest(this.config.paths.build.public));
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:public`, () => {
      return this.getStream();
    });
  }
}

module.exports = PublicExtension;

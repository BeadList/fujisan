'use strict';
var FujisanExtension = require('../fujisan-extension');
var renderer = require('../gulp-renderer');

var babel = require('gulp-babel');

class JavascriptsExtension extends FujisanExtension {
  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.javascripts)
      .pipe(renderer(this.runner))
      .pipe(babel(this.config.babel))
      .pipe(gulp.dest(this.config.paths.build.javascripts));
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:javascripts`, () => {
      return this.getStream();
    });
  }
}

module.exports = JavascriptsExtension;

'use strict';
var FujisanExtension = require('../fujisan-extension');
var renderer = require('../gulp-renderer');

class StylesheetsExtension extends FujisanExtension {
  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.stylesheets)
      .pipe(renderer(this.runner))
      .pipe(gulp.dest(this.config.paths.build.stylesheets));
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:stylesheets`, () => {
      return this.getStream();
    });
  }
}

module.exports = StylesheetsExtension;

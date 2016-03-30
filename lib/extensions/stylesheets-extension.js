/*global module, require */

'use strict';
var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');

class StylesheetsExtension {
  constructor(fujisanOptions) {
    this.fujisanOptions = fujisanOptions;
    this.gulp = fujisanOptions.gulp;
    this.config = fujisanOptions.config;
  }

  streams() {
    return {
      build: [
        this.gulp.src(this.config.paths.source.stylesheets),
        chainedPreprocessors(this.config.preprocessors),
        this.gulp.dest(this.config.paths.build.stylesheets)
      ]
    };
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:stylesheets`, () => {
      return combiner(this.streams().build);
    });
  }
}

module.exports = StylesheetsExtension;

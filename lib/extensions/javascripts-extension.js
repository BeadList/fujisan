/*global module, require */

'use strict';
var FujisanExtension = require('../fujisan-extension');

var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');
var babel = require('gulp-babel');

class JavascriptsExtension extends FujisanExtension {
  streams() {
    return {
      build: [
        this.gulp.src(this.config.paths.source.javascripts),
        chainedPreprocessors(this.config.preprocessors),
        babel(this.config.babel),
        this.gulp.dest(this.config.paths.build.javascripts)
      ]
    };
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:javascripts`, () => {
      return combiner(this.streams().build);
    });
  }
}

module.exports = JavascriptsExtension;

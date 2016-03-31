'use strict';
var FujisanExtension = require('../fujisan-extension');

var chainedPreprocessors = require('gulp-chained-preprocessors');
var through2 = require('through2');
var partial = require('../shame/partial-helper');

class PartialsExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);
    this.config.partials = this.config.partials || {};
    this.runner.registerHelper('partial', partial(this.config));
  }

  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.partials)
      .pipe(through2.obj((file, enc, cb) => {
        this.registerPartial(file.path, file);
        cb();
      }));
  }

  registerPartial(name, file) {
    this.config.partials[name] = file;
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:partials`, () => {
      return this.getStream();
    });
  }
}

module.exports = PartialsExtension;

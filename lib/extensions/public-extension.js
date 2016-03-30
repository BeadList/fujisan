/*global module, require */

'use strict';
var combiner = require('stream-combiner2').obj;

class PublicExtension {
  constructor(fujisanOptions) {
    this.fujisanOptions = fujisanOptions;
    this.gulp = fujisanOptions.gulp;
    this.config = fujisanOptions.config;
  }

  streams() {
    return {
      build: [
        this.gulp.src(this.config.paths.source.public),
        this.gulp.dest(this.config.paths.build.public)
      ]
    };
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:public`, () => {
      return combiner(this.streams().build);
    });
  }
}

module.exports = PublicExtension;

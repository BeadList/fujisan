/*global module, require */

'use strict';
var FujisanExtension = require('../fujisan-extension');

var combiner = require('stream-combiner2').obj;

class PublicExtension extends FujisanExtension {
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

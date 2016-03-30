/*global module, require */

'use strict';
var FujisanExtension = require('../fujisan-extension');

var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');
var through2 = require('through2');
var partial = require('../shame/partial-helper');

var storePartials = function(config) {
  var partials = {};

  return through2.obj(function (file, enc, cb) {
    partials[file.path] = file;
    // console.log(file);
    cb();
  }, function (cb) {
    config.partials = config.partials || {};
    Object.assign(config.partials, partials);
    cb();
  });
};

class PartialsExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);
    this.runner.registerHelper('partial', partial(this.config));
  }

  streams() {
    return {
      load: [
        this.gulp.src(this.config.paths.source.partials),
        storePartials(this.config)
      ]
    };
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:partials`, () => {
      return combiner(this.streams().load);
    });
  }
}

module.exports = PartialsExtension;
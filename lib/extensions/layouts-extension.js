/*global module, require */

'use strict';
var FujisanExtension = require('../fujisan-extension');

var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');
var through2 = require('through2');

var storeLayouts = function(config) {
  var layouts = {};

  return through2.obj(function (file, enc, cb) {
    layouts[file.path] = file;
    cb();
  }, function (cb) {
    config.layouts = config.layouts || {};
    Object.assign(config.layouts, layouts);
    cb();
  });
};

class LayoutsExtension extends FujisanExtension {
  streams() {
    return {
      load: [
        this.gulp.src(this.config.paths.source.layouts),
        storeLayouts(this.config)
      ]
    };
  }

  registerTasks() {
    // HACK: Rename to loadLayouts
    this.gulp.task(`${this.config.prefix}:build:layouts`, () => {
      return combiner(this.streams().load);
    });
  }
}

module.exports = LayoutsExtension;
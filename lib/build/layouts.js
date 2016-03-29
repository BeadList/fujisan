/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');
var through2 = require('through2');

// HACK: test
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

module.exports = (options) => {
  var gulp = options.gulp;
  var config = options.config;

  return [
    storeLayouts(config)
  ];
}

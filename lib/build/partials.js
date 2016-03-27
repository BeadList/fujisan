/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');
var through2 = require('through2');

// HACK: test
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

module.exports = (options) => {
  var gulp = options.gulp;
  var config = options.config;

  return [
    storePartials(config)
  ];
}

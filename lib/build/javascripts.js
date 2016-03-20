/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');
var babel = require('gulp-babel');

module.exports = (options) => {
  var config = options.config;
  return [
    chainedPreprocessors(config.build.preprocessors),
    babel(config.build.babel)
  ];
};

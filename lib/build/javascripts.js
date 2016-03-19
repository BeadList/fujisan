/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');
var babel = require('gulp-babel');

module.exports = (options) => {
  var config = options.config;
  return [
    chainedPreprocessors({}),
    babel(config.build.babel)
  ];
}

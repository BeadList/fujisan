/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');

module.exports = (options) => {
  var config = options.config;

  return [
    chainedPreprocessors(config.build.preprocessors),
  ];
}

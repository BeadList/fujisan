/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');

module.exports = (options) =>{
  return [
    chainedPreprocessors({ all: {} })
  ];
}

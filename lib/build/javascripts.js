/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');
var babel = require('gulp-babel');

module.exports = (options) =>{
  return [
    chainedPreprocessors({}),
    babel({
      presets: ['es2015']
    })
  ];
}

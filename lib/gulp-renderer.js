const chainedPreprocessors = require('gulp-chained-preprocessors');

// HACK: take context from file
const gulpRenderer = (runner, context) => {
  var options = Object.assign({}, runner.config.preprocessors);
  options.all = Object.assign({ cache: false }, runner.config.preprocessors.all, context);
  return chainedPreprocessors(options);
}

module.exports = gulpRenderer;

const chainedPreprocessors = require('gulp-chained-preprocessors');

// HACK: take context from file
const gulpRenderer = (runner, context) => {
  const renderer = runner.renderer;
  var options = Object.assign({}, runner.config.preprocessors);
  options.all = Object.assign(
    { cache: false, helpers: renderer.helpers },
    renderer.helpers,
    runner.config.preprocessors.all,
    context
  );

  return chainedPreprocessors((file) => {
    options.all.file = file;
    options.sass = options.sass || {};
    options.sass.file = undefined;
    return options;
  });
};

module.exports = gulpRenderer;

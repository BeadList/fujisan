const chainedPreprocessors = require('gulp-chained-preprocessors');

// HACK: take context from file
const gulpRenderer = (runner, context) => {
  const renderer = runner.renderer;
  var options = Object.assign({}, runner.config.preprocessors);
  options.all = Object.assign(
    { cache: false },
    runner.config.preprocessors.all,
    context
  );
  options.helpers = renderer.helpers;

  return chainedPreprocessors((file) => {
    options.all.file = file;
    // HACK: sass and jade stuff
    options.sass = options.sass || {};
    options.jade = options.jade || {};
    options.sass.file = undefined;
    options.jade.filename = file.path;
    return options;
  });
};

module.exports = gulpRenderer;

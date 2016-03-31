var chainedPreprocessors = require('gulp-chained-preprocessors');
var through2 = require('through2');
var deasync = require('deasync');

var partial = function(runner, renderStream) {
  var config = runner.config;
  var render = function(file, context, resultCb) {
    var stream = through2.obj();
    renderStream(stream, context, resultCb);
    var fileToPass = file.clone();
    fileToPass.context = context;
    stream.write(fileToPass);
  };

  var isHandlebars = function (context) {
    return !!(context &&
              context.name == 'partial' &&
              context.hash &&
              context.data);
  };

  return function (name, inputContext) {
    var context;
    if(isHandlebars(inputContext)) {
      context = inputContext.hash;
    } else {
      context = inputContext;
    }

    var filePath = Object.keys(runner.renderer.partials).find((k) => {
      var file = runner.renderer.partials[k];
      // HACK: make smarter extension strip
      var searchName = file.path
            .replace(file.base, '')
            .replace(/\..+/, '');
      return searchName == name;
    });
    var file = runner.renderer.partials[filePath];
    return deasync(render)(file, context);
  };
}
module.exports = partial;

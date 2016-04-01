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

  return function (name, options) {
    // HACK: should be solved via chained-preprocessors
    var context =  (this.arguments &&
                    this.arguments[0] &&
                    this.arguments[0].hash) || options;
    var file = runner.renderer.partials[name];
    return deasync(render)(file, context);
  };
};
module.exports = partial;

var combiner = require('stream-combiner2').obj;
var through2 = require('through2');
var chainedPreprocessors = require('gulp-chained-preprocessors');

var render = function(config, file, layout, renderStream, resultCb) {
  var stream = through2.obj();
  renderStream(stream, {}, resultCb);
  var newLayout = layout.clone();
  newLayout.contentFor = {
    default: file
  };
  stream.write(newLayout);
};

var layouts = function(runner, renderStream) {
  var config = runner.config;
  var name = config.layout;

  return through2.obj(function (file, enc, cb) {
    if( (! runner.renderer.layouts) || Object.keys(runner.renderer.layouts).length === 0) {

      cb(null, file);
      return;
    }
    render(config,
           file.contents.toString(),
           runner.renderer.layouts[name],
           renderStream,
           function(err, page){
             file.contents = new Buffer(page);
             cb(err, file);
           });
  });
};

module.exports = layouts;

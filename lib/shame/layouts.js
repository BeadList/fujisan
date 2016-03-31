var combiner = require('stream-combiner2').obj;
var through2 = require('through2');
var chainedPreprocessors = require('gulp-chained-preprocessors');

var yieldContent = function(content){
  return function() {
    return content;
  };
};

var render = function(config, file, layout, renderStream, resultCb) {
  var stream = through2.obj();
  var context = { yieldContent: yieldContent(file) };
  renderStream(stream, context, resultCb);
  stream.write(layout.clone());
};

var layouts = function(config, renderStream) {
  var name = config.layout;

  return through2.obj(function (file, enc, cb) {
    if( (! config.layouts) || Object.keys(config.layouts).length === 0) {

      cb(null, file);
      return;
    }
    var filePath = Object.keys(config.layouts).find((k) => {
      var file = config.layouts[k];
      var searchName = file.path
            .replace(file.base, '')
            .replace(/\..+/, '');
      return searchName == name;
    });
    render(config,
           file.contents.toString(),
           config.layouts[filePath],
           renderStream,
           function(err, page){
             file.contents = new Buffer(page);
             cb(err, file);
           });
  });
};

module.exports = layouts;

/*global module, require, Buffer */
var through2 = require('through2');
var chainedPreprocessors = require('gulp-chained-preprocessors');
var combiner = require('stream-combiner2').obj;

var yieldContent = function(content){
  return function() {
    return content;
  };
};

var render = function(config, file, layout, resultCb) {
  var stream = through2.obj();
  var options = Object.assign({}, config.preprocessors);
  options.all = Object.assign({ cache: false, yieldContent: yieldContent(file) },
                              config.preprocessors.all);
  combiner([
    stream,
    chainedPreprocessors(options),
    through2.obj(function (file, enc, cb) {
      resultCb(null, file.contents.toString());
      cb();
    })
  ]);
  stream.write(layout.clone());
};

var layouts = function(config) {
  var name = config.layout;
  return through2.obj(function (file, enc, cb) {
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
           function(err, page){
             file.contents = new Buffer(page);
             cb(err, file);
           });
  });
};

module.exports = (options) => {
  var config = options.config;

  return [
    chainedPreprocessors(config.preprocessors),
    layouts(config)
  ];
}

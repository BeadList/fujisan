var through2 = require('through2');

var passFileThroughStream = require('../utils/pass-file-through-stream');

var layouts = function(runner, renderStream) {
  var config = runner.config;
  var name = config.layout;

  return through2.obj(function (file, enc, cb) {
    if((! name) ||
      (! runner.renderer.layouts) ||
        Object.keys(runner.renderer.layouts).length === 0) {

      cb(null, file);
      return;
    }
    var layout = runner.renderer.layouts[name].clone();
    layout.contentFor = layout.contentFor || {};
    Object.assign(layout.contentFor, file.contentFor);
    layout.contentFor.default = file.contents.toString();

    passFileThroughStream(layout, renderStream, function(err, resultFile) {
      file.contents = resultFile.contents;
      cb(err, file);
    });
  });
};

module.exports = layouts;

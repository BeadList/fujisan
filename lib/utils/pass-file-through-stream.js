'use strict'
var through2 = require('through2');

const passFileThroughStream = (file, stream, cb) => {
  var streamStart = through2.obj();
  streamStart
    .pipe(stream())
    .pipe(through2.obj(function (file, enc, through2Cb) {
      cb(null, file);
      through2Cb();
    }));
  streamStart.write(file);
};

module.exports = passFileThroughStream;

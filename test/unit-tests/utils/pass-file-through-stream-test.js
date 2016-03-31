'use strict';
var expect = require('chai').expect;

const passFileThroughStream =
        require('../../../lib/utils/pass-file-through-stream.js');

var through2 = require('through2');

describe('passFileThroughStream', () => {
  it('passes file through stream', (done) => {
    let file = {
      passed: false
    };

    let stream = () => (through2.obj((file, enc, cb) => {
      file.passed = true;
      cb(null, file);
    }));

    passFileThroughStream(file, stream, (err, file) => {
      expect(file.passed).to.equal(true);
      done()
    });
  });
});

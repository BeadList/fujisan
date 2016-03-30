/*global require describe it beforeEach */

'use strict';
var expect = require('chai').expect;

const FujisanExtension = require('../../lib/fujisan-extension');
const through2 = require('through2');
const bl = require('bl');

const generator = through2.obj();

let streamTestHelper = {
  write(stream, values) {
    values.forEach((v) => {
      stream.write(v);
    });
    stream.end();
  },

  read(stream, cb) {
    let result = [];
    stream.on('data',  (v) => {
      result.push(v);
    });

    stream.on('end',  (v) => {
      cb(null, result);
    });
  }
};

class SampleExtension extends FujisanExtension {
  stream(gulp, insert) {
    return generator.pipe(insert());
  }
}

describe('FujisanExtension', () => {
  let sampleExtension = undefined;
  beforeEach(() => {
    let runner = {};
    sampleExtension = new SampleExtension(runner);
  });

  describe('#getStream', () => {
    it('injects gulp to stream', (done) => {
      sampleExtension.stream = (insert, gulp) => {
        expect(gulp).to.equal('fakeGulp');
        done();
      };
      sampleExtension.gulp = 'fakeGulp';

      sampleExtension.getStream();
    });

    it('injects passThrough to stream', (done) => {
      sampleExtension.stream = (insert) => {
        streamTestHelper.write(insert, [1, 2]);
        streamTestHelper.read(insert, (err, result) => {
          expect(result).to.deep.equal([1, 2]);
          done();
        });
      };
      sampleExtension.getStream();
    });
  });

  describe('#pipeThrough', () => {

  });
});

'use strict';
var expect = require('chai').expect;

const FujisanExtension = require('../../lib/fujisan-extension');
const through2 = require('through2');
const bl = require('bl');


let streamTestHelper = {
  write(stream, values, end) {
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

};

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
        let stream = insert();
        streamTestHelper.write(stream, [1, 2]);
        streamTestHelper.read(stream, (err, result) => {
          expect(result).to.deep.equal([1, 2]);
          done();
        });
      };
      sampleExtension.getStream();
    });
  });

  describe('#pipeThrough', () => {
   let generator = undefined;

    beforeEach(()=> {
      generator = through2.obj();

      sampleExtension.stream = (insert) => {
        return generator.pipe(insert());
      };
    });

    it('inserts stream', (done) => {
      let twice = through2.obj((num, enc, cb) => {
        cb(null, num * 2);
      });

      sampleExtension.pipeThrough(twice);

      streamTestHelper.write(generator, [2, 3]);

      streamTestHelper.read(sampleExtension.getStream(), (err, result) => {
        console.log(result);
        expect(result).to.deep.equal([4, 7]);
        done();
      });
    });
  });
});

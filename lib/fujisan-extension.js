'use strict';

const through2 = require('through2');
const Combine = require('stream-combiner2');
// Abstract class to be extended


class FujisanExtension {
  constructor(runner) {
    this.runner = runner;
    this.gulp = runner.gulp;
    this.config = runner.config;

    this.insertedStreams = [];
  }

  stream(gulp) {
  }

  getStream() {
    let insert;
    let passThroughObj = through2.obj((obj, enc, cb) => { cb(null, obj); });
    if(this.insertedStreams.length == 0) {
      insert = () => { return passThroughObj; };
    } else {
      insert = () => { return Combine.obj(this.insertedStreams); };
    }
    return this.stream(insert, this.gulp);
  }

  streams() {
    return {
    };
  }

  pipeThrough(stream) {
    this.insertedStreams.push(stream);
  }

  registerTasks() {
  }
}

module.exports = FujisanExtension;

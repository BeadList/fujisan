/*global module, require */
'use strict';

const through2 = require('through2');

// Abstract class to be extended

const passThroughObj = through2.obj((obj, enc, cb) => { cb(null, obj); });

class FujisanExtension {
  constructor(runner) {
    this.runner = runner;
    this.gulp = runner.gulp;
    this.config = runner.config;

    this.inserted = [];
  }

  stream(gulp) {
  }

  getStream() {
    this.stream(passThroughObj, this.gulp);
  }

  streams() {
    return {
    };
  }

  pipeThrough() {
  }

  registerTasks() {
  }
}

module.exports = FujisanExtension;

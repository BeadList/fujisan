/*global module, require */

'use strict';

// Abstract class to be extended

class FujisanExtension {
  constructor(runner) {
    this.runner = runner;
    this.gulp = runner.gulp;
    this.config = runner.config;
  }

  streams() {
    return {
    };
  }

  registerTasks() {
  }
}

module.exports = FujisanExtension;

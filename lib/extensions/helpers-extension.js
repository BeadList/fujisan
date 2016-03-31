'use strict';
var FujisanExtension = require('../fujisan-extension');

var chainedPreprocessors = require('gulp-chained-preprocessors');
var fs = require('fs');
var path = require('path');
var requireDir = require('require-dir');

class HelpersExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);
    this.runner.renderer.helpers = this.runner.renderer.helpers || {};
    this.runner.registerHelper = this.registerHelper.bind(this);
  }

  registerHelper(name, fn) {
    this.runner.renderer.helpers[name] = fn;
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:helpers`, (done) => {
      var helpersPath = path.join(this.config.cwd, this.config.paths.source.helpers);

      var helpersDirExists = false;
      try {
        helpersDirExists = false;
        fs.statSync(helpersPath);
        helpersDirExists = true;
      } catch (err) {
        if (err.code == 'ENOENT') {
        } else {
          throw err;
        }
      }
      var helpers = {};
      if (helpersDirExists) {
        helpers = requireDir(helpersPath);
      }
      Object.keys(helpers).forEach((key) => {
        this.registerHelper(key, helpers[key]);
      });
      done();
    });
  }
}

module.exports = HelpersExtension;

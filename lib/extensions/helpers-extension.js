/*global module, require */

'use strict';
var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');
var fs = require('fs');
var path = require('path');
var requireDir = require('require-dir');

class HelpersExtension {
  constructor(fujisanOptions) {
    this.fujisanOptions = fujisanOptions;
    this.gulp = fujisanOptions.gulp;
    this.config = fujisanOptions.config;

    fujisanOptions.registerHelper = this.registerHelper.bind(this);
  }

  streams() {
    return {
    };
  }

  registerHelper(name, fn) {
    this.config.preprocessors.all.helpers[name] = fn;
    this.config.preprocessors.ejs[name] = fn;
    this.config.preprocessors.jade[name] = fn;
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

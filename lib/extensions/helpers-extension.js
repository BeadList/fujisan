/*global module, require */

'use strict';
var combiner = require('stream-combiner2').obj;
var chainedPreprocessors = require('gulp-chained-preprocessors');
var fs = require('fs');
var path = require('path');
var requireDir = require('require-dir');
var partial = require('../shame/partial-helper');

class HelpersExtension {
  constructor(fujisanOptions) {
    this.fujisanOptions = fujisanOptions;
    this.gulp = fujisanOptions.gulp;
    this.config = fujisanOptions.config;
  }

  streams() {
    return {
    };
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
      helpers.partial = partial(this.config);

      this.config.preprocessors.all = this.config.preprocessors.all || {};
      this.config.preprocessors.ejs = this.config.preprocessors.ejs || {};
      this.config.preprocessors.jade = this.config.preprocessors.jade || {};
      // HACK: Should be an option in chained preprocessors
      Object.assign(this.config.preprocessors.all.helpers, helpers);
      Object.assign(this.config.preprocessors.ejs, helpers);
      Object.assign(this.config.preprocessors.jade, helpers);
      done();
    });
  }
}

module.exports = HelpersExtension;

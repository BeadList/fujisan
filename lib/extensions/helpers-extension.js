'use strict';
const FujisanExtension = require('../fujisan-extension');

const chainedPreprocessors = require('gulp-chained-preprocessors');
const path = require('path');
const requireDir = require('require-dir');
const fileExists = require('../utils/file-exists');

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
      const helpersPath = path.join(this.config.cwd,
                                    this.config.paths.source.helpers);
      let helpers = {};
      if (fileExists(helpersPath)) {
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

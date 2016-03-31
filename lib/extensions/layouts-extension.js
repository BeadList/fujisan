'use strict';
let FujisanExtension = require('../fujisan-extension');

let Combiner = require('stream-combiner2');
let through2 = require('through2');

let renderer = require('../gulp-renderer');
let layouts = require('../shame/layouts');

let cleanName = require('../utils/clean-name.js')
class LayoutsExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);
    this.runner.renderer.layouts = this.runner.renderer.layouts || {};
    this.runner.pages.pipeThrough(layouts(this.runner, this.renderStream.bind(this)));
  }

  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.layouts)
      .pipe(through2.obj((file, enc, cb) => {
        this.registerLayout(cleanName(file), file);
        cb();
      }));
  }

  renderStream(stream, context, resultCb) {
    return Combiner.obj([
      stream,
      renderer(this.runner, context),
      through2.obj(function (file, enc, cb) {
        resultCb(null, file.contents.toString());
        cb();
      })
    ]);
  }

  registerLayout(name, file) {
    this.runner.renderer.layouts[name] = file;
  }

  registerTasks() {
    // HACK: Rename to loadLayouts
    this.gulp.task(`${this.config.prefix}:build:layouts`, () => {
      return this.getStream();
    });
  }
}

module.exports = LayoutsExtension;

'use strict';
const FujisanExtension = require('../fujisan-extension');

const Combiner = require('stream-combiner2');
const through2 = require('through2');

const renderer = require('../gulp-renderer');
const partial = require('../shame/partial-helper');
const cleanName = require('../utils/clean-name');

class PartialsExtension extends FujisanExtension {
  constructor(runner) {
    super(runner);
    this.runner.renderer.partials = this.runner.renderer.partials || {};
    this.runner.registerHelper('partial', partial(this.runner, this.renderStream.bind(this)));
  }

  stream(insert, gulp) {
    return gulp.src(this.config.paths.source.partials)
      .pipe(through2.obj((file, enc, cb) => {
        this.registerPartial(cleanName(file), file);
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

  registerPartial(name, file) {
    this.runner.renderer.partials[name] = file;
  }

  registerTasks() {
    this.gulp.task(`${this.config.prefix}:build:partials`, () => {
      return this.getStream();
    });
  }
}

module.exports = PartialsExtension;

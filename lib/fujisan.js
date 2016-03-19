/*global module, require */

var build = {
  public: require('./build/public')(),
  pages: require('./build/pages')(),
  stylesheets: require('./build/stylesheets')()
};

var paths = {
  source: {
    public: 'source/public/**/*',
    pages: 'source/pages/**/*',
    stylesheets: 'source/stylesheets/**/*',
  },

  build: {
    public: 'build',
    pages: 'build',
    stylesheets: 'build/stylesheets',
  }
};

var combiner = require('stream-combiner2').obj;

var buildTask = function(name, options) {
  var gulp = options.gulp;

  gulp.task('fuji:build:' + name, function() {
    var streams = build[name].slice();
    streams.unshift(gulp.src(paths.source[name]));
    streams.push(gulp.dest(paths.build[name]));
    combiner(streams);
  });
}

module.exports = function(options) {
  var gulp = options.gulp;
  var config = options.config;

  buildTask('public', options);
  buildTask('pages', options);
  buildTask('stylesheets', options);

  gulp.task('fuji:build', [
    'fuji:build:public',
    'fuji:build:pages',
    'fuji:build:stylesheets'
  ]);
};

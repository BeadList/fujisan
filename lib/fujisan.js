/*global module, require */

var build = {
  public: require('./build/public')(),
  pages: require('./build/pages')()
};

var paths = {
  source: {
    public: 'source/public/**/*',
    pages: 'source/pages/**/*'
  },

  build: {
    public: 'build',
    pages: 'build'
  }
};

var combiner = require('stream-combiner2').obj;

module.exports = function(options) {
  var gulp = options.gulp;
  var config = options.config;

  gulp.task('fuji:build:pages', function() {
    var pages = build.pages.slice();
    pages.unshift(gulp.src(paths.source.pages));
    pages.push(gulp.dest(paths.build.pages));
    combiner(pages);
  });

  gulp.task('fuji:build:public', function() {
    var public = build.public.slice();
    public.unshift(gulp.src(paths.source.public));
    public.push(gulp.dest(paths.build.public));
    combiner(public);
  });

  gulp.task('fuji:build', ['fuji:build:pages', 'fuji:build:public']);
};

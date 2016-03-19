/*global module, require */

var build = {
  public: require('./build/public')(),
  pages: require('./build/pages')(),
  stylesheets: require('./build/stylesheets')(),
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

module.exports = function(options) {
  var gulp = options.gulp;
  var config = options.config;

  gulp.task('fuji:build:public', function() {
    var public = build.public.slice();
    public.unshift(gulp.src(paths.source.public));
    public.push(gulp.dest(paths.build.public));
    combiner(public);
  });

  gulp.task('fuji:build:pages', function() {
    var pages = build.pages.slice();
    pages.unshift(gulp.src(paths.source.pages));
    pages.push(gulp.dest(paths.build.pages));
    combiner(pages);
  });


  gulp.task('fuji:build:stylesheets', function() {
    var stylesheets = build.stylesheets.slice();
    stylesheets.unshift(gulp.src(paths.source.stylesheets));
    stylesheets.push(gulp.dest(paths.build.stylesheets));
    combiner(stylesheets);
  });

  gulp.task('fuji:build', [
    'fuji:build:public',
    'fuji:build:pages',
    'fuji:build:stylesheets'
  ]);
};

/*global module, require */

var config = {
  babel: {
    presets: ['es2015']
  },

  paths: {
    source: {
      public: 'source/public/**/*',
      pages: 'source/pages/**/*',
      stylesheets: 'source/stylesheets/**/*',
      javascripts: 'source/javascripts/**/*'
    },

    build: {
      public: 'build',
      pages: 'build',
      stylesheets: 'build/stylesheets',
      javascripts: 'build/javascripts'
    }
  }
};
var options = { config: config };
var build = {
  public: require('./build/public')(options),
  pages: require('./build/pages')(options),
  stylesheets: require('./build/stylesheets')(options),
  javascripts: require('./build/javascripts')(options)
};

var combiner = require('stream-combiner2').obj;

var buildTask = function(name, options) {
  var gulp = options.gulp;

  gulp.task('fuji:build:' + name, function() {
    var streams = build[name].slice();
    streams.unshift(gulp.src(config.paths.source[name]));
    streams.push(gulp.dest(config.paths.build[name]));
    combiner(streams);
  });
}

module.exports = function(options) {
  var gulp = options.gulp;
  var config = config;

  buildTask('public', options);
  buildTask('pages', options);
  buildTask('stylesheets', options);
  buildTask('javascripts', options);

  gulp.task('fuji:build', [
    'fuji:build:public',
    'fuji:build:pages',
    'fuji:build:stylesheets',
    'fuji:build:javascripts'
  ]);
};

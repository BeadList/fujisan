/*global module, require */

var chainedPreprocessors = require('gulp-chained-preprocessors');
module.exports = function(options) {
  var gulp = options.gulp;
  var config = options.config;

  gulp.task('fuji:build:pages', function(){
    return gulp.src('source/pages/**/*')
      .pipe(chainedPreprocessors({all: {}}))
      .pipe(gulp.dest('build'));
  });

  gulp.task('fuji:build:public', function(){
    return gulp.src('source/public/**/*')
      .pipe(gulp.dest('build'));
  });

  gulp.task('fuji:build', ['fuji:build:pages', 'fuji:build:public']);
};

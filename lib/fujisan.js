module.exports = function(options) {
  var gulp = options.gulp;
  var config = options.config;

  gulp.task('fuji:build', function(){
    return gulp.src('source/public/**/*')
      .pipe(gulp.dest('build'));
  });
};

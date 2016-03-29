var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('acceptance-test', function() {
  return gulp.src('test/acceptance-test.js', { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 10000 }));
});


gulp.task('unit-test', function() {
  return gulp.src('test/unit-tests/**/*-test.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test', gulp.parallel('acceptance-test', 'unit-test'));

gulp.task('default', gulp.parallel('test'));

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('acceptance-test', function() {
  return gulp.src('test/acceptance-test.js', { read: false })
    .pipe(mocha({ reporter: 'spec', timeout: 10000 }));
});

gulp.task('unit-test', function() {
  return gulp.src('test/unit-tests/**/*-test.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('lint', () => {
  return gulp.src(['lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', gulp.parallel('lint','acceptance-test', 'unit-test'));

gulp.task('default', gulp.parallel('test'));

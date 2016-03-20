/*global requrie */
var gulp = require('gulp');
var fujisan = require('../../../lib/fujisan');
var combiner = require('stream-combiner2').obj;
var pages = fujisan.streams({
  gulp: gulp
}).build.pages;

gulp.task('default', function() {
  pages.unshift(gulp.src(fujisan.options.config.paths.source['pages']));
  pages.push(gulp.dest(fujisan.options.config.paths.build['pages']));
  return combiner(pages);
});

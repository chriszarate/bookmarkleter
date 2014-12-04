'use strict';

var gulp = require('gulp');

var jshint = require('gulp-jshint');
gulp.task('lint', function () {
  gulp.src(['*.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

var browserify = require('browserify');
var ngAnnotate = require('gulp-ng-annotate');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

var browserified = transform(function (filename) {
  var b = browserify(filename);
  return b.bundle();
});

gulp.task('browserify', function () {
  gulp.src(['browser-tool.js'])
    .pipe(ngAnnotate())
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

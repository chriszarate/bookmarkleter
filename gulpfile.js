'use strict';

var gulp = require('gulp');

// Lint
var jshint = require('gulp-jshint');
gulp.task('lint', function () {
  gulp.src(['*.js', 'test/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Clean
var clean = require('gulp-clean');
gulp.task('clean', function () {
  gulp.src('build', {read: false})
    .pipe(clean());
});

// Browserify
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
gulp.task('browserify', function () {
  gulp.src('browser-tool.js')
    .pipe(ngAnnotate())
    .pipe(browserify())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./build'));
});

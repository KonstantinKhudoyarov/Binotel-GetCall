"use strict";

var gulp = require('gulp');
var concatCSS = require('gulp-concat-css');
var rename = require("gulp-rename");
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//css
gulp.task('scss', function() {
  gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

//html
gulp.task('html', function() {
   gulp.src('app/index.html')
    .pipe(connect.reload());
});

//watch
gulp.task('watch', function(){
    gulp.watch(['scss/main.scss', 'scss/_misc/*.scss', 'scss/sections/*.scss'],  ['scss'])
    gulp.watch('app/index.html', ['html']);
});

//default
gulp.task('default', ['connect', 'scss', 'html', 'watch']);

var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var jasmine = require('gulp-jasmine');
var concat = require('gulp-concat');

gulp.task('default', function() {
    gulp.src(['assets/typescript/emola/*.ts'])
        .pipe(ts())
        .pipe(concat('emola.js'))
        .pipe(gulp.dest('../resources/public/js/build/'));
});

gulp.task('test', ['default'], function() {
    gulp.src(['spec/*Spec.js', '../resources/public/js/build/emola.js'])
    .pipe(jasmine());
});

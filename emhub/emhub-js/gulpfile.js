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
    gulp.src([
        '../resources/public/js/lib/jquery/dist/jquery.js',
        '../resources/public/js/lib/jquery-console/jquery.console.js',
        '../resources/public/js/build/emola.js',
        'spec/*Spec.js',
    ])
    .pipe(concat("spec.js"))
    .pipe(gulp.dest('assets/'));
    gulp.src('assets/spec.js')
    .pipe(jasmine())
});

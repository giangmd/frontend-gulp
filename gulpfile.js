"use strict";

const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require('gulp');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const csso = require('gulp-csso');

function clean() {
    console.log("Delete build folder");

    return del(["./dist/"]);
}

function sassTask() {
    console.log("Sass task run");

    return gulp.src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(csso())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css/'));
}

function styles() {
    console.log("Styles task run");

    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/@fortawesome/fontawesome-free/css/all.css',
            'src/css/**/*.css'
        ])
        .pipe(csso())
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest('dist/css'));
}

function scriptsLint() {
    return gulp
        .src(["dist/js/**/*", "./gulpfile.js"])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function scripts() {
    console.log("Scripts task run");

    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/js/**/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('dist/js'));
}

function images() {
    console.log("Images task run");

    return gulp.src([
            'src/images/**/*'
        ])
        .pipe(gulp.dest('dist/images'));
}

function html() {
    console.log("HTML task run");

    return gulp.src(['src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/partials'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'));
}

function watch() {
    gulp.watch('src/scss/**/*.scss', sassTask);
    gulp.watch('src/css/**/*.css', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/images/**/*', images);
    gulp.watch('src/**/*.html', html);
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(styles, scripts, sassTask, images, html));

// export tasks
exports.clean = clean;
exports.sassTask = sassTask;
exports.styles = styles;
exports.js = js;
exports.images = images;
exports.html = html;
exports.watch = watch;
exports.build = build;

exports.default = build;
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    clean = require('gulp-rimraf'),
    runSequence = require('run-sequence');

gulp.task('clean', [], function() {
    console.log("Clean all files in build folder");

    return gulp.src("dist/*", { read: false }).pipe(clean());
});

gulp.task('sass', function() {
    console.log("Sass task run");

    gulp.src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(csso())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('css', function() {
    console.log("Css task run");

    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/@fortawesome/fontawesome-free/css/all.css',
            'src/css/**/*.css'
        ])
        .pipe(csso())
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
    console.log("JS task run");

    gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/js/**/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
    console.log("Images task run");

    gulp.src([
            'src/images/**/*'
        ])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('html', function () {
    console.log("HTML task run");

    gulp.src(['src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/partials'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
    runSequence('clean', 'sass', 'css', 'js', 'images', 'html', function() {
        console.log('Run task done');
        // done();
    });
});

gulp.task('watch', function() {
    gulp.run('default');

    gulp.watch('src/scss/**/*.scss', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('sass');
    });

    gulp.watch('src/css/**/*.css', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('css');
    });

    gulp.watch('src/js/**/*.js', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('js');
    });

    gulp.watch('src/images/**/*', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('images');
    });

    gulp.watch('src/**/*.html', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('html');
    });
});




// imported packages

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css')
    sass = require('gulp-sass');


// sass-to css compilation and minification

var sassInput = 'src/sass/*.scss';
var cssOutput = 'dest';
    gulp.task('sass', function() {
        return gulp.src(sassInput)
            .pipe(sass())
            .pipe(minifyCSS())
            .pipe(concat('style.css'))
            .pipe(gulp.dest(cssOutput));
    });    


// js minification

var jsInput = [
    'node_modules/jquery/dist/jquery.js',
    'src/js/*.js'
];
var jsOutput = 'dest';
gulp.task('js', function() {
    return gulp.src(jsInput)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(jsOutput));
});


// default gulp task

gulp.task('default', ['js','sass','watch']);


// watch task 

gulp.task('watch', function() {

    gulp.watch(sassInput, ['sass']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      });

    gulp.watch('src/js/*.js', ['js']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      });
});
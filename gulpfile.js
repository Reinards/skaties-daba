var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber'); // Prevent pipe breaking errors



gulp.task('sass',function(){

    return gulp.src(['src/styles/*.scss'])
            .pipe(plumber())
            .pipe(sass())
            .pipe(cssmin())
            .pipe(gulp.dest('skaties_daba/www/css'))

});

gulp.task('pug',function() {
    return gulp.src('src/pugs/*.jade')
                .pipe(pug({doctype: 'html',pretty: false}))
                .pipe(gulp.dest('skaties_daba/www/'));
});

gulp.task('watch', ['sass','pug'], function(){
    gulp.watch(['src/styles/*.scss'],['sass']);
    gulp.watch(['src/pugs/*.jade'],['pug']);
});
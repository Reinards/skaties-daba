var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber'); // Prevent pipe breaking errors

var css_path = 'cordova/skaties-daba/www/css/';
var html_path = 'cordova/skaties-daba/www/';


gulp.task('sass',function(){

    return gulp.src(['src/styles/*.scss'])
            .pipe(plumber())
            .pipe(sass())
            .pipe(cssmin())
            .pipe(gulp.dest(css_path))

});

gulp.task('pug',function() {
    return gulp.src('src/pugs/*.jade')
                .pipe(pug({doctype: 'html',pretty: false}))
                .pipe(gulp.dest(html_path));
});

// gulp.task('watch', ['sass','pug'], function(){
//     gulp.watch(['src/styles/*.scss'],['sass']);
//     gulp.watch(['src/pugs/*.jade'],['pug']);
// });

// gulp.task('watch', gulp.series(function(){
//     gulp.watch(['src/styles/*.scss'],['sass']);
//     gulp.watch(['src/pugs/*.jade'],['pug']);
// }));

gulp.task('watch', gulp.series(gulp.parallel('sass', 'pug'), function () {
    gulp.watch(['src/styles/*.scss'],gulp.series('sass'));
    gulp.watch(['src/pugs/*.jade'],gulp.series('pug'));
  }))
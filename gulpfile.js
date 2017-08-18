var gulp = require('gulp'),
    minifyCss = require("gulp-minify-css"),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect');


gulp.task('minify', function() {
    var assets = useref.assets();

    return gulp.src('src/*.html')
        .pipe(assets)
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});


gulp.task('serve', function() {
    connect.server({
        livereload: true
    });
});


gulp.task('watch', function() {
    gulp.watch('src/assets/*.css', ['minify']);
    gulp.watch('src/assets/*.js', ['minify']);
});


gulp.task('default', ['minify', 'serve', 'watch']);

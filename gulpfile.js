var gulp = require('gulp'),
    minifyCss = require("gulp-minify-css"),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

gulp.task('minify-css', function () {
    var assets = useref.assets();

    return gulp.src('src/map.html')
        .pipe(assets)
        .pipe(minifyCss())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist/'));
});

gulp.task('minify-js', function () {
    return gulp.src('src/assets/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/'));
});

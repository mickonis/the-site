/* File: gulpfile.js */
var gulp            = require('gulp');
var cache           = require('gulp-cache');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync').create();
var imagemin        = require('gulp-imagemin');
var nunjucksRender  = require('gulp-nunjucks-render');
var htmlbeautify    = require('gulp-html-beautify');
var sassLint        = require('gulp-sass-lint');
var cssmin          = require('gulp-cssmin');

//sass to css
gulp.task('sass', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//browsersync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

//optimize images
gulp.task('images', function(){
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('app/img/'))
});

//beutify html
gulp.task('htmlbeautify', function() {
    gulp.src('app/*.html')
        .pipe(htmlbeautify({indentSize: 4, preserve_newlines: false}))
        .pipe(gulp.dest('app/'))
});

//css minify
gulp.task('minify', function () {
    gulp.src('app/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'));
});

gulp.task('sass-lint', function () {
  return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

//templating
gulp.task('nunjucks', function() {
    return gulp.src('app/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
        path: ['app/templates']
    }))
    .pipe(gulp.dest('app'))
});

//watch
gulp.task('default', ['browserSync'], function() {
    gulp.watch('app/sass/**/*.scss',['sass']);
    gulp.watch('app/sass/**/*.scss',['sass-lint']);
    gulp.watch(['app/pages/**/*.+(html|nunjucks)', 'app/templates/**/*.+(html|nunjucks)'], ['nunjucks']);
    gulp.watch('app/*.html',['htmlbeautify']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    postcss = require('gulp-postcss'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function() {
  return gulp.src('src/css/**/*.less')
    .pipe(less())
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('csstools', function() {
  return gulp.src(['src/tools/light7.min.css','src/tools/swiper.min.css'])
    .pipe(concat('tools.css'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'csstools task complete' }));
});

gulp.task('jstools', function() {
  return gulp.src(['src/tools/jquery-2.1.4.min.js','src/tools/light7.min.js','src/tools/swiper.min.js','src/tools/vue.min.js','src/tools/hammer.js','src/tools/vue-touch.min.js'])
    .pipe(concat('tools.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'jstools task complete' }));
});

gulp.task('clean', function() {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'])
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'csstools','jstools','watch');
});

gulp.task('watch', function() {
  // Watch .css files
  gulp.watch('src/css/**/*.less', ['styles']);
  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('src/img/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});

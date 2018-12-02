const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      concat = require('gulp-concat'),
      eslint = require('gulp-eslint'),
      handlebars = require('gulp-handlebars'),
      htmlmin = require('gulp-htmlmin'),
      merge = require('merge-stream'),
      sass = require('gulp-sass');

const src = './src',
      dist = './dist';

gulp.task('serve', ['sass', 'minify', 'scripts'], function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(src + '/styles/**/*.scss', ['sass'])
    gulp.watch(src + '**/*.html', ['minify'])
    gulp.watch(src + '**/*.js', ['scripts'])

});

gulp.task('sass', function(){
    return gulp.src(src + '/styles/**/*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist + '/css'))
        .pipe(browserSync.stream());
});

gulp.task('minify', function(){
    return gulp.src(src + '/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist));
});

gulp.task('scripts', function(){
    const hbsStream = gulp.src(src + '/templates/*.hbs').pipe(handlebars());
    const jsStream = gulp.src(src + '/js/*.js');
    
    return merge(hbsStream, jsStream)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(dist + '/js'));
});

gulp.task('default', ['serve']);
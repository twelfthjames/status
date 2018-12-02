const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      concat = require('gulp-concat'),
      eslint = require('gulp-eslint'),
      handlebars = require('gulp-handlebars'),
      htmlmin = require('gulp-htmlmin'),
      sass = require('gulp-sass');

const src = './src',
      dist = './dist';

gulp.task('serve', ['sass', 'minify', 'templates'], function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(src + '/styles/**/*.scss', ['sass'])
    gulp.watch(src + '/templates/*.hbs', ['templates'])
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
    
});

gulp.task('templates', function(){
    gulp.src(src + '/templates/*.hbs')
        .pipe(handlebars())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(dist + '/js'));
});

gulp.task('default', ['serve']);
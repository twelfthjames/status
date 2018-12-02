const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      concat = require('gulp-concat'),
      eslint = require('gulp-eslint'),
      sass = require('gulp-sass');

const src = './src',
      dist = './dist';

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(src + '/styles/**/*.scss', ['sass'])
});

gulp.task('sass', function(){
    return gulp.src(src + '/styles/**/*.scss')
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist + '/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
    
});

gulp.task('default', ['serve']);
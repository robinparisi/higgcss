"use strict";

const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const paths = {
    less: {
        src: 'less/style.less',
        dest: 'demo/',
        watch: 'less/**'
    },
    html: {
        watch: 'demo/**/*.html'
    }
};

gulp.task('less', function () {
    gulp.src(paths.less.src)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.less.dest))
        .pipe(reload({stream:true}));
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "demo",
            directory: true
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(paths.less.watch, ['less']);
    gulp.watch(paths.html.watch, ['bs-reload']);

});

gulp.task('default', ['less']);

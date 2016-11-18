"use strict";

import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

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

gulp.task('less', () => {
    gulp.src(paths.less.src)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.less.dest))
        .pipe(reload({stream:true}));
});


gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "demo",
            directory: true
        }
    });
});

gulp.task('bs-reload', () => {
    browserSync.reload();
});


gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(paths.less.watch, ['less']);
    gulp.watch(paths.html.watch, ['bs-reload']);

});

gulp.task('default', ['less']);

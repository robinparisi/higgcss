"use strict";

import gulp from 'gulp';
import sass from'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

const paths = {
    sass: {
        src: 'sass/style.scss',
        dest: 'demo/',
        watch: 'sass/**'
    },
    html: {
        watch: 'demo/**/*.html'
    }
};

gulp.task('sass', () => {
    gulp.src(paths.sass.src)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.sass.dest))
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
    gulp.watch(paths.sass.watch, ['sass']);
    gulp.watch(paths.html.watch, ['bs-reload']);
});

gulp.task('default', ['sass']);

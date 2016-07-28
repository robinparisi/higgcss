var gulp            = require('gulp');
var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

var paths = {
    less: {
        src: 'less/style.less',
        dest: 'demo/',
        watch: 'less/**'
    },
    html: {
        watch: 'demo/**/*.html'
    },
    csscomb : {
        src: [
            'less/**',
            '!less/1.base/_00-mixins.less',
            '!less/1.base/_05-spacing.less',
            '!less/1.base/_07-width.less',
            '!less/1.base/_08-grid.less',
            '!less/2.structure/_02-icons.less',
            '!less/5.vendors/**'
        ],
        dest: 'less/'
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

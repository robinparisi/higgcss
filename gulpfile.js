var gulp            = require('gulp');
var less            = require('gulp-less');
var minifyCSS       = require('gulp-minify-css');
var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

var paths = {
    less: {
        src: 'assets/_less/style.less',
        dest: 'assets/css',
        watch: 'assets/_less/**'
    }
};

gulp.task('less', function () {
    gulp.src(paths.less.src)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
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



gulp.task('watch', function () {
    gulp.watch(paths.less.watch, ['less']);
});

gulp.task('default', ['less']);


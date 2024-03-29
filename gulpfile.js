const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

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

const runSass = () => {
    return gulp.src(paths.sass.src)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(browserSync.stream({ match: '**/*.css' }));
};

const bs = () => {
    browserSync({
        server: {
            baseDir: "demo",
            directory: true
        },
        open: false
    });
};

exports.watch = gulp.series(runSass, () => {
        browserSync.init({
            server: {
                baseDir: "demo",
                directory: true
            },
            open: false
        });

        gulp.watch(paths.sass.watch, gulp.series(runSass));
        gulp.watch(paths.html.watch).on('change', browserSync.reload);
})

exports.default = gulp.series(runSass);

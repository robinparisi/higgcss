const gulp          = require('gulp');
const autoprefixer  = require('gulp-autoprefixer');
const cp            = require('child_process');
const plumber       = require('gulp-plumber');
const less          = require('gulp-less');
const cleanCSS      = require('gulp-clean-css');
const imagemin      = require('gulp-imagemin');
const pngquant      = require('imagemin-pngquant');
const uglify        = require('gulp-uglify');
const concat        = require('gulp-concat');

const browserSync   = require('browser-sync');
const reload        = browserSync.reload;

/* config
---------------------------------------------------- */

var messages = {
    jekyllBuild: 'Jekyll is building...'
};

var env = {
    'PROD': true
}

var srcFolder =  'src';
var distFolder = 'dist';

var PATHS = {
    less: {
        src: srcFolder + '/_assets/_less/style.less',
        dest: distFolder + '/assets/css',
        watch: srcFolder + '/_assets/_less/**/*'
    },
    js : {
        src: srcFolder + '/_assets/_js/**/*.js',
        dest: distFolder + '/assets/js',
        watch: srcFolder + '/_assets/_js/**/*'
    },
    jsBundle : {
        src: srcFolder + '/_assets/_js/*.js',
        dest: distFolder + '/assets/js/',
        watch: srcFolder + '/_assets/_js/*.js'
    },
    img: {
        src: srcFolder + '/_assets/_img/**/*',
        dest: distFolder + '/assets/img/',
        watch: srcFolder + '/_assets/_img/**/*'
    }
};

/* taks
---------------------------------------------------- */

/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
* Rebuild Jekyll & reload page
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
* Wait for jekyll-build, then launch the Server
*/
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

/**
* Compile less files
*/
gulp.task('less', function () {
    return gulp.src(PATHS.less.src)
    .pipe(plumber())
    .pipe(less().on('error', function(err){
        gutil.log(err);
        this.emit('end');
    }))
    .pipe(autoprefixer({
        browsers: ['> 1%', 'last 3 versions'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(PATHS.less.dest))
    .pipe(reload({stream:true}));
});

/**
* Minify images
*/
gulp.task('imagemin', function () {
    return gulp.src(PATHS.img.src)
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(PATHS.img.dest));
});

/**
* Minify JS files with UglifyJS
*/
gulp.task('uglify', function() {
    return gulp.src([PATHS.js.src, "!" + PATHS.jsBundle.src])
    .pipe(plumber())
    .pipe(uglify({
        outSourceMap: true,
        mangle: env.PROD,
        output: {
            beautify: !env.PROD
        }
    }))
    .pipe(gulp.dest(PATHS.js.dest))
});

/**
* Concat JS files
*/
gulp.task('concat', function() {
    return gulp.src(PATHS.jsBundle.src)
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(uglify({
        outSourceMap: true,
        mangle: env.PROD,
        output: {
            beautify: !env.PROD
        }
    }))
    .pipe(gulp.dest(PATHS.jsBundle.dest))
});

/**
* Watch files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(PATHS.less.watch, ['less']);
    gulp.watch(PATHS.js.watch, ['uglify']);
    gulp.watch(PATHS.jsBundle.watch, ['concat']);
    gulp.watch(PATHS.img.watch, ['imagemin']);

    gulp.watch(['src/index.html', 'src/_layouts/*.html', 'src/_posts/*', '_config.yml'], ['jekyll-rebuild']);
});

/**
* Compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['jekyll-build', 'less', 'uglify', 'concat', 'imagemin']);

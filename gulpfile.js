var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var autoprefixer  = require('gulp-autoprefixer');
var cp            = require('child_process');
var plumber       = require('gulp-plumber');
var less          = require('gulp-less');
var minifyCSS     = require('gulp-minify-css');
var imagemin      = require('gulp-imagemin');
var pngquant      = require('imagemin-pngquant');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var ghPages       = require('gulp-gh-pages');
var read          = require('read-yaml');

var reload        = browserSync.reload;
var config        = read.sync('_config.yml');

/* config
---------------------------------------------------- */

var messages = {
    jekyllBuild: 'Jekyll is building...'
};

var env = {
    'PROD': true
}

var srcFolder =  'src';
var distFolder = config.destination;

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
gulp.task('browser-sync', ['less', 'imagemin', 'concat', 'uglify', 'jekyll-build'], function() {
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
    .pipe(env.PROD ? minifyCSS() : gutil.noop())
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
    console.log(PATHS.jsBundle.src);
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
* Deploy static site to Github
*/
gulp.task('deploy', function() {
    return gulp.src(distFolder + '/**/*')
    .pipe(ghPages());
});

/**
* Watch files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
    gulp.watch(PATHS.less.watch, ['less']);
    gulp.watch(PATHS.js.watch, ['uglify']);
    gulp.watch(PATHS.jsBundle.watch, ['concat']);
    gulp.watch(PATHS.img.watch, ['imagemin']);

    gulp.watch(['src/index.html', 'src/_layouts/*.html', 'src/**/*.md', 'src/_posts/*'], ['jekyll-rebuild']);
});

/**
* Compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['browser-sync', 'watch']);

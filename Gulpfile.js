var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    reactify = require('reactify'),
    streamify = require('gulp-streamify'),
    notify = require('gulp-notify'),
    uglify   = require('gulp-uglify');


function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({ title: "Compile Error", message: "<%= error.message %>"}).apply(this, args);
    this.emit('end');
}

function build(isWatching) {
    var bundler = browserify('./react/main.js', {
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: isWatching,
        transform : [babelify, reactify]
    });

    var bundle = function() {
        return bundler
            .bundle()
            .on('error', handleErrors)
            .pipe(source('./main.js'))
            .pipe(gulp.dest('./public/js'));
    };

    if (isWatching){

        bundler = watchify(bundler).on('update', bundle);
        bundle();
    }else{
        bundler
            .bundle()
            .on('error', handleErrors)
            .pipe(source('./main.js'))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest('./public/js'))
    }
}

gulp.task('build', [], function() { return build(false); });
gulp.task('watch', [], function() { return build(true); });
gulp.task('default', []);


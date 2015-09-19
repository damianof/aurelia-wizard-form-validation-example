var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var less = require('gulp-less');
var path = require('path');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
    return gulp.src(paths.source)
        .pipe(plumber())
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(paths.output));
});

gulp.task('copy-jspm', function () {
    return gulp.src(paths.root + 'jspm_packages/**/*')
        .pipe(gulp.dest(paths.output + 'jspm_packages/'));
});

gulp.task('copy-config', function () {
    return gulp.src(paths.root + 'config.js')
        .pipe(gulp.dest(paths.output));
});

gulp.task('build-less', function () {
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            //plugins: [cleancss]
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.output));
});


// copies changed html files to the output directory
gulp.task('build-html', function () {
    return gulp.src(paths.html)
        .pipe(changed(paths.output, {extension: '.html'}))
        .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-html', 'build-less', 'copy-jspm', 'copy-config'],
        callback
    );
});
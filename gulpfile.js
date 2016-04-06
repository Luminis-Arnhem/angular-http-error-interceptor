var gulp = require('gulp');
var streamqueue = require('streamqueue');
var p = require('gulp-load-plugins')();

var config = require('./gulp.config.js')();

var tsProject = p.typescript.createProject({
    declaration: true,
    noExternalResolve: true,
    module: "system",
    target: "ES5",
    sortOutput: true
});

var copy = function (source) {
    return gulp.src(source)
        .pipe(gulp.dest(config.output));
};

var compileTS = function () {
    var tsFilter = p.filter('src/**/*.ts', { restore: true });
    var tsResult = gulp.src(config.tsScriptFiles)
        .pipe(p.replace(new RegExp('/// <reference path=".*" />', "g"), '//Type definition file removed'))
        .pipe(tsFilter)
        .pipe(p.license('MIT', { tiny: false, organization: 'Luminis' }))
        .pipe(gulp.dest('./dist/ts/'))
        .pipe(tsFilter.restore)
        .pipe(p.typescript(tsProject));
    tsResult.dts
        .pipe(gulp.dest(config.output + '/typings'));
    tsResult.js
        .pipe(p.ngAnnotate())

    var translations = gulp.src(config.translationFiles)
      .pipe(p.angularTranslate({ module: "translations-interceptor" }));
    streamqueue({ objectMode: true }, tsResult, translations)
        .pipe(p.concat('angular-http-error-interceptor.js'))
        .pipe(gulp.dest(config.output + '/js'))
        .pipe(p.uglify({
            preserveComments: 'license'
        }))
        .pipe(p.rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest('./dist/js/'));
}
gulp.task('compileTS', function () {
    return compileTS();
});
gulp.task('clean', function () {
    return gulp.src([config.output], { read: false })
		.pipe(p.clean());
});
gulp.task('setVersion', function () {
    gulp.src(config.versionFiles)
        .pipe(p.bump({ version: config.appVersion }))
        .pipe(gulp.dest('./'));
});

gulp.task('clean-example', function () {
    gulp.src('example/**/*.js')
        .pipe(p.clean());
});

gulp.task('compile-example', ['clean-example'], function () {
    var tsResult = gulp.src(['example/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(p.typescript(tsProject));
    tsResult.js
    .pipe(p.ngAnnotate())
    .pipe(gulp.dest('example'));
});

gulp.task('default', ['clean', 'setVersion'], function () {
    return gulp.start('compileTS');
});
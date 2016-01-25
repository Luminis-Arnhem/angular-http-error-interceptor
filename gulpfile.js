var gulp = require('gulp');
var streamqueue = require('streamqueue');
var p = require('gulp-load-plugins')();

var src = 'src';
var appVersion = '0.1.1';
var output = 'dist';
var typesSrc = 'typings';
var tsScriptFiles = [typesSrc + '/**/*.ts', src + '/**/*.ts'];
var versionFiles = ['./bower.json', './package.json'];
var translationFiles = src + '/**/i18n/**/*.json';

var tsProject = p.typescript.createProject({
    declaration: true,
    noExternalResolve: true,
    module: "system",
    target: "ES5",
    sortOutput: true
});

var copy = function (source) {
    return gulp.src(source)
        .pipe(gulp.dest(output));
};

var compileTS = function () {
    var tsResult = gulp.src(tsScriptFiles)
        .pipe(p.replace(new RegExp('/// <reference path=".*" />', "g"), '//Type definition file removed'))
        .pipe(p.typescript(tsProject));
    tsResult.dts
        .pipe(gulp.dest(output + '/typings'));
    tsResult.js
        .pipe(p.ngAnnotate())

    var translations = gulp.src(translationFiles)
      .pipe(p.angularTranslate({ module: "translations-interceptor" }));
    streamqueue({ objectMode: true }, tsResult, translations)
        .pipe(p.concat('angular-http-error-interceptor.js'))
        .pipe(gulp.dest(output + '/js'));
}
gulp.task('compileTS', function () {
    return compileTS();
});
gulp.task('clean', function () {
    return gulp.src([output], { read: false })
		.pipe(p.clean());
});
gulp.task('setVersion', function () {
    gulp.src(versionFiles)
        .pipe(p.bump({ version: appVersion }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['clean', 'setVersion'], function () {
    return gulp.start('compileTS');
});
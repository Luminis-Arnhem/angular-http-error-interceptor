module.exports = function () {
  var src = 'src';
  var appVersion = '0.1.1';
  var output = 'dist';
  var typesSrc = 'typings';
  var tsScriptFiles = [typesSrc + '/**/*.ts', src + '/**/*.ts'];
  var versionFiles = ['./bower.json', './package.json'];
  var translationFiles = src + '/**/i18n/**/*.json';

  var config = {
      src: src,
      appVersion: appVersion,
      output: output,
      typesSrc: typesSrc,
      tsScriptFiles: tsScriptFiles,
      versionFiles: versionFiles,
      translationFiles: translationFiles,
  }
  return config;
};
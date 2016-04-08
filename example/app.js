/// <reference path="../typings/tsd.d.ts" />
var app;
(function (app) {
    app.main = angular.module("main", ["http-error-interceptor"]);
    //The code below is optional
    app.main.config(["$translateProvider", function ($translateProvider) {
        $translateProvider.preferredLanguage('en');
    }]);
})(app || (app = {}));

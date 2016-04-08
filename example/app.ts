/// <reference path="../typings/tsd.d.ts" />

namespace app {

    export let main: angular.IModule = angular.module("main", ["http-error-interceptor"]);

    //The code below is optional
    main.config(($translateProvider: ng.translate.ITranslateProvider) => {
        $translateProvider.preferredLanguage('en');
    });
}
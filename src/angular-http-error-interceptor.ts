/// <reference path="../typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var module: angular.IModule = angular.module('http-error-interceptor', ['translations', 'toastr']);
module Common {
    export interface IInterceptor {
        request: Function;
        requestError: Function;
        response: Function;
        responseError: Function;
    }

    export class HttpErrorInterceptor implements IInterceptor {
        public static $inject = ["$injector", "$q", "toastr", "$filter"];

        public static Factory($injector: angular.auto.IInjectorService, $q: angular.IQService, toastr: any, $filter: angular.IFilterService) {
            return new HttpErrorInterceptor($injector, $q, toastr, $filter);
        }

        constructor(private $injector: angular.auto.IInjectorService, private $q: angular.IQService, private toastr: any, private $filter: angular.IFilterService) {
        }

        public request = (requestSuccess): angular.IPromise<any> => {
            return requestSuccess;
        }
        public requestError = (requestFailure): angular.IPromise<any> => {
            var generalMessage: string = this.$filter("translate")("CONNECTION_ERROR");
            var title: string = this.$filter("translate")("SERVER_ERROR_TITLE");
            var message: string = requestFailure.data.message || this.$filter("translate")("UNKNOWN_ERROR");

            var specificMessage: string = generalMessage + message;
            this.toastr.error(specificMessage, title);
            return this.$q.reject(requestFailure);
        }
        public response = (responseSuccess): angular.IPromise<any> => {
            return responseSuccess;
        }
        public responseError = (responseFailure): angular.IPromise<any> => {
            if (responseFailure.status === 401) {
                this.toastr.warning(this.$filter("translate")("LOGGED_OUT_BY_SYSTEM"));
                window.location.reload(true);
            } else {
                var generalMessage: string = this.$filter("translate")("SERVER_ERROR");
                var title: string = this.$filter("translate")("SERVER_ERROR_TITLE");
                var message: string = responseFailure.data.message || this.$filter("translate")("UNKNOWN_ERROR");
                var specificMessage: string = generalMessage + message;
                this.toastr.error(specificMessage, title, {
                    timeOut: 0,
                    extendedTimeOut: 0,
                    closeButton: true
                });
            }
            return this.$q.reject(responseFailure);
        }
    }
};
module.factory("httpErrorInterceptor", ["$injector", "$q", "toastr", "$filter", Common.HttpErrorInterceptor.Factory]);
module.config(($httpProvider: angular.IHttpProvider) => {
    $httpProvider.interceptors.push('httpErrorInterceptor');
});
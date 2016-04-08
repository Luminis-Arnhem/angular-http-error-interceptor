/*!
 * Copyright (c) 2016 Luminis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
//Type definition file removed
//Type definition file removed
//Type definition file removed
var module: angular.IModule = angular.module('http-error-interceptor', ['pascalprecht.translate', 'translations-interceptor', 'toastr']);
module Common {
    export interface IInterceptor {
        request: Function;
        requestError: Function;
        response: Function;
        responseError: Function;
    }

    export class HttpErrorInterceptor implements IInterceptor {
        public static Factory($injector: angular.auto.IInjectorService, $q: angular.IQService, toastr: ngtoaster.IToasterService, $filter: angular.IFilterService, $window: angular.IWindowService) {
            "ngInject";
            return new HttpErrorInterceptor($injector, $q, toastr, $filter, $window);
        }
        constructor(private $injector: angular.auto.IInjectorService, private $q: angular.IQService, private toastr: ngtoaster.IToasterService, private $filter: angular.IFilterService, private $window: angular.IWindowService) {
            "ngInject";
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
                this.$window.location.reload(true);
            } else {
                var generalMessage: string = this.$filter("translate")("SERVER_ERROR");
                var title: string = this.$filter("translate")("SERVER_ERROR_TITLE");
                var message: string = responseFailure.data.message || this.$filter("translate")("UNKNOWN_ERROR");
                var specificMessage: string = generalMessage + message;
                (<any>this.toastr).error(specificMessage, title, {
                    timeOut: 0,
                    extendedTimeOut: 0,
                    closeButton: true
                });
            }
            return this.$q.reject(responseFailure);
        }
    }
};
module.factory("httpErrorInterceptor", Common.HttpErrorInterceptor.Factory);
module.config(($httpProvider: angular.IHttpProvider, $translateProvider: ng.translate.ITranslateProvider) => {
    $httpProvider.interceptors.push('httpErrorInterceptor');
    $translateProvider.preferredLanguage('nl');
    $translateProvider.useSanitizeValueStrategy('escaped');
});
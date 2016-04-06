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
var module = angular.module('http-error-interceptor', ['translations-interceptor', 'toastr']);
var Common;
(function (Common) {
    var HttpErrorInterceptor = (function () {
        HttpErrorInterceptor.$inject = ["$injector", "$q", "toastr", "$filter", "$window"];
        function HttpErrorInterceptor($injector, $q, toastr, $filter, $window) {
            "ngInject";
            var _this = this;
            this.$injector = $injector;
            this.$q = $q;
            this.toastr = toastr;
            this.$filter = $filter;
            this.$window = $window;
            this.request = function (requestSuccess) {
                return requestSuccess;
            };
            this.requestError = function (requestFailure) {
                var generalMessage = _this.$filter("translate")("CONNECTION_ERROR");
                var title = _this.$filter("translate")("SERVER_ERROR_TITLE");
                var message = requestFailure.data.message || _this.$filter("translate")("UNKNOWN_ERROR");
                var specificMessage = generalMessage + message;
                _this.toastr.error(specificMessage, title);
                return _this.$q.reject(requestFailure);
            };
            this.response = function (responseSuccess) {
                return responseSuccess;
            };
            this.responseError = function (responseFailure) {
                if (responseFailure.status === 401) {
                    _this.toastr.warning(_this.$filter("translate")("LOGGED_OUT_BY_SYSTEM"));
                    _this.$window.location.reload(true);
                }
                else {
                    var generalMessage = _this.$filter("translate")("SERVER_ERROR");
                    var title = _this.$filter("translate")("SERVER_ERROR_TITLE");
                    var message = responseFailure.data.message || _this.$filter("translate")("UNKNOWN_ERROR");
                    var specificMessage = generalMessage + message;
                    _this.toastr.error(specificMessage, title, {
                        timeOut: 0,
                        extendedTimeOut: 0,
                        closeButton: true
                    });
                }
                return _this.$q.reject(responseFailure);
            };
        }
        HttpErrorInterceptor.Factory = ["$injector", "$q", "toastr", "$filter", "$window", function ($injector, $q, toastr, $filter, $window) {
            "ngInject";
            return new HttpErrorInterceptor($injector, $q, toastr, $filter, $window);
        }];
        return HttpErrorInterceptor;
    }());
    Common.HttpErrorInterceptor = HttpErrorInterceptor;
})(Common || (Common = {}));
;
module.factory("httpErrorInterceptor", Common.HttpErrorInterceptor.Factory);
module.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push('httpErrorInterceptor');
}]);

angular.module("translations-interceptor", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("nl", {
  "SERVER_ERROR": "De server heeft een fout terug gegeven: ",
  "CONNECTION_ERROR": "Er kon geen contact worden opgenomen met de server",
  "SERVER_ERROR_TITLE": "Fout",
  "UNKNOWN_ERROR": "Er is een onbekende fout opgetreden. Neem contact op met uw systeem administrator.",
  "LOGGED_OUT_BY_SYSTEM": "Vanwege lange inactiviteit bent u uitgelogd. U wordt nu omgeleid."
});
}]);

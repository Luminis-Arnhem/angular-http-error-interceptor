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
declare var module: angular.IModule;
declare module Common {
    interface IInterceptor {
        request: Function;
        requestError: Function;
        response: Function;
        responseError: Function;
    }
    class HttpErrorInterceptor implements IInterceptor {
        private $injector;
        private $q;
        private toastr;
        private $filter;
        private $window;
        static Factory($injector: angular.auto.IInjectorService, $q: angular.IQService, toastr: ngtoaster.IToasterService, $filter: angular.IFilterService, $window: angular.IWindowService): HttpErrorInterceptor;
        constructor($injector: angular.auto.IInjectorService, $q: angular.IQService, toastr: ngtoaster.IToasterService, $filter: angular.IFilterService, $window: angular.IWindowService);
        request: (requestSuccess: any) => ng.IPromise<any>;
        requestError: (requestFailure: any) => ng.IPromise<any>;
        response: (responseSuccess: any) => ng.IPromise<any>;
        responseError: (responseFailure: any) => ng.IPromise<any>;
    }
}

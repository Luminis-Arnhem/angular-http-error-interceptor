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

/// <reference path="app.ts" />

namespace app {

    class ExampleCtrl {

        static $inject = ['$http', 'toastr']
        constructor(private $http: angular.IHttpService, private toastr: ngtoaster.IToasterService) {

        }

        doRequest() {
            this.$http({
                method: 'get',
                url: window.location.protocol + '/does/not/exist',
            }).then((response) => {
            });
        };
    };

    main.controller("ExampleCtrl", ExampleCtrl);
}
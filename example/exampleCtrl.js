/// <reference path="app.ts" />
var app;
(function (app) {
    var ExampleCtrl = (function () {
        function ExampleCtrl($http, toastr) {
            this.$http = $http;
            this.toastr = toastr;
        }
        ExampleCtrl.prototype.doRequest = function () {
            this.$http({
                method: 'get',
                url: window.location.protocol + '/does/not/exist',
            }).then(function (response) {
            });
        };
        ;
        ExampleCtrl.$inject = ['$http', 'toastr'];
        return ExampleCtrl;
    }());
    ;
    app.main.controller("ExampleCtrl", ExampleCtrl);
})(app || (app = {}));

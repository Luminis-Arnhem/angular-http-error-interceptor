/// <reference path="app.ts" />
var app;
(function (app) {
    var ExampleCtrl = (function () {
        function ExampleCtrl($http, toastr) {
            this.$http = $http;
            this.toastr = toastr;
        }
        ExampleCtrl.prototype.do404Request = function () {
            this.$http({
                method: 'get',
                url: window.location.protocol + '/does/not/exist',
            }).then(function (response) {
            });
        };
        ;
        ExampleCtrl.prototype.do401Request = function () {
            this.$http({
                method: 'get',
                url: 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139',
            }).then(function (response) {
            });
        };
        ;
        ExampleCtrl.prototype.do400Request = function () {
            this.$http({
                method: 'get',
                url: 'https://www.googleapis.com/books/v1/users/userId/bookshelves',
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

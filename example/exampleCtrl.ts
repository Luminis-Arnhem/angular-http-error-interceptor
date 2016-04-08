/// <reference path="app.ts" />

namespace app {

    class ExampleCtrl {

        static $inject = ['$http', 'toastr']
        constructor(private $http: angular.IHttpService, private toastr: ngtoaster.IToasterService) {

        }

        do404Request() {
            this.$http({
                method: 'get',
                url: window.location.protocol + '/does/not/exist',
            }).then((response) => {
            });
        };

        do401Request() {
            this.$http({
                method: 'get',
                url: 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139',
            }).then((response) => {
            });
        };

        do400Request() {
            this.$http({
                method: 'get',
                url: 'https://www.googleapis.com/books/v1/users/userId/bookshelves',
            }).then((response) => {
            });
        };
    };

    main.controller("ExampleCtrl", ExampleCtrl);
}
#Useage
Include dist/js/angular-http-error-interceptor.js in your project

Optionally add typescript definition file dist/typings/angular-http-error-interceptor.d.ts
```javascript
var app = angular.module('exampleApp', ['http-error-interceptor']);
```
Optionally change language

TypeScript:
```typescript
main.config(($translateProvider: ng.translate.ITranslateProvider) => {
    $translateProvider.preferredLanguage('en');
});
```
JavaScript:
```javascript
app.main.config(["$translateProvider", function ($translateProvider) {
    $translateProvider.preferredLanguage('en');
}]);
```
#Features
Shows toast notifications based on the translation files.
Error codes currently supported:

| Error         | Message
| ------------- |:-------------:|
| 401           | LOGGED_OUT_BY_SYSTEM
| requestError  | CONNECTION_ERROR
| responseError | SERVER_ERROR
#Languages
1. NL
2. EN

#Develop
npm install

bower install

tsd install

#Release
gulp

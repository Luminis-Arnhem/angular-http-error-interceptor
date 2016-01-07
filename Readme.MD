#Useage
Include dist/js/angular-http-error-interceptor.js in your project

Optionally add typescript definition file dist/typings/angular-http-error-interceptor.d.ts
```javascript
var app = angular.module('exampleApp', ['http-error-interceptor']);
```

#Features
shows toast notifications based on the translation files.
error codes currently supported:

| Error         | Message
| ------------- |:-------------:|
| 401           | LOGGED_OUT_BY_SYSTEM
| requestError  | CONNECTION_ERROR
| responseError | SERVER_ERROR
#Languages
1. NL

#Develop
npm install

bower install

tsd install

#Release
gulp


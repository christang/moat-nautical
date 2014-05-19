'use strict';

angular
  .module('airportApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'google-maps'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });

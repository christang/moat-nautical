'use strict';

angular
  .module('airportApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'google-maps'
  ])

  .directive('autoComplete', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        var unwatch;
        function setAutoComplete(variable) {
          // set autocomplete whenever scope variable changes
          unwatch = scope.$watch(
            function watchFor() {
              return scope[variable];
            },
            function onChange(newVal, oldVal) {
              element.autocomplete({
                source: newVal,
                select: function (e, o) {
                  ctrl.$setViewValue(o.item.value); 
                  scope.$apply();
                }
              });
            });
        }
        // set autocomplete whenever attribute changes
        attrs.$observe('autoComplete', function(newVal, oldVal) {
          if (unwatch) unwatch();
          setAutoComplete(newVal);
        });
      }
    };
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });

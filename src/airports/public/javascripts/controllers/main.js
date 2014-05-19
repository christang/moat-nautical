'use strict';

angular.module('airportApp')
  .controller('MainCtrl', function ($scope) {
    $scope.map = {
      center: {
        latitude: 38,
        longitude: -93
      },
      zoom: 4
    };
  });

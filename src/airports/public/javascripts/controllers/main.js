'use strict';

var M2NMi = 0.000539957; // meters to nautical miles 

angular.module('airportApp')
  .controller('MainCtrl', ['$scope', '$resource', function ($scope, $resource) {

    var Airports = $resource('/airports'),
        airports = Airports.get({}, function(data) {
          $scope.airports = airports = data.airports;
          checkAirport(0)($scope.airport[0].key);
          checkAirport(1)($scope.airport[1].key);
        });

    var LatLng = {
      from: function (data) {
        return new google.maps.LatLng(data.latitude, data.longitude);
      }
    };

    $scope.map = {
      center: {
        latitude: 38,
        longitude: -93
      },
      zoom: 4
    };

    $scope.airport = [
      {key: "JFK"},
      {key: "LAX"}
    ];

    $scope.$watch('airport[0].key', checkAirport(0));
    $scope.$watch('airport[1].key', checkAirport(1));
    $scope.$watch('airport[0].location && airport[1].location', setNauticalMiles);

    function setNauticalMiles() {
      if ($scope.airport[0].location && $scope.airport[1].location) {
        $scope.distance = google.maps.geometry.spherical.computeDistanceBetween(
          LatLng.from($scope.airport[0].location),
          LatLng.from($scope.airport[1].location)
        ) * M2NMi;
      } else {
        $scope.distance = 0;
      }
    }

    function checkAirport(i) {
      return function checkAirportI(newVal, oldVal) {
        if (isValid(newVal)) {
          lookup($scope.airport[i]);
        } else {
          delete($scope.airport[i].name);
          delete($scope.airport[i].iata);
          delete($scope.airport[i].location);
        }
      };
    }

    function lookup(airport) {
      Airports.get({q: airport.key}, function(data) {
        airport.name = data.name;
        airport.iata = data.iata;
        airport.location = {
          latitude: data.latitude,
          longitude: data.longitude
        };
      });
    }

    function isValid(key) {
      return _.contains(airports, key);
    }

  }]);

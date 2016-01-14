



angular.module('tripPlanner')
.controller('tripController', function($scope, $resource, $http, townBaseUrl, dayGetPlacesOfTownUrl, colNum) {

  $scope.towns = [];

  $scope.townResource = $resource(townBaseUrl);
  $scope.townDayResource = $resource(townBaseUrl + '/days', {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});

  $scope.townResource.query().$promise
  .then(function(towns) {
    var container = [];

    towns.forEach(function(thisTown, index) {
      $scope.townDayResource.query({id: thisTown.id, sort: 'day%20ASC'}).$promise
      .then(function(days) {
        thisTown.days = [];

        days.forEach(function(day) {
          thisTown.days.push(day);
          var dayGetPlacesOfTownData = {
            dayId: day.id,
            townId: thisTown.id
          };
          $http.post(dayGetPlacesOfTownUrl, dayGetPlacesOfTownData)
          .success(function(places) {
            day.items = places;
          });
        });
      });

      var row = Math.floor(index / colNum);
      var col = index % colNum;

      if (! container[row]) {
        container[row] = [];
      }

      if (! container[row][col]) {
        container[row][col] = [];
      }

      container[row][col] = thisTown;
    });

    $scope.towns = container;

  });

});

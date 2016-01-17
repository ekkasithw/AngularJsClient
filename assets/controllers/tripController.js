



angular.module('tripPlaner')
.controller('tripController', function($scope, $resource, $http, townResource, dayPlaceResource) {

  $scope.dayListReadOnly = true;
  $scope.towns = [];

  townResource.query().$promise
  .then(function(towns) {
    var container = [];

    towns.forEach(function(thisTown, index) {
      townResource.query({id: thisTown.id, action: 'days', sort: 'day%20ASC'}).$promise
      .then(function(days) {
        thisTown.days = [];

        days.forEach(function(day) {
          thisTown.days.push(day);
          var dayGetPlacesOfTownData = {
            dayId: day.id,
            townId: thisTown.id
          };

          var filter = {
            townId: thisTown.id,
            dayId: day.id
          }
          day.items = dayPlaceResource.getPlacesOfDayByTown(filter);
        });
      });

      var row = Math.floor(index / 2);
      var col = index % 2;

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

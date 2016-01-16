



angular.module('tripPlanner')
.controller('townController', function(
  $scope, $resource, $http, $routeParams, townResource, placeResource, dayPlaceResource
) {

  $scope.dayListReadOnly = false;
  $scope.formPlace = {};
  $scope.town = {};
  $scope.places = [];
  $scope.days = [];

  $scope.townResource.get({id: $routeParams.id}).$promise
  .then(function(town) {
    $scope.town = town;
    return $scope.placeResource.query({town: $scope.town.id}).$promise;
  })
  .then(function(places) {
    $scope.places = places;
    return $scope.townResource.query({id: $scope.town.id, action: 'days'}).$promise;
  })
  .then(function(days) {
    $scope.days = days;
    $scope.days.forEach(function(day) {
      var dayGetPlacesOfTownData = {
        dayId: day.id,
        townId: $routeParams.id
      };
      $http.post(dayGetPlacesOfTownUrl, dayGetPlacesOfTownData).success(function(places) {
        day.items = places;
      });
    });
  });

});

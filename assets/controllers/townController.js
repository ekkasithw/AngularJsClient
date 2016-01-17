



angular.module('tripPlaner')
.controller('townController', function(
  $scope, $resource, $http, $routeParams, townResource, placeResource, dayPlaceResource
) {

  $scope.dayListReadOnly = false;
  $scope.formPlace = {};
  $scope.town = {};
  $scope.places = [];
  $scope.days = [];

  townResource.get({id: $routeParams.id}).$promise
  .then(function(town) {
    $scope.town = town;
    return placeResource.query({town: $scope.town.id}).$promise;
  })
  .then(function(places) {
    $scope.places = places;
    return townResource.query({id: $scope.town.id, action: 'days'}).$promise;
  })
  .then(function(days) {
    $scope.days = days;
    $scope.days.forEach(function(day) {
      var filter = {
        townId: $scope.town.id,
        dayId: day.id
      }
      day.items = dayPlaceResource.getPlacesOfDayByTown(filter);
    });
  });

});

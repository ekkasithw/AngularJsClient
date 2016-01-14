



angular.module('tripPlanner')
.controller('townController', function(
  $scope, $resource, $http, $routeParams, townBaseUrl, placeBaseUrl, dayBaseUrl, dayPlaceOrderUpdateUrl,
  dayPlaceOrderUpdateUrl, dayGetPlacesOfTownUrl
) {

  // ----------------------------------
  // Models & Resources

  $scope.formPlace = {};
  $scope.town = {};
  $scope.places = [];
  $scope.days = [];
  $scope.dayPlaceOrderUpdateUrl = dayPlaceOrderUpdateUrl;

  $scope.townResource = $resource(townBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.townDayResource = $resource(townBaseUrl + '/days', {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.placeResource = $resource(placeBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.dayPlaceResource = $resource(placeBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});

  $scope.townResource.get({id: $routeParams.id}).$promise
  .then(function(town) {
    $scope.town = town;
    return $scope.placeResource.query({town: $scope.town.id}).$promise;
  })
  .then(function(places) {
    $scope.places = places;
    return $scope.townDayResource.query({id: $scope.town.id}).$promise;
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

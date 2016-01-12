



angular.module('tripPlanner')
.constant("townBaseUrl", "http://localhost:1337/town/:id")
.constant("placeBaseUrl", "http://localhost:1337/place/:id")
.constant("dayBaseUrl", "http://localhost:1337/day/:id")
.constant("colNum", 2)
.controller('townController', function(
  $scope, $resource, $routeParams, $filter, townBaseUrl, placeBaseUrl, dayBaseUrl
) {

  // ----------------------------------
  // Models & Resources

  $scope.formPlace = {};
  $scope.town = {};
  $scope.places = [];
  $scope.days = [];

  $scope.townResource = $resource(townBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.townDayResource = $resource(townBaseUrl + '/days', {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.dayPlaceResource = $resource(dayBaseUrl + '/places', {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.placeResource = $resource(placeBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});

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
      day.item = $scope.dayPlaceResource.query({
        id: day.id,
        town: $scope.town.id
      });
    });
  });

});

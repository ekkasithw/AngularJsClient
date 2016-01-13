



angular.module('tripPlanner')
.constant("townBaseUrl", "http://localhost:1337/town/:id")
.constant("placeBaseUrl", "http://localhost:1337/place/:id")
.constant("dayBaseUrl", "http://localhost:1337/day/:id")
.constant("dayPlaceBaseUrl", "http://localhost:1337/day-place/:id")
.constant("dayPlaceOrderUpdateUrl", "http://localhost:1337/day-place/update-places-order")
.constant("dayGetPlacesOfTownUrl", "http://localhost:1337/day-place/get-places-of-town")
.constant("colNum", 2)
.controller('townController', function(
  $scope, $resource, $http, $routeParams, $filter, townBaseUrl, placeBaseUrl, dayBaseUrl, dayPlaceOrderUpdateUrl,
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
    // ----------YEAH---------- //
      var dayGetPlacesOfTownData = {
        dayId: day.id,
        townId: $routeParams.id
      };
      $http.post(dayGetPlacesOfTownUrl, dayGetPlacesOfTownData).success(function(places) {
        day.items = places;
      });
    // ------------------------ //
    });
  });

});

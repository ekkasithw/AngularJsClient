



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
  $scope.townResource = $resource(townBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});

  $scope.places = [];
  $scope.placeResource = $resource(placeBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});

  $scope.townResource.get({id: $routeParams.id}).$promise
  .then(function(town) {
    $scope.town = town;
    return $scope.placeResource.query({town: town.id}).$promise;
  })
  .then(function(places) {
    $scope.places = places;
    $scope.town.days[0].items = places;
  });;



  // ----------------------------------
  // Methods

  $scope.savePlace = function (formPlace) {
    formPlace.town = $scope.town.id;

    if (angular.isDefined(formPlace.id)) {
      formPlace.$save();
    }
    else {
      new $scope.placeResource(formPlace).$save().then(function(newPlace) {
        $scope.town.places.push(newPlace);
        $scope.formPlace = {};
      });
    }
  };

});

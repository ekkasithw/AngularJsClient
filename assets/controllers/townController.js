



angular.module('tripPlanner')
.constant("townBaseUrl", "http://localhost:1337/town/:id")
.constant("placeBaseUrl", "http://localhost:1337/place")
.constant("colNum", 2)
.controller('townController', function($scope, $resource, $routeParams, townBaseUrl, placeBaseUrl, colNum) {

  $scope.town = {};
  $scope.formPlace = {};

  $scope.townResource = $resource(townBaseUrl, {id: '@id'});
  $scope.town = $scope.townResource.get({id: $routeParams.id});

  $scope.placeResource = $resource(placeBaseUrl);

  $scope.setFormPlace = function(place) {
    $scope.formPlace = place;
  };

  $scope.savePlace = function (formPlace) {
    formPlace.town = $scope.town.id;

    if (angular.isDefined(formPlace.id)) {
      formPlace.$save().then(function(editPlace) {
        $scope.formPlace = {};
      });
    }
    else {
      new $scope.placeResource(formPlace).$save().then(function(newPlace) {
        $scope.town.places.push(newPlace);
        $scope.formPlace = {};
      });
    }
  };

});

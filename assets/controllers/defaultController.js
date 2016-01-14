



angular.module('tripPlanner')
  .constant("townBaseUrl", "http://localhost:1337/town/:id")
  .constant("placeBaseUrl", "http://localhost:1337/place/:id")
  .constant("dayBaseUrl", "http://localhost:1337/day/:id")
  .constant("dayPlaceBaseUrl", "http://localhost:1337/day-place/:id")
  .constant("dayPlaceOrderUpdateUrl", "http://localhost:1337/day-place/update-places-order")
  .constant("dayGetPlacesOfTownUrl", "http://localhost:1337/day-place/get-places-of-town")
  .constant("colNum", 2)
  .controller('defaultController', function($scope, $resource, $route, localStorageService, townBaseUrl, colNum) {
    $scope.towns = [];

    $scope.townResource = $resource(townBaseUrl);
    $scope.towns = $scope.townResource.query();
    $scope.townId = $route.id || null;

    $scope.getHalfIndex = function(towns) {
      return Math.ceil(towns.length / 2);
    };

    $scope.isActive = function(townId) {
      return $route.current.params.id == townId ? 'active' : '';
    }

  });

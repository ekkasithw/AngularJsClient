



angular.module('tripPlaner')
.controller('defaultController', function($scope, $route, townResource) {
  $scope.towns = townResource.query();
  $scope.townId = $route.id || null;

  $scope.getHalfIndex = function(towns) {
    return Math.ceil(towns.length / 2);
  };

  $scope.isActive = function(townId) {
    return $route.current.params.id == townId ? 'active' : '';
  }
});

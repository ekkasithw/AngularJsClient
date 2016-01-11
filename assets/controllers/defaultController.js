



angular.module('tripPlanner')
  .constant("baseUrl", "http://localhost:1337/town/")
  .constant("colNum", 2)
  .controller('defaultController', function($scope, $resource, baseUrl, colNum) {
    $scope.towns = [];

    $scope.townResource = $resource(baseUrl);
    $scope.towns = $scope.townResource.query();

    $scope.getHalfIndex = function(towns) {
      return Math.ceil(towns.length / 2);
    };

  });

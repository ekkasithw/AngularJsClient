



angular.module('tripPlanner')
.constant("baseUrl", "http://localhost:1337/town/")
.constant("colNum", 2)
.controller('japanController', function($scope, $resource, baseUrl, colNum) {

  $scope.towns = [];

  $scope.townResource = $resource(baseUrl);
  $scope.townResource.query().$promise.then(function(towns) {
    var container = [];

    towns.forEach(function(thisTown, index) {
      var row = Math.floor(index / colNum);
      var col = index % colNum;

      if (! container[row]) {
        container[row] = [];
      }

      if (! container[row][col]) {
        container[row][col] = [];
      }

      container[row][col] = thisTown;
    });

    $scope.towns = container;
  });

});

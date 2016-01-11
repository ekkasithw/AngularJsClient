



angular.module('tripPlanner')
.directive('dayList', function() {

  return {

    restrict: 'EACM"',
    templateUrl: "/templates/dayList.html",

    scope: {
      days: '=days',
      title: '@title'
    }

  };

});

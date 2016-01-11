



angular.module('tripPlanner')
  .directive('masonry', function() {

    return {

      restrict: 'EACM"',
      templateUrl: "/templates/masonry.html",

      scope: {
        formItem: '=',
        title: '=',
        items: '='
      }

    };

  });





angular.module('tripPlanner')
  .directive('sortable', function() {

    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
        $(element).sortable();
      }
    };

  });

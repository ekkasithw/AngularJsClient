



angular.module('tripPlanner')
  .directive('draggable', function() {

    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
        $(element).draggable({
          snap: attrs['dropTarget']
        });
      }
    };

  });

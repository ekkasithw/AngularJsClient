



angular.module('tripPlanner')
  .directive('draggable', function() {

    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
        $(element).draggable({
          connectToSortable: '.date-place-container',
          helper: "clone",
          revert: "invalid"
        });
      }
    };

  });

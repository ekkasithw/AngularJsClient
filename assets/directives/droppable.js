



angular.module('tripPlaner')
  .directive('droppable', function() {

    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
        $(element).droppable({
          accept: '.item-wrapper',
          drop: function(event, ui) {
            $.clone(ui.draggable).appendTo(this);
          }
        });
      }
    };

  });

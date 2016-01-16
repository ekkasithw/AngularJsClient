



angular.module('tripPlaner')
.directive('colorbox', function() {

  return {
    restrict: 'AC',
    link: function(scope, element, attrs) {
      $(element).colorbox(attrs);
    }
  };

});

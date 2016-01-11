



angular.module('tripPlanner')
.directive('masonry', function() {

  return {

    restrict: 'EACM"',
    templateUrl: "/templates/masonry.html",

    scope: {
      items: '=items',
      title: '@title',
      parentId: '@parentId',
      parentKey: '@parentKey',
      dropTarget: '@dropTarget',
    },

    link: function(scope, element, attrs) {
      scope.formItem = {};
      element.children('masonry-grid').isotope({
        itemSelector: '.item-wrapper',
        layoutMode: 'fitRows'
      });
    },

    controller: function ($scope, $element, $attrs) {
      $scope.setFormItem = function(item) {
        $scope.formItem = item;
      };

      $scope.saveFormItem = function(formItem) {
        if (angular.isDefined(formItem.id)) {
          formItem.$save();
        }
        else {
          formItem[$scope.parentKey] = formItem[$scope.parentId];
          new $scope.placeResource(formItem).$save().then(function(newPlace) {
            $scope.town.places.push(newPlace);
            $scope.formItem = {};
          });
        }
      };
    }

  };

});

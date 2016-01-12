



angular.module('tripPlanner')
.directive('masonry', function() {

  return {

    restrict: 'EACM"',
    templateUrl: "/templates/masonry.html",

    scope: {
      items: '=items',
      itemResource: '=itemResource',
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
          formItem[$scope.parentKey] = $scope.parentId;
          new $scope.itemResource(formItem).$create().then(function(newItem) {
            $scope.items.push(newItem);
            $scope.formItem = {};
          });
        }
      };

      $scope.deleteFormItem = function(formItem) {
        if (angular.isDefined(formItem.id)) {
          formItem.$delete().then(function () {
            $scope.items.splice($scope.items.indexOf(formItem), 1);
          });
        }
      };
    }

  };

});

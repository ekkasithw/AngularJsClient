



angular.module('tripPlaner')
.directive('masonry', function(placeResource) {

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
    },

    controller: function ($scope, $element, $attrs) {
      $scope.setFormItem = function(item) {
        $scope.formItem = item;
      };

      $scope.saveFormItem = function(formItem) {
        if (angular.isDefined(formItem.id)) {
          formItem.$save();
          $.colorbox.close();
        }
        else {
          formItem[$scope.parentKey] = $scope.parentId;
          new placeResource(formItem).$create().then(function(newItem) {
            $scope.items.push(newItem);
            $scope.formItem = {};
            $.colorbox.close();
          });
        }
      };

      $scope.deleteFormItem = function(formItem) {
        if (angular.isDefined(formItem.id)) {
          formItem.$delete().then(function () {
            $scope.items.splice($scope.items.indexOf(formItem), 1);
            $.colorbox.close();
          });
        }
      };
    }

  };

});

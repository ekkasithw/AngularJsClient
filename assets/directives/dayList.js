



angular.module('tripPlaner')
.directive('dayList', function() {

  return {

    restrict: 'EACM"',
    templateUrl: "/templates/dayList.html",

    scope: {
      days: '=days',
      town: '=town',
      title: '@title',
      itemOrderUpdateUrl: '@itemOrderUpdateUrl',
      readOnly: '=readOnly'
    }
  };

});

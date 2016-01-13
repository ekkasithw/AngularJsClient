


$.browser = {};

(function() {
  $.browser.msie = false;
  $.browser.version = 0;
  if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
    $.browser.msie = true;
    $.browser.version = RegExp.$1;
  }

  angular.module('tripPlanner', ['ngRoute', 'ngResource'])
    .config(function($routeProvider) {

      $routeProvider.when('/japan', {
        templateUrl: '/templates/japan.html',
        controller: 'japanController'
      });

      $routeProvider.when('/town/:id', {
        templateUrl: '/templates/town.html',
        controller: 'townController'
      });

      $routeProvider.otherwise({
        redirectTo: '/japan'
      });

    });

})();

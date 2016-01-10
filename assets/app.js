



(function() {

  angular.module('tripPlanner', ['ngRoute', 'ngResource'])
    .config(function($routeProvider) {

      $routeProvider.when('/japan', {
        templateUrl: '/templates/japan.html',
        controller: 'japanController'
      });

      $routeProvider.when('/tokyo', {
        templateUrl: '/templates/tokyo.html',
        controller: 'tokyoController'
      });

      $routeProvider.when('/osaka', {
        templateUrl: '/templates/osaka.html',
        controller: 'osakaController'
      });

      $routeProvider.otherwise({
        redirectTo: '/japan'
      });

    });

})();

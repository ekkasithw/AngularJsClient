



(function() {

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

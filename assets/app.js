



(function() {

  angular.module('tripPlanner', ['ngRoute', 'ngResource', 'LocalStorageModule'])
  .config(function($routeProvider) {

    $routeProvider.when('/trip', {
      templateUrl: '/templates/trip.html',
      controller: 'tripController',
      active: 'trip'
    });

    $routeProvider.when('/town/:id', {
      templateUrl: '/templates/town.html',
      controller: 'townController',
      active: 'town'
    });

    $routeProvider.otherwise({
      redirectTo: '/trip'
    });

  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('tripPlanner')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
  }).filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    }
  }]);

})();





(function() {

  angular.module('tripPlaner', ['ngRoute', 'ngResource', 'LocalStorageModule'])
  .constant("authBaseUrl", "http://localhost:1338/authorize/")
  .constant("resourceBaseUrl", "http://localhost:1338/")
  .config(function($routeProvider) {

    $routeProvider.when('/login', {
      templateUrl: '/templates/login.html',
      controller: 'loginController'
    });

    $routeProvider.when('/trip', {
      templateUrl: '/templates/trip.html',
      controller: 'tripController'
    });

    $routeProvider.when('/town/:id', {
      templateUrl: '/templates/town.html',
      controller: 'townController'
    });

    $routeProvider.otherwise({
      redirectTo: '/trip'
    });

  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('resourceInterceptor');
  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('tripPlaner')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
  });

})();

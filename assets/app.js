



(function() {

  angular.module('tripPlanner', ['ngRoute', 'ngResource', 'LocalStorageModule'])
  .constant("authBaseUrl", "http://localhost:1338/authorize/")
  .constant("resourceBaseUrl", "http://localhost:1338/resources/")
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
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix('tripPlanner')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
  })
  .factory('resourceInterceptor', function($location) {
    return {
      responseError: function(rejection) {
        if (rejection.status == 401) {
          $location.path('/login');
        }
      }
    }
  })
  .factory('townResource', function($resource, resourceBaseUrl, resourceInterceptor) {
    var url = resourceBaseUrl + 'town/:id/:action';

    var defaultParams = {
      id: '@id',
      action: '@action',
    };

    var actions = {
      query: {interceptor: resourceInterceptor},
      get: {interceptor: resourceInterceptor},
      save: {interceptor: resourceInterceptor},
      delete: {interceptor: resourceInterceptor},
      remove: {interceptor: resourceInterceptor},
    };

    return $resource(url, defaultParams, actions);
  })
  .factory('dayResource', function($resource, resourceBaseUrl, resourceInterceptor) {
    var url = resourceBaseUrl + 'day/:id/:action';

    var defaultParams = {
      id: '@id',
      action: '@action'
    };

    var actions = {
      query: {interceptor: resourceInterceptor},
      get: {interceptor: resourceInterceptor},
      save: {interceptor: resourceInterceptor},
      delete: {interceptor: resourceInterceptor},
      remove: {interceptor: resourceInterceptor},
    };

    return $resource(url, defaultParams, actions);
  })
  .factory('dayPlaceResource', function($resource, resourceBaseUrl, resourceInterceptor) {
    var url = resourceBaseUrl + 'day-place/:id/:action';

    var defaultParams = {};

    var actions = {
      query: {interceptor: resourceInterceptor},
      get: {interceptor: resourceInterceptor},
      save: {interceptor: resourceInterceptor},
      delete: {interceptor: resourceInterceptor},
      remove: {interceptor: resourceInterceptor},
      updatePlacesOrder: {
        method: 'POST',
        url: resourceBaseUrl + 'day-place/update-places-order',
        interceptor: resourceInterceptor
      },
      getPlacesOfDayByTown: {
        method: 'POST',
        url: resourceBaseUrl + 'day-place/get-places-of-day-by-town',
        interceptor: resourceInterceptor
      }
    };

    return $resource(url, defaultParams, actions);
  })
  .factory('placeResource', function($resource, resourceBaseUrl, resourceInterceptor) {
    var url = resourceBaseUrl + 'place/:id/:action';

    var defaultParams = {
      id: '@id',
      action: '@action'
    };

    var actions = {
      query: {interceptor: resourceInterceptor},
      get: {interceptor: resourceInterceptor},
      save: {interceptor: resourceInterceptor},
      delete: {interceptor: resourceInterceptor},
      remove: {interceptor: resourceInterceptor},
    };

    return $resource(url, defaultParams, actions);
  });

})();

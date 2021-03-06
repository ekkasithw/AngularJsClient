



angular.module('tripPlaner')
.factory('resourceInterceptor', function($q, $location, localStorageService) {
  return {
    request: function(config) {
      config.headers.Authorization = 'Bearer ' + localStorageService.get('accessToken');
      return config;
    },
    responseError: function(rejection) {
      if (rejection.status == 403) {
        localStorageService.set('accessToken', null);
        $location.path('/login');
        return $q.reject(rejection);
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

  var action = {
    create: {
      method: "POST"
    },
    save: {
      method: "PUT"
    }
  };

  return $resource(url, defaultParams, action);
})
.factory('dayResource', function($resource, resourceBaseUrl, resourceInterceptor) {
  var url = resourceBaseUrl + 'day/:id/:action';

  var defaultParams = {
    id: '@id',
    action: '@action'
  };

  var action = {
    create: {
      method: "POST"
    },
    save: {
      method: "PUT"
    }
  };

  return $resource(url, defaultParams, action);
})
.factory('dayPlaceResource', function($resource, resourceBaseUrl, resourceInterceptor) {
  var url = resourceBaseUrl + 'day-place/:id/:action';

  var defaultParams = {};

  var actions = {
    updatePlacesOrder: {
      method: 'POST',
      url: resourceBaseUrl + 'day-place/update-places-order',
      interceptor: resourceInterceptor
    },
    getPlacesOfDayByTown: {
      method: 'POST',
      url: resourceBaseUrl + 'day-place/get-places-of-day-by-town',
      interceptor: resourceInterceptor,
      isArray:true
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

  var action = {
    create: {
      method: "POST"
    },
    save: {
      method: "PUT"
    }
  };

  return $resource(url, defaultParams, action);
})

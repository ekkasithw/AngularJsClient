



angular.module('tripPlaner')
.controller('loginController', function($scope, $location, localStorageService) {

  if (localStorageService.get('accessToken')) {
    $location.path('/trip');
  }

});

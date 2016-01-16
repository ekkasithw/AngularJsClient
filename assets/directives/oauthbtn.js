



angular.module('tripPlaner')
.directive('oauthBtn', function($window, $location, localStorageService) {

  return {

    restrict: 'EACM"',
    templateUrl: "/templates/oauthLogin.html",

    link: function (scope, element, attrs) {
      scope.accessToken = '';

      $window.onmessage = function (e) {
        localStorageService.set('accessToken', e.data);
      };

      scope.$watch('accessToken', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          $location.path('/trip');
        }
      });

      scope.openLogInDialog = function() {
        var oauthDialogUrl = 'http://localhost:1338/authorize/?responseType=token&clientId=5698f4931765f6b0019f4130';

        var top = ($window.innerHeight - 400) / 2;
        var left = ($window.innerWidth - 400) / 2;

        $window.open(oauthDialogUrl, 'Trip Planer', 'width=400,height=400,top=' + top + ',left=' + left);
      };
    }

  };

});

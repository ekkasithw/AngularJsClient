



angular.module('tripPlanner')
.constant("townBaseUrl", "http://localhost:1337/town/:id")
.constant("placeBaseUrl", "http://localhost:1337/place/:id")
.constant("dayBaseUrl", "http://localhost:1337/day/:id")
.constant("colNum", 2)
.controller('townController', function(
  $scope, $resource, $routeParams, $filter, townBaseUrl, placeBaseUrl, dayBaseUrl
) {

  // ----------------------------------
  // Models & Resources

  $scope.formPlace = {};

  $scope.town = {};

  $scope.townResource = $resource(townBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.town = $scope.townResource.get({id: $routeParams.id});

  $scope.days = {};
  $scope.dayList = [];

  $scope.dayResource = $resource(dayBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.days = $scope.dayResource.query().$promise.then(function(days) {
    days.forEach(function(day) {
      $scope.dayList.push({
        text: $filter('date')(day.day, 'dd-MM-yyyy'),
        items: []
      });
    });
  });

  $scope.places = {};
  $scope.placeResource = $resource(placeBaseUrl, {id: '@id'}, {create: {method: "POST"}, save: {method: "PUT"}});
  $scope.places = $scope.placeResource.query({town: $routeParams.id});

  // ----------------------------------
  // Methods

  $scope.setFormPlace = function(place) {
    $scope.formPlace = place;
  };

  $scope.savePlace = function (formPlace) {
    formPlace.town = $scope.town.id;

    if (angular.isDefined(formPlace.id)) {
      formPlace.$save();
    }
    else {
      new $scope.placeResource(formPlace).$save().then(function(newPlace) {
        $scope.town.places.push(newPlace);
        $scope.formPlace = {};
      });
    }
  };

});





angular.module('tripPlanner')
  .directive('sortable', function($http) {

    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {
          var isOut = 0;
          var isDupe = 0;
          $(element).sortable({
            revert: true,
            out: function(event, ui) { isOut = 1; },
            over: function(event, ui) {
              isOut = 0; isDupe = 0;
            },
            receive: function(event, ui) {
              if ($(this).sortable('serialize').indexOf(ui.item.attr('data-id')) > -1) {
                isDupe = 1;
              }

              ui.item.removeClass('colorbox cboxElement');
              ui.item.css({width: '25%', height: 'auto', 'margin-left': '0.5em', 'margin-right': '0.5em'});
            },
            beforeStop: function(event, ui) {
              if (isOut) {
                ui.item.remove();

                var data = $.deparam($(this).sortable('serialize'));

                if (angular.isDefined(attrs['parentId'])) {
                  data.parentId = attrs['parentId'];
                }

                $http.post(attrs['itemOrderUpdateUrl'], data).success(function(result) {});
              }
            },
            update: function(event, ui) {
              if (isDupe) {
                ui.item.remove();
              }
              else if (! isOut && ! angular.isDefined(ui.item.attr('id'))) {
                ui.item.attr('id', 'item-' + ui.item.attr('data-id'));
              }

              var data = $.deparam($(this).sortable('serialize'));

              if (angular.isDefined(attrs['parentId'])) {
                data.parentId = attrs['parentId'];
              }

              $http.post(attrs['itemOrderUpdateUrl'], data).success(function(result) {});
            }
          });
        }
      };
  });

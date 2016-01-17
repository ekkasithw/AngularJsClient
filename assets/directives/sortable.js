



angular.module('tripPlaner')
  .directive('sortable', function($http, dayPlaceResource) {

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
              ui.item.removeClass('colorbox cboxElement');
              ui.item.addClass('sort-wrapper');
            },
            receive: function(event, ui) {
              if ($(this).sortable('serialize').indexOf(ui.item.attr('data-id')) > -1) {
                isDupe = 1;
              }
            },
            beforeStop: function(event, ui) {
              if (isOut) {
                ui.item.remove();
                var data = getData();
                dayPlaceResource.updatePlacesOrder(data);
              }
            },
            update: function(event, ui) {
              if (isDupe) {
                ui.item.remove();
              }
              else if (! isOut && ! angular.isDefined(ui.item.attr('id'))) {
                ui.item.attr('id', 'item-' + ui.item.attr('data-id'));
                ui.item.removeClass('colorbox cboxElement');
                ui.item.addClass('sort-wrapper');
              }

              var data = getData();
              dayPlaceResource.updatePlacesOrder(data);
            }
          });

          var getData = function() {
            var data = $.deparam($(element).sortable('serialize'));

            if (angular.isDefined(attrs['dayId'])) {
              data.dayId = attrs['dayId'];
            }

            if (angular.isDefined(attrs['townId'])) {
              data.townId = attrs['townId'];
            }

            return data;
          };
        }
      };
  });

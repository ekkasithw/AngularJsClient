



angular.module('tripPlanner')
  .directive('sortable', function($http) {
    function parseParamStr(paramsStr) {
      if (typeof str !== 'string') {
        return {};
      }

      str = str.trim().replace(/^(\?|#|&)/, '');

      if (!str) {
        return {};
      }

      return str.split('&').reduce(function (ret, param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        // Firefox (pre 40) decodes `%3D` to `=`
        // https://github.com/sindresorhus/query-string/pull/37
        var key = parts.shift();
        var val = parts.length > 0 ? parts.join('=') : undefined;

        key = decodeURIComponent(key);

        // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        val = val === undefined ? null : decodeURIComponent(val);

        if (!ret.hasOwnProperty(key)) {
          ret[key] = val;
        } else if (Array.isArray(ret[key])) {
          ret[key].push(val);
        } else {
          ret[key] = [ret[key], val];
        }

        return ret;
      }, {});
    }

    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {
          var isOut = 0;
          var isDupe = 0;
          $(element).sortable({
            revert: true,
            out: function(event, ui) { isOut = 1; },
            over: function(event, ui) { isOut = 0; isDupe = 0;},
            receive: function(event, ui) {
              if ($(this).sortable('serialize').indexOf(ui.item.attr('data-id')) > -1) {
                isDupe = 1;
              }
            },
            update: function(event, ui) {
              if (isDupe) {
                ui.item.remove();
              }

              if (! isOut) {
                ui.item.removeClass('colorbox cboxElement');
                ui.item.css({width: '25%', height: 'auto'});
                ui.item.attr('id', 'item-' + ui.item.attr('data-id'));
              }

              var data = $(this).sortable('serialize');

              $http.post(attrs['itemOrderUpdateUrl'], data).success(function(result) {});
            }
          });
        }
      };
  });

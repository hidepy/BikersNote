/*
  MenuButton directive
*/
(function(){
  'use strict';

  angular.module(APP_CONFIGS.NAME) //第2引数省略 既存モジュール拡張
    .directive("menuButton", function(){
      return {
        restrict: "E",
        replace: true,
        scope: {
          buttonlabel: "@",
          action: "&"
        },
        template: '<ons-col>' +
                  '  <ons-button modifier="large--quiet" ng-click="action()">' +
                  '    <ons-icon icon="" style="font-size: 28px; width: 1em;"></ons-icon>' +
                  '    <p>{{buttonlabel}}</p>' +
                  '  </ons-button>' +
                  '</ons-col>'
      }
    });
})();

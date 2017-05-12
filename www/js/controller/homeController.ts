/*
  home画面コントローラ
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
    })
    .controller("HomeController", function($scope, masterManager){
      // デフォルト機体を取得
      //$scope.data = masterManager.Machines.getDefaultRecord();
      //$scope.data = $scope.sharing["root_machine"];

      $scope.visibility = {};
      $scope.visibility.dbg_disp_area = "inline";

      // tabbar可視性
      $scope.sharing.hide_tabbar = false;



      $scope._showdata = function(){
        console.log("in showdata. bkinfo=");
        console.log($scope.sharing.root_machine);
      }



      $scope.movetoViewRecordHeader = function(){
          outlog("in movetoViewRecordHeader");
          myNavigator.pushPage("view_record_header_page.html");
      };
/*
      $scope.getMachine = function(id: string){
        $scope.data = masterManager.Machines.getRecord(id);
        console.log("in getMachine");
        outlog($scope.data);
      };
*/

      $scope.move2functions = function(type){
        console.log("in move2functions. type=" + type);

        let action_types = {
          "1": { url: "view_record_detail_page.html", options: {} },
          "2": { url: "view_record_header_page.html", options: {} },
          "3": { url: "maintainance_state.html", options: {} },
          "4": { url: "switch_machine.html"},
          "5": { url: "master.html", options: {} },
          "6": { action: function(){
              console.log("memo pushed");
            }
          }
        };

        let act = action_types[type];
        if(act.url){
          myNavigator.pushPage(act.url);
        }
        else if(act.action){
          act.action();
        }
      }
  });

})();

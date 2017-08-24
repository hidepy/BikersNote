/*
  home画面コントローラ
*/
(function(){
  'use strict';

  angular.module(APP_CONFIGS.NAME) //第2引数省略 既存モジュール拡張
    .controller("HomeController", function($scope, masterManager){

      // Button 押下時の動作定義
      let action_types = {
        // 新規追加
        "1": { url: "view/view_record_detail_page.html", options: {record_type: "maintainance"} },
        // レコード一覧
        "2": { url: "view/view_record_header_page.html", options: {record_type: "maintainance"} },
        // トラップ画面
        "3": { url: "view/maintainance_state.html", options: {record_type: "state"} },
        // 切り替え
        "4": { url: "view/switch_machine.html", options: {}},
        // マスタ管理
        "5": { url: "view/view_record_header_page.html", options: {record_type: "master_typelist"} },
        // メモ
        "6": { action: function(){
            console.log("memo pushed");
          }
        }
      };

      $scope.visibility = {};
      $scope.visibility.dbg_disp_area = "inline";

      // tabbar可視性
      $scope.sharing.hide_tabbar = false;

      $scope.movetoViewRecordHeader = function(){
          outlog("in movetoViewRecordHeader");
          myNavigator.pushPage("view_record_header_page.html");
      };

      $scope.move2functions = function(type){
        console.log("in move2functions. type=" + type);

        // actionを受ける
        let act = action_types[type];
        // propertyによって、画面遷移かイベントかを決定する
        if(act.url){
          myNavigator.pushPage(act.url, <navigatorOptions>act.options);
        }
        else if(act.action){
          act.action();
        }
      }
  });

})();

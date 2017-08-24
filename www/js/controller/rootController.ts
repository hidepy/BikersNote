(function(){
  'use strict';

  angular.module(APP_CONFIGS.NAME) //第2引数省略 既存モジュール拡張
    .controller("RootController", function($scope, masterManager){ // 全体で使用する汎用定義など
      // スコープ間共有オブジェクト
      $scope.sharing = {};

      // const定義のlabelたちをセット
      $scope.labels = {};

      // const定義のマスタラベルたち
      $scope.mlabels = {};

      // 初期化処理
      $scope.root_init = function(){

        console.log("root_init. myNavigator=");

        // スコープ間共有情報初期化
        $scope.sharing["hide_tabbar"] = false;
        $scope.sharing["root_machine"] = masterManager.Machines.getDefaultRecord();

        // マスタからラベルをコピー
        for(let p in VIEW_LABELS_MASTER){
          $scope.mlabels[p] = VIEW_LABELS_MASTER[p];
        }

        // ローカルラベルのコピー
        for(let p in VIEW_LABELS){
          $scope.labels[p] = VIEW_LABELS[p];
        }

        // 任意項目
        $scope.labels["OPTIONAL1"] = $scope.labels["OPTIONAL1_DEFAULT"];
        $scope.labels["OPTIONAL2"] = $scope.labels["OPTIONAL2_DEFAULT"];
        $scope.labels["OPTIONAL3"] = $scope.labels["OPTIONAL3_DEFAULT"];

        // navigationに初期ページをセット

        /*
        $scope.$watch($scope.myNavigator, function(){
          $scope.myNavigator.resetToPage("view/home.html");
          $scope.$watch($scope.myNavigator, null);
        });
        */

      };

      $scope.delete_all_records = function(){
        console.log($scope.myNavigator);

        storage_manager_records.deleteAllItem();
      }
    });
})();

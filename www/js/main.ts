declare var myNavigator: NavigatorView;
declare var myTabbar: TabbarView;
/// <reference path="./common/commonFunctions.ts" />
/// <reference path="./common/storageManager.ts" />
/// <reference path="./const/constants.ts"/>

var storage_manager_records: StorageManager = new StorageManager(STORAGE_TYPE.TRAN_RECORDS);

(function(){
    'use strict';

    angular.module(APP_CONFIGS.NAME, ['onsen']) //新規モジュールを定義
      .controller("RootController", function($scope, masterManager){ // 全体で使用する汎用定義など
        $scope.sharing = {};
        $scope.sharing["hide_tabbar"] = false;
        $scope.sharing["root_machine"] = masterManager.Machines.getDefaultRecord();

        // const定義のlabelたちをセット
        $scope.labels = {};
        for(let p in VIEW_LABELS){
          $scope.labels[p] = VIEW_LABELS[p];
        }
        $scope.labels["OPTIONAL1"] = $scope.labels["OPTIONAL1_DEFAULT"];
        $scope.labels["OPTIONAL2"] = $scope.labels["OPTIONAL2_DEFAULT"];
        $scope.labels["OPTIONAL3"] = $scope.labels["OPTIONAL3_DEFAULT"];

        // const定義のマスタラベルたち
        $scope.mlabels = {};
        for(let p in VIEW_LABELS_MASTER){
          $scope.mlabels[p] = VIEW_LABELS_MASTER[p];
        }

        $scope.delete_all_records = function(){
          storage_manager_records.deleteAllItem();
        }
      });
})();

/*
  home画面コントローラ
*/
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
    module.controller("HomeController", function ($scope, currentBikeInfo) {
        $scope.data = currentBikeInfo;
        $scope.visibility = {};
        $scope.visibility.dbg_disp_area = "inline";
        // tabbar可視性
        $scope.sharing.hide_tabbar = false;
        $scope.movetoViewRecordHeader = function () {
            outlog("in movetoViewRecordHeader");
            myNavigator.pushPage("view_record_header_page.html");
        };
    });
})();

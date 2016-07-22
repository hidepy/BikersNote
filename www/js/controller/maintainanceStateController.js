/*
  maintainance state 画面コントローラ
    とある機体の、各中分類につき、いつメンテが必要かを表示してくれる


*/
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
    module.controller("MaintainanceStateController", function ($scope, masterManager) {
        // デフォルト機体を取得
        //    現在の選択機体を取得すること
        $scope.target_machine = masterManager.Machines.getDefaultRecord();
        $scope.cbunrui_of_maintainance = masterManager.CBunrui.getSelection("0001"); // とりあえずリテラル。何処に逃がすか
    });
    module.filter("calcNextInterval", function () {
        return function (c_bunrui_id) {
            return c_bunrui_id + " my filter";
        };
    });
})();

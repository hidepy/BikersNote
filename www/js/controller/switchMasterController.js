/*
  機体切替コントローラ
*/
(function () {
    'user strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュールに追加
    module.controller("SwitchMachineController", function ($scope, masterManager) {
        console.log("in SwitchMachineController");
        // 機体情報を格納
        $scope.machines = masterManager.Machines.getRecords(); //masterManager.getMachines();
        $scope.processItemSelect = function (index) {
        };
    });
});

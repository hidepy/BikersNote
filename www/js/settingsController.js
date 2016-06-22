/*
  設定画面コントローラ
*/
(function () {
    'user strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュールに追加
    module.controller("MasterCommonController", function ($scope) {
        $scope.mlabels = {};
        for (var p in VIEW_LABELS_MASTER) {
            $scope.mlabels[p] = VIEW_LABELS_MASTER[p];
        }
    });
    module.controller("MasterController", function ($scope) {
        console.log("in SettingsController");
        $scope.move2MachineView = function (index, event) {
            myNavigator.pushPage("master_machine_header.html");
        };
        $scope.move2TypeView = function (index, event) {
            myNavigator.pushPage("master_type_header.html");
        };
    });
    // header, detail
    module.controller("MasterMachineHeader", function ($scope) {
        console.log("in MasterMachineHeader");
        $scope.machines = [];
    });
    // header, detail
    module.controller("MasterTypeHeader", function ($scope) {
        console.log("in MasterTypeHeader");
    });
})();

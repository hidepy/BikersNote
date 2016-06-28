/*
  設定画面コントローラ
*/
(function () {
    'user strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュールに追加
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
    module.controller("MasterMachineHeader", function ($scope, masterManager) {
        console.log("in MasterMachineHeader");
        $scope.machines = masterManager.Machines.getRecords(); //masterManager.getMachines();
        $scope.move2MachineDetailRegist = function () {
            myNavigator.pushPage("master_machine_detail.html", {
                onTransitionEnd: {
                    is_regist: true
                }
            });
        };
        $scope.move2MachineDetailView = function (index, event) {
            myNavigator.pushPage("master_machine_detail.html", {
                onTransitionEnd: {
                    is_view: true,
                    item: $scope.machines[index]
                }
            });
        };
    });
    module.controller("MasterMachineDetail", function ($scope, masterManager) {
        console.log("in MasterMachineDetail");
        $scope.machine = {}; // 画面表示用の機体オブジェクト
        $scope.is_readonly = true; // 読取専用か
        $scope.is_edit_screen = true; // 編集画面か
        $scope.PAGE_TITLE = "";
        $scope.DELETE_BUTTON_NAME = VIEW_LABELS.DELETE_BUTTON;
        $scope.EDIT_BUTTON_NAME = VIEW_LABELS.EDIT_BUTTON;
        // 項目の情報が入る
        // バインド対象, 型などの情報を取得
        $scope.properties = masterManager.Machines.getProperty(true);
        var args = myNavigator.getCurrentPage().options;
        if (args && args.onTransitionEnd) {
            // booleanに縛る. viewなら読取専用
            $scope.is_readonly = !!args.onTransitionEnd.is_view;
            // 編集画面か判定フラグ
            $scope.is_edit_screen = !!args.onTransitionEnd.is_edit;
            // 読取専用画面でなければ
            if (!$scope.is_readonly) {
                // 更新ボタンのラベルを、更新か登録か決定する
                $scope.UPDATE_BUTTON_NAME = $scope.is_edit_screen ? VIEW_LABELS.UPDATE_BUTTON : VIEW_LABELS.ENTRY_BUTTON;
            }
            // 表示するitemオブジェクトが存在すればセット
            if (args.onTransitionEnd.item) {
                $scope.machine = args.onTransitionEnd.item;
            }
        }
        $scope.processRegist = function () {
            var item = $scope.machine;
            console.log("in processRegist");
            // マスタデータ1件登録
            //let if_return: IFRETURN = masterManager.registMachine(item);
            handleIfreturn(masterManager.Machines.registRecord(item), myNavigator);
        };
        $scope.processDelete = function () {
            console.log("in processDelete");
            var id = $scope.machine.id;
            console.log("id =" + id);
            // マスタデータを1件削除(確認ダイアログあり)
            showConfirm(CONST_MESSAGES.CONFIRM_DELETE, function (res) {
                if (res) {
                    handleIfreturn(masterManager.Machines.deleteRecord(id), myNavigator);
                }
            });
        };
        $scope.move2MachineDetailEdit = function () {
            myNavigator.pushPage("master_machine_detail.html", {
                onTransitionEnd: {
                    is_edit: true,
                    item: $scope.machine
                }
            });
        };
        $scope.selectTest = function (event) {
            outlog("in selectTest");
            outlog(event);
            if (event.target.tagName == ("ons-button".toUpperCase())) {
                outlog("event drivennnnn!!");
            }
            var target_model = event.target.getAttribute("target-model");
            outlog(target_model);
        };
    });
    // header, detail
    module.controller("MasterTypeHeader", function ($scope) {
        console.log("in MasterTypeHeader");
    });
})();

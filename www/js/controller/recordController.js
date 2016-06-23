/*
  maintainceレコードの照会/更新系コントローラ
*/
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
    module.controller("ViewRecordHeaderController", function ($scope) {
        //整備情報レコード
        $scope.items = convHash2Arr(storage_manager_records.getAllItem());
        $scope.processItemSelect = function (index, event) {
            myNavigator.pushPage('view_record_detail_page.html', {
                onTransitionEnd: { item: $scope.items[index] }
            });
        };
    });
    module.controller("ViewRecordDetailConrtoller", function ($scope) {
        outlog("in ViewRecordDetailConrtoller");
        var args = myNavigator.getCurrentPage().options;
        $scope.item = args.onTransitionEnd.item; //整備情報を取得(前画面からの情報まんまでよいか？)
        $scope.movetoUpdate = function () {
            myNavigator.pushPage('entry_record.html', {
                onTransitionEnd: {
                    item: $scope.item,
                    is_modify: true
                }
            });
        };
        $scope.processItemDelete = function () {
            var res = storage_manager_records.deleteItem($scope.item.id);
            var msg = res ? CONST_MESSAGES.DELETE_SUCCESS : CONST_MESSAGES.UPDATE_FAILURE;
            // メッセージを表示
            showAlert(msg);
            if (res) {
                popPageSafe(myNavigator);
            }
        };
    });
    module.controller('EntryController', function ($scope, selectList) {
        outlog("in EntryController");
        // 値格納用
        $scope.data = {};
        // 登録/更新ボタンラベルを初期化
        $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.ENTRY_BUTTON;
        // 編集画面ではない を初期値としてセット
        $scope.is_modify = false;
        // tabbar可視性
        $scope.sharing.hide_tabbar = true;
        outlog("tabbar 可視性=" + $scope.sharing.hide_tabbar);
        //前画面からの引数取得
        var args = myNavigator.getCurrentPage().options;
        //詳細ページから編集を押下してきた場合
        if (args.onTransitionEnd && args.onTransitionEnd.is_modify) {
            // データのコピーと、訂正画面フラグを受け取り
            var item = args.onTransitionEnd.item;
            $scope.data = item;
            $scope.is_modify = args.onTransitionEnd.is_modify;
            // ボタンラベルを更新
            $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.UPDATE_BUTTON;
        }
        //登録処理
        $scope.processEntryRecord = function () {
            // レコード
            var record = $scope.data;
            // エラー格納用
            var err_list = [];
            // エラー無しなら
            if (err_list.length == 0) {
                // idが存在しなければ新たに発行する
                if (isEmpty(record.id)) {
                    record.id = MaintainanceRecord.generateId();
                }
                // 更新日付を更新
                record.update_datetime = new Date();
                //レコードを1件格納
                var save_result = storage_manager_records.saveItem2Storage(record.id, record);
                var msg = "";
                var is_entry = !$scope.is_modify;
                // 処理成否, 登録/編集 によってメッセージを決定
                if (save_result) {
                    // メッセージを決定(登録/訂正)
                    msg = is_entry ? CONST_MESSAGES.ENTRY_SUCCESS : CONST_MESSAGES.UPDATE_SUCCESS;
                    // 前画面に戻る
                    popPageSafe(myNavigator);
                }
                else {
                    //操作失敗時メッセージ
                    msg = is_entry ? CONST_MESSAGES.ENTRY_FAILURE : CONST_MESSAGES.UPDATE_FAILURE;
                }
                // メッセージを表示
                showAlert(msg);
            }
        };
        $scope.showSelectListBike = function () {
            selectList.removeAllItems();
            selectList.addItem("1", "GN125");
            selectList.addItem("2", "VT250");
            selectList.addItem("3", "SRX250");
            selectList.addItem("4", "VTR250");
            myNavigator.pushPage('list_select_page.html', {
                onTransitionEnd: {
                    title: SELECT_LIST_TYPES.MY_MACHINES
                }
            });
        };
        $scope.showSelectListDBunrui = function () {
            selectList.removeAllItems();
            selectList.createItemsFromArr(["メンテナンス", "カスタム", "燃費"]);
            myNavigator.pushPage("list_select_page.html", {
                onTransitionEnd: {
                    title: SELECT_LIST_TYPES.D_BUNRUI
                }
            });
        };
        $scope.showSelectListCBunrui = function () {
            selectList.removeAllItems();
            selectList.createItemsFromArr(["オイル交換", "フォークオイル交換", "ブレーキフルード交換"]);
            myNavigator.pushPage("list_select_page.html", {
                onTransitionEnd: {
                    title: SELECT_LIST_TYPES.C_BUNRUI
                }
            });
        };
        $scope.$on("listSelected", function (e, param) {
            var ret_title = param.parent_option.title;
            // 渡した分類名称がそのままプロパティに直結する
            if (ret_title) {
                $scope.data[ret_title] = param.item.value;
            }
            else {
                outlog("returned value is invalid...");
            }
        });
    });
})();

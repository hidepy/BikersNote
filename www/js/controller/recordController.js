/*
  maintainceレコードの照会/更新系コントローラ
  ⇒全てのデータの一覧照会などを担う

  2017/05/23
  1本化する
*/
(function () {
    'use strict';
    angular.module(APP_CONFIGS.NAME) //第2引数省略 既存モジュール拡張
        .controller("ViewRecordHeaderController", function ($scope, recordManager, masterManager) {
        // 画面表示には、
        /*
        {
        id, title, opt1, opt2, opt3
        }
        の項目を表示するのでこれに合わせる事。すべて
        */
        var args = myNavigator.getCurrentPage().options;
        // 次ページの遷移先
        var next_page_url = "view_record_detail_page.html";
        //type別recordを取得
        $scope.items_disp = []; // 表示用. 方針としては、1件選択⇒キーを拾って詳細へ
        // 前画面からのtypeによって、データソースを変える
        if (args.record_type && (args.record_type == "maintainance")) {
            $scope.items_disp = recordManager.getDispRecords();
        }
        else if (args.record_type && (args.record_type == "master_typelist")) {
            $scope.items_disp = [
                { id: "master_machine", title: "MACHINE", next_record_type: "master_machine" },
                { id: "master_dbunrui", title: "D_BUNRUI", next_record_type: "master_dbunrui" },
                { id: "master_cbunrui", title: "C_BUNRUI", next_record_type: "master_cbunrui" }
            ];
            // 次ページも自身のページを表示する
            next_page_url = "view_record_header_page.html";
        }
        else if (args.record_type && (args.record_type == "master_machine")) {
            $scope.items_disp = masterManager.Machines.getDispRecords();
        }
        else if (args.record_type && (args.record_type == "master_dbunrui")) {
            $scope.items_disp = masterManager.D_BUNRUI.getDispRecords();
        }
        else if (args.record_type && (args.record_type == "master_tbunrui")) {
            $scope.items_disp = masterManager.C_BUNRUI.getDispRecords();
        }
        // 削除用
        $scope.del_targets = { items: [] };
        //削除フェーズか
        $scope.is_delete_phase = false;
        $scope.processItemSelect = function (index, event) {
            // 次ページへ遷移
            myNavigator.pushPage(next_page_url, {
                record_type: $scope.items_disp[index].next_record_type,
                id: $scope.items_disp[index].id,
                before_record_type: args.record_type
            });
        };
        // trashを押下した時
        $scope.pushTrash = function () {
            // phaseを切り替え
            $scope.is_delete_phase = !$scope.is_delete_phase;
        };
        //削除ボタン
        $scope.deleteRecord = function () {
            //storage_manager.deleteItems($scope.del_targets.items);
            var if_return = recordManager.deleteRecords($scope.del_targets.items);
            if (if_return.id == RETURN_CD.SUCCESS) {
                // 処理成功の場合
                $scope.del.items = [];
            }
        };
        $scope.checkAll = function () {
            $scope.del_targets.items = [];
            for (var i in $scope.items) {
                $scope.del_targets.items.push($scope.items[i].id);
            }
        };
        $scope.uncheckAll = function () {
            $scope.del.items = [];
        };
    })
        .controller("ViewRecordDetailController", function ($scope, selectList, recordManager, masterManager) {
        $scope.record = {};
        $scope.is_entry = false;
        $scope.is_modify = false;
        $scope.is_view = false;
        $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.ENTRY_BUTTON;
        $scope.imagePickerArgs = {
            button_id: "viewRecordDetail_imgpickerBtn",
            img_id: "viewRecordDetail_imgpickerImg"
        };
        //前画面からの引数取得
        var args = myNavigator.getCurrentPage().options;
        /* この画面は
        menu-> 登録として
        list-> 照会として
        detail-> 更新/削除として
        の入り口がある
        */
        if (args) {
            // 画面タイプを判断
            if (args.is_modify) {
                $scope.is_modify = true;
                // ボタンラベルを更新
                $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.UPDATE_BUTTON;
            }
            else if (args.is_view) {
                $scope.is_view = true;
            }
            else {
                $scope.is_entry = true;
            }
            var getData = {
                "maintainance": {
                    getRecord: recordManager.getRecord,
                    getProperty: recordManager.getRecordsProperty
                },
                "master_machine": {
                    getRecord: masterManager.Machines.getRecord,
                    getProperty: masterManager.Machines.getRecordsProperty
                },
                "master_dbunrui": {
                    getRecord: masterManager.DBunrui.getRecord,
                    getProperty: masterManager.DBunrui.getProperty
                },
                "master_cbunrui": {
                    getRecord: masterManager.CBunrui.getRecord,
                    getProperty: masterManager.CBunrui.getProperty
                }
            };
            // 表示データと型定義を取得する
            $scope.record = args.id ? getData[args.before_record_type].getRecord(args.id) : {};
            $scope.properties = getData[args.before_record_type].getProperty(true);
        }
        // 更新画面へ遷移
        $scope.move2RecordEdit = function () {
            myNavigator.pushPage('view_record_detail_page.html', {
                onTransitionEnd: {
                    item: $scope.record,
                    is_modify: true
                }
            });
        };
        // 登録処理
        $scope.processRegist = function () {
            console.log("in processRegist");
            var item = $scope.record;
            // Record 1件追加
            handleIfreturn(recordManager.registRecord(item), myNavigator);
        };
        // 削除処理
        $scope.processDelete = function () {
            var res = storage_manager_records.deleteItem($scope.record.id);
            var msg = res ? CONST_MESSAGES.DELETE_SUCCESS : CONST_MESSAGES.UPDATE_FAILURE;
            // メッセージを表示
            showAlert(msg);
            if (res) {
                popPageSafe(myNavigator);
            }
        };
        $scope.showSelectList = function (target_model) {
            console.log("target_model=" + target_model);
            var list = [];
            var type = "";
            switch (target_model) {
                case "bike":
                    list = masterManager.Machines.getSelection();
                    type = SELECT_LIST_TYPES.MY_MACHINES;
                    break;
                case "d_bunrui":
                    list = masterManager.DBunrui.getSelection();
                    type = SELECT_LIST_TYPES.D_BUNRUI;
                    break;
                case "c_bunrui":
                    list = masterManager.CBunrui.getSelection();
                    type = SELECT_LIST_TYPES.C_BUNRUI;
                    break;
            }
            selectList.removeAllItems();
            selectList.createItemsFromObjectArr(list, "key", "value");
            myNavigator.pushPage('partials/list_select_page.html', {
                onTransitionEnd: {
                    title: type
                }
            });
        };
        $scope.$on("listSelected", function (e, param) {
            var ret_title = param.parent_option.title;
            // 渡した分類名称がそのままプロパティに直結する
            if (ret_title) {
                outlog("param =");
                outlog(param);
                $scope.record[ret_title] = param.item.value;
            }
            else {
                outlog("returned value is invalid...");
            }
        });
    });
})();

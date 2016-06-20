/// <reference path="./storageManager.ts" />
/// <reference path="./commonFunctions.ts" />
(function () {
    'use strict';
    var storage_manager = new StorageManager("WIKI_DIVER_FAVORITE");
    var module = angular.module('app', ['onsen']);
    module.controller("RootController", function ($scope) {
        $scope.sharing = {};
        $scope.sharing["hide_tabbar"] = false;
        //$scope.direct = "I'm direct prop"; //これもok
    });
    module.controller('MasterController', function ($scope, $data) {
        $scope.items = $data.items;
        $scope.showDetail = function (index) {
            console.log("show detail comes");
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            //$scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
            myNavigator.pushPage('entry_record.html', 
            //{title : selectedItem.title}
            {
                onTransitionEnd: {
                    title: selectedItem.title
                }
            });
        };
    });
    module.controller("HomeController", function ($scope, currentBikeInfo) {
        $scope.data = currentBikeInfo;
        $scope.visibility = {};
        $scope.visibility.dbg_disp_area = "inline";
        console.log("tabbar object is=");
        console.log(myTabbar);
        // tabbar可視性
        $scope.sharing.hide_tabbar = false;
        $scope.movetoViewRecordHeader = function () {
            console.log("in movetoViewRecordHeader");
            myNavigator.pushPage("view_record_header_page.html");
        };
    });
    module.controller('EntryController', function ($scope, selectList) {
        console.log("in EntryController");
        $scope.bike = "";
        $scope.d_bunrui = "";
        $scope.c_bunrui = "";
        $scope.title = "";
        $scope.odd_meter = "";
        $scope.date = "";
        $scope.money = "";
        $scope.comment = "";
        $scope.UPDATE_BUTTON_NAME = "登録";
        // tabbar可視性
        $scope.sharing.hide_tabbar = true;
        console.log("tabbar 可視性=" + $scope.sharing.hide_tabbar);
        var args = myNavigator.getCurrentPage().options;
        //詳細ページから編集を押下してきた場合
        if (args.is_modify) {
            var item = args.item;
            //詳細情報をコピー
            $scope.bike = item.bike;
            $scope.d_bunrui = item.d_bunrui;
            $scope.c_bunrui = item.c_bunrui;
            $scope.title = item.title;
            $scope.odd_meter = item.odd_meter;
            $scope.date = item.date;
            $scope.money = item.money;
            $scope.comment = item.comment;
            $scope.UPDATE_BUTTON_NAME = "更新";
        }
        //登録処理
        $scope.processEntryRecord = function () {
            //ここでエラー判定処理
            var id = formatDate(new Date());
            var msg = "";
            var record = {
                id: id,
                bike: $scope.bike,
                d_bunrui: $scope.d_bunrui,
                c_bunrui: $scope.c_bunrui,
                title: $scope.title,
                odd_meter: $scope.odd_meter,
                date: $scope.date,
                money: $scope.money,
                comment: $scope.comment
            };
            //レコードを1件格納
            if (storage_manager.saveItem2Storage(id, record)) {
                msg = "success to save!!";
                myNavigator.popPage(); //前画面へ
            }
            else {
                msg = "failed to save....";
            }
            showAlert(msg);
        };
        $scope.showSelectListBike = function () {
            selectList.removeAllItems();
            selectList.addItem("1", "GN125");
            selectList.addItem("2", "VT250");
            selectList.addItem("3", "SRX250");
            selectList.addItem("4", "VTR250");
            myNavigator.pushPage('list_select_page.html', 
            //{title: "bike"}
            {
                onTransitionEnd: {
                    title: "bike"
                }
            });
        };
        $scope.showSelectListDBunrui = function () {
            selectList.removeAllItems();
            selectList.createItemsFromArr(["メンテナンス", "カスタム", "燃費"]);
            myNavigator.pushPage("list_select_page.html", 
            //{title: "d_bunrui"}
            {
                onTransitionEnd: {
                    title: "d_bunrui"
                }
            });
        };
        $scope.showSelectListCBunrui = function () {
            selectList.removeAllItems();
            selectList.createItemsFromArr(["オイル交換", "フォークオイル交換", "ブレーキフルード交換"]);
            myNavigator.pushPage("list_select_page.html", 
            //{title: "c_bunrui"}
            {
                onTransitionEnd: {
                    title: "c_bunrui"
                }
            });
        };
        $scope.$on("listSelected", function (e, param) {
            //$scope.selected_bike = item.value;
            switch (param.parent_option.title) {
                case "bike":
                    $scope.bike = param.item.value;
                    break;
                case "d_bunrui":
                    $scope.d_bunrui = param.item.value;
                    break;
                case "c_bunrui":
                    $scope.c_bunrui = param.item.value;
                    break;
                default:
                    console.log("return value missing...");
            }
        });
    });
    module.controller("SelectListController", function ($scope, $rootScope, selectList) {
        $scope.items = selectList.items;
        $scope.processItemSelect = function (index) {
            var nav_options = myNavigator.getCurrentPage().options;
            var selectedItem = selectList.items[index];
            selectList.selectedItem = selectedItem;
            myNavigator.popPage();
            // イベント通知
            $rootScope.$broadcast("listSelected", { parent_option: nav_options, item: selectedItem });
        };
    });
    module.factory("currentBikeInfo", function () {
        var data = {};
        data.name = "gn125";
        data.purchace_date = "2012/03/11";
        data.comment = "this is my first bike";
        data.img = "none";
        data.maintainance_records = 11;
        data.touring_records = 21;
        return data;
    });
    module.service("selectList", function () {
        this.items = [];
        this.selectedItem = {};
        this.addItem = function (_key, _value) {
            this.items.push({
                key: _key,
                value: _value
            });
        };
        this.removeItem = function (idx) {
            this.items.splice(idx, 1);
        };
        this.removeAllItems = function () {
            this.items.length = 0;
        };
        this.createItemsFromObjectArr = function (objArr, key_name, value_name) {
            /*
            objArr.forEach(function(val, idx, objArr){
                this.addItem(val[key_name], val[value_name]);
            });
            */
            for (var i = 0; i < objArr.length; i++) {
                this.addItem(objArr[i][key_name], objArr[i][value_name]);
            }
        };
        this.createItemsFromArr = function (arr) {
            /*
            arr.forEach(function(val, idx){
                this.addItem(idx, val);
            });
            */
            for (var i = 0; i < arr.length; i++) {
                this.addItem("" + i, arr[i]);
            }
        };
    });
    module.controller("_ts", function (currentBikeInfo) {
        this.data = currentBikeInfo;
    });
    module.controller("ViewRecordHeaderController", function ($scope) {
        //整備情報レコード
        $scope.items = convHash2Arr(storage_manager.getAllItem());
        console.log("in ViewRecordHeaderController");
        console.log($scope.items);
        $scope.processItemSelect = function (index, event) {
            console.log("item tapped!! send item is:");
            console.log($scope.items[index]);
            console.log("event is:");
            console.log(event);
            console.log("index is: " + index);
            myNavigator.pushPage('view_record_detail_page.html', 
            //{item : $scope.items[index]}
            {
                onTransitionEnd: {
                    item: $scope.items[index]
                }
            });
        };
    });
    module.controller("ViewRecordDetailConrtoller", function ($scope) {
        console.log("in ViewRecordDetailConrtoller");
        var args = myNavigator.getCurrentPage().options;
        $scope.item = args.item; //整備情報を取得(前画面からの情報まんまでよいか？)
        console.log($scope.item);
        $scope.movetoUpdate = function () {
            console.log("item tapped!!");
            myNavigator.pushPage('entry_record.html', 
            //{item : $scope.item, is_modify: true}
            {
                onTransitionEnd: {
                    item: $scope.item,
                    is_modify: true
                }
            });
        };
        $scope.processItemDelete = function () {
            console.log("ここで削除時の動作をしますよ！");
        };
    });
    module.controller('DetailController', function ($scope, $data) {
        $scope.item = $data.selectedItem;
    });
    module.factory('$data', function () {
        var data = {};
        data.items = [
            {
                title: 'Item 1 Title',
                label: '4h',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                title: 'Another Item Title',
                label: '6h',
                desc: 'Ut enim ad minim veniam.'
            },
            {
                title: 'Yet Another Item Title',
                label: '1day ago',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            },
            {
                title: 'Yet Another Item Title',
                label: '1day ago',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }
        ];
        return data;
    });
})();

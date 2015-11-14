(function(){
    'use strict';
    var module = angular.module('app', ['onsen']);

    module.controller('AppController', function($scope, $data) {
        $scope.doSomething = function() {
            setTimeout(function() {
                alert('tappaed');
            }, 100);
        };
    });

    module.controller('MasterController', function($scope, $data) {
        $scope.items = $data.items;

        $scope.showDetail = function(index) {
            console.log("show detail comes");
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            //$scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
            myNavigator.pushPage('entry_record.html', {title : selectedItem.title});
        };
    });


    module.controller("HomeController", function(currentBikeInfo){
        this.data = currentBikeInfo;

        this.visibility = {};
        this.visibility.dbg_disp_area = "inline";
    });


    module.controller('EntryController', function($scope, selectList) {

        $scope.selected_bike = "";
        $scope.selected_d_bunrui =  "";
        $scope.selected_c_bunrui = "";
        $scope.entry_title = "";
        $scope.entry_odd_meter = "";
        $scope.entry_date = "";
        $scope.entry_money = "";
        $scope.entry_comment = "";

        $scope.showSelectListBike = function(){
            
            selectList.removeAllItems();

            selectList.addItem("1", "GN125");
            selectList.addItem("2", "VT250");
            selectList.addItem("3", "SRX250");
            selectList.addItem("4", "VTR250");

            myNavigator.pushPage('list_select_page.html', {title: "bike"});
        };

        $scope.showSelectListDBunrui = function(){

            selectList.removeAllItems();

            selectList.createItemsFromArr(["メンテナンス", "カスタム", "燃費"]);

            myNavigator.pushPage("list_select_page.html", {title: "d_bunrui"});
            
        };

        $scope.showSelectListCBunrui = function(){

            selectList.removeAllItems();

            selectList.createItemsFromArr(["オイル交換", "フォークオイル交換", "ブレーキフルード交換"]);

            myNavigator.pushPage("list_select_page.html", {title: "c_bunrui"});
            
        };

        $scope.$on("listSelected", function(e, param){

            //$scope.selected_bike = item.value;

            switch(param.parent_option.title){
                case "bike":
                    $scope.selected_bike = param.item.value;
                    break;
                case "d_bunrui":
                    $scope.selected_d_bunrui = param.item.value;
                    break;
                case "c_bunrui":
                    $scope.selected_c_bunrui = param.item.value;
                    break;
                default:
                    console.log("return value missing...");
            }
        });

    });

    module.controller("SelectListController", function($scope, $rootScope, selectList){

        $scope.items = selectList.items;

        $scope.processItemSelect = function(index){
            var nav_options = myNavigator.getCurrentPage().options;
            var selectedItem = selectList.items[index];
            selectList.selectedItem = selectedItem;
            myNavigator.popPage();

            // イベント通知
            $rootScope.$broadcast("listSelected", {parent_option: nav_options, item: selectedItem});

        }
    });

    module.factory("currentBikeInfo", function(){
        var data = {};

        data.name = "gn125";
        data.purchace_date = "2012/03/11";
        data.comment = "this is my first bike";
        data.img = "none";
        data.maintainance_records = 11;
        data.touring_records = 21;

        return data;

    });

    module.service("selectList", function(){
        this.items = [];
        this.selectedItem = {};
        this.addItem = function(_key, _value){
            this.items.push({
                key: _key,
                value: _value
            });
        };
        this.removeItem = function(idx){
            this.items.splice(idx, 1);
        };
        this.removeAllItems = function(){
            this.items.length = 0;
        };
        this.createItemsFromObjectArr = function(objArr, key_name, value_name){
            /*
            objArr.forEach(function(val, idx, objArr){
                this.addItem(val[key_name], val[value_name]);
            });
            */
            for(var i = 0; i < objArr.length; i++){
                this.addItem(objArr[i][key_name], objArr[i][value_name]);
            }

        };
        this.createItemsFromArr = function(arr){
            /*
            arr.forEach(function(val, idx){
                this.addItem(idx, val);
            });
            */
            for(var i = 0; i < arr.length; i++){
                this.addItem("" + i, arr[i]);
            }
        };

    });

    module.controller("_ts", function(currentBikeInfo){
        this.data = currentBikeInfo;
    });


    module.controller('DetailController', function($scope, $data) {
        $scope.item = $data.selectedItem;
    });

    module.factory('$data', function() {
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





    /*
    module.controller('EntryController', function($scope) {

        ons.createPopover('entry_select_list_bike.html').then(function(popover) {
            $scope.popover_bike = popover;
        });

        ons.createPopover('entry_select_list_d_bunrui.html').then(function(popover) {
            $scope.popover_d_bunrui = popover;
        });

        $scope.show_select_list_bike = function(e) {
            $scope.popover_bike.show(e);
        };

        $scope.show_select_list_d_bunrui = function(e) {
            $scope.popover_d_bunrui.show(e);
        };

        $scope.select_bike = function(){
            console.log("in select_bike");
        }

    });
*/




})();
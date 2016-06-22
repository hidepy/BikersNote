declare var myNavigator: NavigatorView;
declare var myTabbar: TabbarView;
/// <reference path="./storageManager.ts" />
/// <reference path="./MaintainanceRecord.ts"/>
/// <reference path="./commonFunctions.ts" />
/// <reference path="./constants.ts"/>


(function(){
    'use strict';

    var storage_manager_records: StorageManager = new StorageManager("MAINTAINANCE_RECORDS");
    var module = angular.module(APP_CONFIGS.NAME, ['onsen']); //新規モジュールを定義

    module.controller("RootController", function($scope){
      $scope.sharing = {};
      $scope.sharing["hide_tabbar"] = false;

      // const定義のlabelたちをセット
      $scope.labels = {};
      for(let p in VIEW_LABELS){
        $scope.labels[p] = VIEW_LABELS[p];
      }
      $scope.labels["OPTIONAL1"] = $scope.labels["OPTIONAL1_DEFAULT"];
      $scope.labels["OPTIONAL2"] = $scope.labels["OPTIONAL2_DEFAULT"];
      $scope.labels["OPTIONAL3"] = $scope.labels["OPTIONAL3_DEFAULT"];

      //$scope.direct = "I'm direct prop"; //これもok

      $scope.delete_all_records = function(){
        storage_manager_records.deleteAllItem();
      }
    });

/*
    module.controller('MasterController', function($scope, $data) {
        $scope.items = $data.items;

        $scope.showDetail = function(index) {
            outlog("show detail comes");
            var selectedItem = $data.items[index];
            $data.selectedItem = selectedItem;
            //$scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
            myNavigator.pushPage(
              'entry_record.html',
              //{title : selectedItem.title}
              {
                onTransitionEnd:{
                  title: selectedItem.title
                }
              }
            );
        };
    });
*/

    module.controller("HomeController", function($scope, currentBikeInfo){
        $scope.data = currentBikeInfo;

        $scope.visibility = {};
        $scope.visibility.dbg_disp_area = "inline";

        // tabbar可視性
        $scope.sharing.hide_tabbar = false;

        $scope.movetoViewRecordHeader = function(){
            outlog("in movetoViewRecordHeader");
            myNavigator.pushPage("view_record_header_page.html");
        };
    });


    module.controller('EntryController', function($scope, selectList) {

        outlog("in EntryController");

        var mtr = new MaintainanceRecord();
        $scope.data = mtr; //オブジェクト 参照渡し

        $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.ENTRY_BUTTON;

        // 編集画面ではない を初期値としてセット
        $scope.is_modify = false;

        // tabbar可視性
        $scope.sharing.hide_tabbar = true;
        outlog("tabbar 可視性=" + $scope.sharing.hide_tabbar);

        var args: navigatorOptions = myNavigator.getCurrentPage().options;

        //詳細ページから編集を押下してきた場合
        if(args.onTransitionEnd && args.onTransitionEnd.is_modify){
            var item = args.onTransitionEnd.item;

            $scope.data = item;
            $scope.is_modify = args.onTransitionEnd.is_modify;

            $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.UPDATE_BUTTON;
        }

        //登録処理
        $scope.processEntryRecord = function(){

          // レコード
          var record = $scope.data;

          // エラー格納用
          let err_list = [];


          // エラー無しなら
          if(err_list.length == 0){

            // idが存在しなければ新たに発行する
            if(isEmpty(record.id)){
              record.id = MaintainanceRecord.generateId();
            }
            // 更新日付を更新
            record.update_datetime = new Date();

            //レコードを1件格納
            let save_result: boolean = storage_manager_records.saveItem2Storage(record.id, record);

            let msg = "";
            let is_entry = !$scope.is_modify;

            // 処理成否, 登録/編集 によってメッセージを決定
            if(save_result){
              msg = is_entry ? CONST_MESSAGES.ENTRY_SUCCESS : CONST_MESSAGES.UPDATE_SUCCESS;
              // メッセージを表示
              //myNavigator.popPage(); //前画面へ

              if((<any>myNavigator).canPopPage()){
                myNavigator.popPage();
              }
              else{
                myNavigator.resetToPage("home.html");
              }

              outlog("navigator object=");
              outlog(myNavigator);
            }
            else{
              msg = is_entry ? CONST_MESSAGES.ENTRY_FAILURE : CONST_MESSAGES.UPDATE_FAILURE;
            }

            // メッセージを表示
            showAlert(msg);
          }
        }

        $scope.showSelectListBike = function(){

            selectList.removeAllItems();

            selectList.addItem("1", "GN125");
            selectList.addItem("2", "VT250");
            selectList.addItem("3", "SRX250");
            selectList.addItem("4", "VTR250");

            myNavigator.pushPage(
              'list_select_page.html',
               {
                 onTransitionEnd: {
                   title: SELECT_LIST_TYPES.MY_MACHINES
                 }
               }
            );
        };

        $scope.showSelectListDBunrui = function(){

            selectList.removeAllItems();

            selectList.createItemsFromArr(["メンテナンス", "カスタム", "燃費"]);

            myNavigator.pushPage(
              "list_select_page.html",
              {
                onTransitionEnd:{
                  title: SELECT_LIST_TYPES.D_BUNRUI
                }
              }
            );
        };

        $scope.showSelectListCBunrui = function(){

            selectList.removeAllItems();

            selectList.createItemsFromArr(["オイル交換", "フォークオイル交換", "ブレーキフルード交換"]);

            myNavigator.pushPage(
              "list_select_page.html",
               {
                 onTransitionEnd:{
                   title: SELECT_LIST_TYPES.C_BUNRUI
                 }
               }
             );
        };

        $scope.$on("listSelected", function(e, param){

          let ret_title = param.parent_option.title;

          // 渡した分類名称がそのままプロパティに直結する
          if(ret_title){
            $scope.data[ret_title] = param.item.value;
          }
          else{
            outlog("returned value is invalid...");
          }
        });

    });

    module.factory("currentBikeInfo", function(){
        var data: any = {};

        data.name = "gn125";
        data.purchace_date = "2012/03/11";
        data.comment = "this is my first bike";
        data.img = "none";
        data.maintainance_records = 11;
        data.touring_records = 21;

        return data;

    });


    module.controller("ViewRecordHeaderController", function($scope){

        //整備情報レコード
        $scope.items = convHash2Arr(storage_manager_records.getAllItem());

        $scope.processItemSelect = function(index, event){

            myNavigator.pushPage(
              'view_record_detail_page.html',
              {
                onTransitionEnd:{
                  item: $scope.items[index]
                }
              }
            );
        };
    });


    module.controller("ViewRecordDetailConrtoller", function($scope){

        outlog("in ViewRecordDetailConrtoller");

        var args: navigatorOptions = myNavigator.getCurrentPage().options;

        $scope.item = args.onTransitionEnd.item; //整備情報を取得(前画面からの情報まんまでよいか？)

        $scope.movetoUpdate = function(){
            myNavigator.pushPage(
              'entry_record.html',
              {
                onTransitionEnd:{
                  item: $scope.item,
                  is_modify: true
                }
              }
            );
        };

        $scope.processItemDelete = function(){
          let res = storage_manager_records.deleteItem($scope.item.id);
          let msg = res ? CONST_MESSAGES.DELETE_SUCCESS : CONST_MESSAGES.UPDATE_FAILURE;

          // メッセージを表示
          showAlert(msg);

          if(res){
            if((<any>myNavigator).canPopPage()){ myNavigator.popPage(); }
            else{ myNavigator.resetToPage("home.html"); }
          }
        };

    });










    module.controller('DetailController', function($scope, $data) {
        $scope.item = $data.selectedItem;
    });

    module.factory('$data', function() {
        var data: any = {};

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

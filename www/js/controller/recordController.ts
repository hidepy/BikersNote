/*
  maintainceレコードの照会/更新系コントローラ
*/
(function(){
  'use strict';

  var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張

  module.controller("ViewRecordHeaderController", function($scope, recordManager){

      //整備情報レコード
      $scope.items = [];
      $scope.items = recordManager.getRecords();

      $scope.processItemSelect = function(index, event){

          myNavigator.pushPage('view_record_detail_page.html', {
              onTransitionEnd:{
                item: $scope.items[index],
                is_view: true
              }
          });
      };
  });


  module.controller("ViewRecordDetailController", function($scope, selectList, recordManager, masterManager){
      outlog("in ViewRecordDetailController");

      $scope.record = {};
      $scope.is_entry = false;
      $scope.is_modify = false;
      $scope.is_view = false;
      $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.ENTRY_BUTTON;

      //前画面からの引数取得
      var args: navigatorOptions = myNavigator.getCurrentPage().options;
      outlog(args);

      if(args && args.onTransitionEnd){
        //詳細ページから編集を押下してきた場合
        if(args.onTransitionEnd.is_modify){
          // 訂正画面フラグ on
          $scope.is_modify = true;

          // ボタンラベルを更新
          $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.UPDATE_BUTTON;
        }
        else if(args.onTransitionEnd.is_view){
          // 照会画面フラグ on
          $scope.is_view = true;
        }

        if(args.onTransitionEnd.item){
          $scope.item = args.onTransitionEnd.item; //整備情報を取得(前画面からの情報まんまでよいか？)
        }
      }
      else{
        // record登録画面の場合
        $scope.is_entry = true;
      }

      // 型定義を取得
      $scope.properties = recordManager.getRecordsProperty(true);

      // 更新画面へ遷移
      $scope.move2RecordEdit = function(){
          myNavigator.pushPage('view_record_detail_page.html',{
              onTransitionEnd:{
                item: $scope.record,
                is_modify: true
              }
          });
      };

      $scope.processRegist = function(){
        console.log("in processRegist");

        let item = $scope.record;
        // Record 1件追加
        handleIfreturn(recordManager.registRecord(item), myNavigator);
      };

      $scope.processDelete = function(){
        let res = storage_manager_records.deleteItem($scope.item.id);
        let msg = res ? CONST_MESSAGES.DELETE_SUCCESS : CONST_MESSAGES.UPDATE_FAILURE;

        // メッセージを表示
        showAlert(msg);

        if(res){ popPageSafe(myNavigator); }
      };

      $scope.showSelectList = function(target_model: string){

        console.log("target_model=" + target_model);

        selectList.removeAllItems();

        selectList.addItem("1", "GN125");
        selectList.addItem("2", "VT250");
        selectList.addItem("3", "SRX250");
        selectList.addItem("4", "VTR250");

        myNavigator.pushPage('list_select_page.html',{
             onTransitionEnd: {
               title: SELECT_LIST_TYPES.MY_MACHINES
             }
        });
      };

      $scope.$on("listSelected", function(e, param){

        let ret_title = param.parent_option.title;

        // 渡した分類名称がそのままプロパティに直結する
        if(ret_title){
          outlog("param =");
          outlog(param);
          $scope.record[ret_title] = param.item.value;
        }
        else{
          outlog("returned value is invalid...");
        }
      });
  });

})();

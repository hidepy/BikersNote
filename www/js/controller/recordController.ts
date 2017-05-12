/*
  maintainceレコードの照会/更新系コントローラ
*/
(function(){
  'use strict';

  angular.module(APP_CONFIGS.NAME) //第2引数省略 既存モジュール拡張
    .controller("ViewRecordHeaderController", function($scope, recordManager, masterManager){

      //整備情報レコード
      $scope.items = [];
      if(){
        $scope.items = recordManager.getRecords();
      }
      else if(){

      }
      // 削除用
      $scope.del_targets = { items: [] };
      //削除フェーズか
      $scope.is_delete_phase = false;

      $scope.processItemSelect = function(index, event){

          myNavigator.pushPage('view_record_detail_page.html', {
              onTransitionEnd:{
                item: $scope.items[index],
                is_view: true
              }
          });
      };

      // trashを押下した時
      $scope.pushTrash = function(){
        // phaseを切り替え
        $scope.is_delete_phase = !$scope.is_delete_phase;
      };

      //削除ボタン
      $scope.deleteRecord = function(){
          //storage_manager.deleteItems($scope.del_targets.items);
          let if_return: IFRETURN = recordManager.deleteRecords($scope.del_targets.items);

          if(if_return.id == RETURN_CD.SUCCESS){
            // 処理成功の場合
            $scope.del.items = [];
          }
      };

      $scope.checkAll = function() {
          $scope.del_targets.items = [];

          for(var i in $scope.items){
              $scope.del_targets.items.push($scope.items[i].id);
          }
      };

      $scope.uncheckAll = function() {
          $scope.del.items = [];
      };

  })
  .controller("ViewRecordDetailController", function($scope, selectList, recordManager, masterManager){
      outlog("in ViewRecordDetailController");

      $scope.record = {};
      $scope.is_entry = false;
      $scope.is_modify = false;
      $scope.is_view = false;
      $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.ENTRY_BUTTON;

      $scope.imagePickerArgs = {
        button_id:  "viewRecordDetail_imgpickerBtn",
        img_id: "viewRecordDetail_imgpickerImg"
      };

      //前画面からの引数取得
      var args: navigatorOptions = myNavigator.getCurrentPage().options;

      if(args && args.onTransitionEnd){
        //詳細ページから編集を押下してきた場合
        if(args.onTransitionEnd.is_modify){
          console.log("is edit screen");
          // 訂正画面フラグ on
          $scope.is_modify = true;

          // ボタンラベルを更新
          $scope.UPDATE_BUTTON_NAME = VIEW_LABELS.UPDATE_BUTTON;
        }
        else if(args.onTransitionEnd.is_view){
          console.log("is view screen");
          // 照会画面フラグ on
          $scope.is_view = true;
        }

        if(args.onTransitionEnd.item){
          $scope.record = args.onTransitionEnd.item; //整備情報を取得(前画面からの情報まんまでよいか？)
        }
      }
      else{
        console.log("is entry screen");
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
        let res = storage_manager_records.deleteItem($scope.record.id);
        let msg = res ? CONST_MESSAGES.DELETE_SUCCESS : CONST_MESSAGES.UPDATE_FAILURE;

        // メッセージを表示
        showAlert(msg);

        if(res){ popPageSafe(myNavigator); }
      };

      $scope.showSelectList = function(target_model: string){

        console.log("target_model=" + target_model);

        let list = [];
        let type = "";

        switch(target_model){
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

        selectList.createItemsFromObjectArr(
          list, "key", "value"
        );

        myNavigator.pushPage('partials/list_select_page.html',{
             onTransitionEnd: {
               title: type
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

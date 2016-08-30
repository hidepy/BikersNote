/*
  設定画面コントローラ
*/

(function(){
  'user strict'

  var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュールに追加


  // ★★★★ Masterの第一画面用コントローラ ★★★★
  module.controller("MasterController", function($scope){
    console.log("in SettingsController");

    $scope.move2MachineView = function(type){
      myNavigator.pushPage("master_header.html", {
        onTransitionEnd: {
          is_machine: (type == "Machines"),
          is_d_bunrui: (type == "DBunrui"),
          is_c_bunrui: (type == "CBunrui"),
          is_trap: (type == "Trap"),
          type_name: type
        }
      });
    };

  });


  // ★★★ Master機体画面用コントローラ(一覧) ★★★
  // ⇒ Master共通にしよう...一生おわらんわ
  // header, detail
  module.controller("MasterMachineHeader", function($scope, masterManager){
    console.log("in MasterMachineHeader");

    //$scope.machines = masterManager.Machines.getRecords();//masterManager.getMachines();
    $scope.items = [];
    $scope.is_machine = false;
    $scope.is_d_bunrui = false;
    $scope.is_c_bunrui = false;
    $scope.is_trap = false;

    // 画面への引数を取得
    var args: navigatorOptions = myNavigator.getCurrentPage().options;
    if(args.onTransitionEnd){
      $scope.is_machine = args.onTransitionEnd.is_machine;
      $scope.is_d_bunrui = args.onTransitionEnd.is_d_bunrui;
      $scope.is_c_bunrui = args.onTransitionEnd.is_c_bunrui;
      $scope.is_trap = args.onTransitionEnd.is_trap;

      $scope.items = masterManager[args.onTransitionEnd.type_name].getRecords();// 全オブジェクトには最低getRecordsが必要
    }

    $scope.move2MachineDetailRegist = function(){
      myNavigator.pushPage("master_detail.html", {
        onTransitionEnd: {
          is_machine: $scope.is_machine,
          is_d_bunrui: $scope.is_type,
          is_c_bunrui: $scope.is_c_bunrui,
          is_trap: $scope.is_trap,
          is_regist: true
        }
      });
    };

    $scope.move2MachineDetailView = function(index, event){
      myNavigator.pushPage("master_detail.html", {
        onTransitionEnd: {
          is_machine: $scope.is_machine,
          is_d_bunrui: $scope.is_type,
          is_c_bunrui: $scope.is_c_bunrui,
          is_trap: $scope.is_trap,
          is_view: true,
          item: $scope.items[index]
        }
      });
    };

  });

  module.controller("MasterMachineDetail", function($scope, masterManager){
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

    var args: navigatorOptions = myNavigator.getCurrentPage().options;

    if(args && args.onTransitionEnd){
      // booleanに縛る. viewなら読取専用
      $scope.is_readonly = !!args.onTransitionEnd.is_view;
      // 編集画面か判定フラグ
      $scope.is_edit_screen = !!args.onTransitionEnd.is_edit;

      // 読取専用画面でなければ
      if(!$scope.is_readonly){
        // 更新ボタンのラベルを、更新か登録か決定する
        $scope.UPDATE_BUTTON_NAME = $scope.is_edit_screen ? VIEW_LABELS.UPDATE_BUTTON : VIEW_LABELS.ENTRY_BUTTON;
      }

      // 表示するitemオブジェクトが存在すればセット
      if(args.onTransitionEnd.item){
        $scope.machine = args.onTransitionEnd.item;
      }
    }


    $scope.processRegist = function(){
      let item = $scope.machine;

      console.log("in processRegist");

      // マスタデータ1件登録
      //let if_return: IFRETURN = masterManager.registMachine(item);
      handleIfreturn(masterManager.Machines.registRecord(item), myNavigator);
    };

    $scope.processDelete = function(){
      console.log("in processDelete");

      let id = $scope.machine.id;
console.log("id =" + id);
      // マスタデータを1件削除(確認ダイアログあり)
      showConfirm(CONST_MESSAGES.CONFIRM_DELETE, function(res){
        if(res){
          handleIfreturn(masterManager.Machines.deleteRecord(id), myNavigator);
        }
      });
    };

    $scope.move2MachineDetailEdit = function(){
      myNavigator.pushPage("master_machine_detail.html", {
        onTransitionEnd: {
          is_edit: true,
          item: $scope.machine
        }
      });
    };

    $scope.selectTest = function(event){
      outlog("in selectTest");
      outlog(event);

      if(event.target.tagName == ("ons-button".toUpperCase())){
        outlog("event drivennnnn!!");
      }

      let target_model = event.target.getAttribute("target-model");
      outlog(target_model);


    };

  });




  // ★★★ Master分類画面用コントローラ(一覧) ★★★
  // header, detail
  module.controller("MasterTypeHeader", function($scope){
    console.log("in MasterTypeHeader");


  });

})();

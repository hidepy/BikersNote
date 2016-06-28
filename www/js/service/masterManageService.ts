/*
  マスタデータ管理サービス
*/
(function(){
  'use strict';

  var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
  // ストレージマネージャをインスタンス化
  var _sm_machine: StorageManager = new StorageManager(STORAGE_TYPE.MASTER_MACHINE);
  var _sm_dbunrui: StorageManager = new StorageManager(STORAGE_TYPE.MASTER_D_BUNRUI);
  var _sm_cbunrui: StorageManager = new StorageManager(STORAGE_TYPE.MASTER_C_BUNRUI);
  var _const_d_bunrui = [
    {
      id: "0001", name: "メンテナンス",
    },
    {
      id: "0002", name: "カスタム"
    },
    {
      id: "0003", name: "燃費"
    }
  ];

  module.service("masterManager", function(){

    this.DBunrui = {
      getSelection: function(){
        console.log("in DBunrui.getSelection");

        let res = [];

        // constをセット
        for(let i = 0; i < _const_d_bunrui.length; i++){
          res.push({key: _const_d_bunrui[i].id, value: _const_d_bunrui[i].name});
        }

        let d_bunrui_list = convHash2Arr(_sm_dbunrui.getAllItem());

        for(let i = 0; i < d_bunrui_list.length; i++){
          res.push({key: d_bunrui_list[i].id, value: d_bunrui_list[i].name});
        }

        return res;
      }
    };

    this.CBunrui = {
      getSelection: function(){
        console.log("in CBunrui.getSelection");

        let res = [];
        let c_bunrui_list = convHash2Arr(_sm_cbunrui.getAllItem());

        for(let i = 0; i < c_bunrui_list.length; i++){
          res.push({key: c_bunrui_list[i].id, value: c_bunrui_list[i].name});
        }

        return res;
      }
    };

    this.Machines = {
      getSelection: function(){
        let res = [];
        let machine_list = convHash2Arr(_sm_machine.getAllItem());
        for(let i = 0; i < machine_list.length; i++){
          res.push({key: machine_list[i].id, value: machine_list[i].name});
        }
        return res;
      },
      getRecords: function(){
        console.log("in machines.get");
        return convHash2Arr(_sm_machine.getAllItem());
      },
      getProperty: function(with_type?: boolean): any{
        if(with_type){
          return [
            { name: "id", type: "string", no_disp: true },
            { name: "name", type: "string", label: VIEW_LABELS_MASTER.COL_MACHINE, required: true, input_type: "text" },
            { name: "icon", type: "any", label: VIEW_LABELS_MASTER.COL_HOME_IMG, not_normal:true, is_img: true },
            { name: "purchase_date", type: "Date", label: VIEW_LABELS_MASTER.COL_PRCS_DATE, input_type: "date" },
            { name: "purchase_price", type: "number", label: VIEW_LABELS_MASTER.COL_RPCS_PRICE, input_type: "number" },
            { name: "odd_meter", type: "number", label: VIEW_LABELS_MASTER.COL_CURR_ODD, input_type: "number" },
            { name: "is_main", type: "boolean", label: VIEW_LABELS_MASTER.COL_MAIN_FLG, input_type: "checkbox" }
          ];
        }
        else{
          return ["id", "name", "icon", "purchase_date", "purchase_price", "odd_meter", "is_main"];
        }
      },
      registRecord: function(value: any): IFRETURN{

        let err_list = [];
        let if_return: IFRETURN = new IFRETURN();

        // エラーチェックを行う ok なら次へ
        if(err_list.length > 0){
          if_return.id = RETURN_CD.HAS_REGULAR_ERR;
          if_return.msg = "has rgr err";
          return if_return;
        }

        // id未設定の場合は発番
        if(isEmpty(value.id)){
          value.id = formatDate(new Date());
        }

        let res = _sm_machine.saveItem2Storage(value.id, value);

        if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
        if_return.msg = res ? "" : "has ftl err";

        return if_return;
      },
      deleteRecord: function(value: any): IFRETURN{
        let if_return: IFRETURN = new IFRETURN();
        let res = _sm_machine.deleteItem(value);

        if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
        if_return.msg = res ? "" : "has ftl err";

        return if_return;
      }
    };
    /*
    this.getMachines = ()=> {
      return convHash2Arr(_sm_machine.getAllItem());
    };

    this.getMachinesProperty = (with_type?: boolean): any=> {
      if(with_type){
        return [
          { name: "id", type: "string", no_disp: true },
          { name: "name", type: "string", label: VIEW_LABELS_MASTER.COL_MACHINE, required: true, input_type: "text" },
          { name: "icon", type: "any", label: VIEW_LABELS_MASTER.COL_HOME_IMG, not_normal:true, is_img: true },
          { name: "purchase_date", type: "Date", label: VIEW_LABELS_MASTER.COL_PRCS_DATE, input_type: "date" },
          { name: "purchase_price", type: "number", label: VIEW_LABELS_MASTER.COL_RPCS_PRICE, input_type: "number" },
          { name: "odd_meter", type: "number", label: VIEW_LABELS_MASTER.COL_CURR_ODD, input_type: "number" },
          { name: "is_main", type: "boolean", label: VIEW_LABELS_MASTER.COL_MAIN_FLG, input_type: "checkbox" }
        ];
      }
      else{
        return ["id", "name", "icon", "purchase_date", "purchase_price", "odd_meter", "is_main"];
      }
    };

    this.registRecord = (value: any): IFRETURN=> {

      let err_list = [];
      let if_return: IFRETURN = new IFRETURN();

      // エラーチェックを行う ok なら次へ
      if(err_list.length > 0){
        if_return.id = RETURN_CD.HAS_REGULAR_ERR;
        if_return.msg = "has rgr err";
        return if_return;
      }

      // id未設定の場合は発番
      if(isEmpty(value.id)){
        value.id = formatDate(new Date());
      }

      let res = _sm_machine.saveItem2Storage(value.id, value);

      if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
      if_return.msg = res ? "" : "has ftl err";

      return if_return;
    };

    this.deleteMachine = (value: any): IFRETURN=> {
      let if_return: IFRETURN = new IFRETURN();
      let res = _sm_machine.deleteItem(value);

      if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
      if_return.msg = res ? "" : "has ftl err";

      return if_return;
    };

    */
  });

})();

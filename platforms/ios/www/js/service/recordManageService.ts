/*
  整備レコードデータ管理サービス
*/
(function(){
  'use strict';

  var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
  var _sm: StorageManager = new StorageManager(STORAGE_TYPE.TRAN_RECORDS);

  module.service("recordManager", function(){

    this.getRecords = ()=> {
      outlog("in getRecords");
      return convHash2Arr(_sm.getAllItem());
    };

    this.getRecordsProperty = (with_type?: boolean): any=> {
      if(with_type){
        return [
          { name: "id", type: "string", no_disp: true},
          { name: "bike", type: "string", label: VIEW_LABELS.COL_MACHINE, not_normal: true, is_select: true },
          { name: "title", type: "string", label: VIEW_LABELS.COL_TITLE, required: true, input_type: "text" },
          { name: "d_bunrui", type: "string", label: VIEW_LABELS.COL_D_BUNRUI, required: true, not_normal: true, is_select: true },
          { name: "c_bunrui", type: "string", label: VIEW_LABELS.COL_C_BUNRUI,not_normal: true, is_select: true },
          { name: "odd_meter", type: "number", label: VIEW_LABELS.COL_ODD_METER, input_type: "number" },
          { name: "done_date", type: "Date", label: VIEW_LABELS.COL_DONE_DATE, input_type: "date" },
          { name: "money", type: "number", label: VIEW_LABELS.COL_MONEY, input_type: "date" },
          { name: "comment", type: "string", label: VIEW_LABELS.COL_COMMENT, input_type: "text" },
          { name: "optional_1", type: "any", label: "optional1", input_type: "text" },
          { name: "optional_2", type: "any", label: "optional2", input_type: "text" },
          { name: "optional_3", type: "any", label: "optional3", input_type: "text" },
          { name: "update_datetime", type: "Date", no_disp: true }
        ];
      }
      else{
        return [
          "id", "bike", "title", "d_bunrui", "c_bunrui", "odd_meter", "done_date", "money", "comment", "optional_1", "optional_2", "optional_3", "update_datetime"
        ];
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

      let res = _sm.saveItem2Storage(value.id, value);

      if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
      if_return.msg = res ? "" : "has ftl err";

      return if_return;
    };

  });

})();

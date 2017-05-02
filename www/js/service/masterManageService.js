/*
  マスタデータ管理サービス
*/
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
    // ストレージマネージャをインスタンス化
    var _sm_machine = new StorageManager(STORAGE_TYPE.MASTER_MACHINE);
    var _sm_dbunrui = new StorageManager(STORAGE_TYPE.MASTER_D_BUNRUI);
    var _sm_cbunrui = new StorageManager(STORAGE_TYPE.MASTER_C_BUNRUI);
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
    module.service("masterManager", function () {
        // ここ本当は継承すべきなんだけど...
        this.DBunrui = {
            getRecords: function () {
                return convHash2Arr(_sm_dbunrui.getAllItem());
            },
            getRecord: function (id) {
                return _sm_dbunrui.getItem(id);
            },
            getSelection: function () {
                console.log("in DBunrui.getSelection");
                var res = [];
                // constをセット
                for (var i = 0; i < _const_d_bunrui.length; i++) {
                    res.push({ key: _const_d_bunrui[i].id, value: _const_d_bunrui[i].name });
                }
                var d_bunrui_list = convHash2Arr(_sm_dbunrui.getAllItem());
                for (var i = 0; i < d_bunrui_list.length; i++) {
                    res.push({ key: d_bunrui_list[i].id, value: d_bunrui_list[i].name });
                }
                return res;
            }
        };
        this.CBunrui = {
            getRecords: function () {
                return convHash2Arr(_sm_cbunrui.getAllItem());
            },
            getRecord: function (id) {
                return _sm_cbunrui.getItem(id);
            },
            getSelection: function (as_raw, dbunrui) {
                console.log("in CBunrui.getSelection");
                var res = [];
                var c_bunrui_list = convHash2Arr(_sm_cbunrui.getAllItem());
                for (var i = 0; i < c_bunrui_list.length; i++) {
                    // 大分類idが与えられていて、それが今回注目の値と違ったらスキップ
                    if (dbunrui && (c_bunrui_list[i].parent_id != dbunrui)) {
                        continue;
                    }
                    // そのまま欲しい場合
                    if (as_raw) {
                        res.push(c_bunrui_list[i]);
                    }
                    else {
                        res.push({ key: c_bunrui_list[i].id, value: c_bunrui_list[i].name });
                    }
                }
                return res;
            },
            getLastId: function () {
                var last_item = getMaxItemFromHash(_sm_cbunrui, "id", true); // 最大のidを持つ要素を返却する
                if (last_item) {
                    return last_item.id;
                }
                return "0";
            },
            add: function (d_bunrui, c_bunrui_name) {
                var max_idx = "" + (Number(this.getLastId()) + 1);
                _sm_cbunrui.saveItem2Storage(max_idx, c_bunrui_name);
            }
        };
        this.Machines = {
            getSelection: function () {
                var res = [];
                var machine_list = convHash2Arr(_sm_machine.getAllItem());
                for (var i = 0; i < machine_list.length; i++) {
                    res.push({ key: machine_list[i].id, value: machine_list[i].name });
                }
                return res;
            },
            getRecords: function () {
                console.log("in machines.get");
                return convHash2Arr(_sm_machine.getAllItem());
            },
            getRecord: function (id) {
                return _sm_machine.getItem(id);
            },
            getDefaultRecord: function () {
                var first_key = "";
                for (var m in _sm_machine.getAllItem()) {
                    if (isEmpty(first_key)) {
                        first_key = m;
                    }
                    var item = _sm_machine.getItem(m);
                    if (item.is_main) {
                        return item;
                    }
                }
                return _sm_machine[first_key];
            },
            getProperty: function (with_type) {
                if (with_type) {
                    return [
                        { name: "id", type: "string", no_disp: true },
                        { name: "name", type: "string", label: VIEW_LABELS_MASTER.COL_MACHINE, required: true, input_type: "text" },
                        { name: "icon", type: "any", label: VIEW_LABELS_MASTER.COL_HOME_IMG, not_normal: true, is_img: true },
                        { name: "purchase_date", type: "Date", label: VIEW_LABELS_MASTER.COL_PRCS_DATE, input_type: "date" },
                        { name: "purchase_price", type: "number", label: VIEW_LABELS_MASTER.COL_RPCS_PRICE, input_type: "number" },
                        { name: "odd_meter", type: "number", label: VIEW_LABELS_MASTER.COL_CURR_ODD, input_type: "number" },
                        { name: "is_main", type: "boolean", label: VIEW_LABELS_MASTER.COL_MAIN_FLG, input_type: "checkbox" }
                    ];
                }
                else {
                    return ["id", "name", "icon", "purchase_date", "purchase_price", "odd_meter", "is_main"];
                }
            },
            setDefault: function (id) {
                // まずは1件対象を取得
                var machine = _sm_machine.getItem(id);
                if (!machine) {
                    console.log("no data...");
                    return;
                }
                // あったら、ここでデフォルトフラグをたてる
                machine.is_main = true;
            },
            registRecord: function (value) {
                var err_list = [];
                var if_return = new IFRETURN();
                // エラーチェックを行う ok なら次へ
                if (err_list.length > 0) {
                    if_return.id = RETURN_CD.HAS_REGULAR_ERR;
                    if_return.msg = "has rgr err";
                    return if_return;
                }
                // id未設定の場合は発番
                if (isEmpty(value.id)) {
                    value.id = formatDate(new Date());
                }
                var res = _sm_machine.saveItem2Storage(value.id, value);
                if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
                if_return.msg = res ? "" : "has ftl err";
                return if_return;
            },
            deleteRecord: function (value) {
                var if_return = new IFRETURN();
                var res = _sm_machine.deleteItem(value);
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

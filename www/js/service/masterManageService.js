/*
  マスタデータ管理サービス
*/
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
    // ストレージマネージャをインスタンス化
    var _sm_machine = new StorageManager(STORAGE_TYPE.MASTER_MACHINE);
    var _sm_cbunrui = new StorageManager(STORAGE_TYPE.MASTER_TYPE);
    var _d_bunrui = {};
    module.service("masterManager", function () {
        this.getMachines = function () {
            return convHash2Arr(_sm_machine.getAllItem());
        };
        this.getMachinesProperty = function (with_type) {
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
        };
        this.registRecord = function (value) {
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
        };
        this.deleteMachine = function (value) {
            var if_return = new IFRETURN();
            var res = _sm_machine.deleteItem(value);
            if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
            if_return.msg = res ? "" : "has ftl err";
            return if_return;
        };
    });
})();

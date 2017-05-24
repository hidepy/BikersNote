/*
  整備レコードデータ管理サービス
*/
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
    var _sm = new StorageManager(STORAGE_TYPE.TRAN_RECORDS);
    module.service("recordManager", function () {
        var _this = this;
        // idからレコード取得
        this.getRecord = function (id) {
            return _sm.getItem(id);
        };
        // 全件取得
        this.getRecords = function () {
            outlog("in getRecords");
            return convHash2Arr(_sm.getAllItem()) || [];
        };
        // リスト表示用に整形
        this.getDispRecords = function () {
            return _this.getRecords().map(function (v) {
                return {
                    id: v.id,
                    title: v.title,
                    opt1: v.bike,
                    opt2: v.d_bunrui,
                    opt3: v.c_bunrui
                };
            });
        };
        this.getRecordsProperty = function (with_type) {
            if (with_type) {
                return [
                    { name: "id", type: "string", no_disp: true },
                    { name: "bike", type: "string", label: VIEW_LABELS.COL_MACHINE, not_normal: true, is_select: true },
                    { name: "title", type: "string", label: VIEW_LABELS.COL_TITLE, required: true, input_type: "text" },
                    { name: "d_bunrui", type: "string", label: VIEW_LABELS.COL_D_BUNRUI, required: true, not_normal: true, is_select: true },
                    { name: "c_bunrui", type: "string", label: VIEW_LABELS.COL_C_BUNRUI, not_normal: true, is_select: true },
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
            else {
                return [
                    "id", "bike", "title", "d_bunrui", "c_bunrui", "odd_meter", "done_date", "money", "comment", "optional_1", "optional_2", "optional_3", "update_datetime"
                ];
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
            var res = _sm.saveItem2Storage(value.id, value);
            if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
            if_return.msg = res ? "" : "has ftl err";
            return if_return;
        };
        this.deleteRecords = function (keys) {
            var if_return = new IFRETURN();
            if (keys && (keys.length > 0)) {
                if_return.id = RETURN_CD.NO_DATA;
                if_return.msg = "has no data...";
                return if_return;
            }
            var res = _sm.deleteItems(keys);
            if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
            if_return.msg = res ? "" : "has ftl err";
        };
    });
})();

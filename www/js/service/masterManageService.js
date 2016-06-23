/*
  マスタデータ管理サービス
*/
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張
    module.service("masterManager", function () {
        // ストレージマネージャをインスタンス化
        var _sm = new StorageManager(STORAGE_TYPE.MASTER_MACHINE);
        _sm.saveItem2Storage("test01", { id: "test01", name: "gn" });
        this.getMachines = function () {
            return convHash2Arr(_sm.getAllItem());
        };
        this.registMachine = function (value) {
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
        this.deleteMachine = function (value) {
            var if_return = new IFRETURN();
            var res = _sm.deleteItem(value);
            if_return.id = res ? RETURN_CD.SUCCESS : RETURN_CD.HAS_FATAL_ERR;
            if_return.msg = res ? "" : "has ftl err";
            return if_return;
        };
    });
})();

/// <reference path="./common/commonFunctions.ts" />
/// <reference path="./common/storageManager.ts" />
/// <reference path="./const/constants.ts"/>
var storage_manager_records = new StorageManager(STORAGE_TYPE.TRAN_RECORDS);
(function () {
    'use strict';
    //angular.module(APP_CONFIGS.NAME, ['onsen']) //新規モジュールを定義

    ons.bootstrap(APP_CONFIGS.NAME, []);

})();

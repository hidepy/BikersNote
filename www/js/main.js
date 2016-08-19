/// <reference path="./common/commonFunctions.ts" />
/// <reference path="./common/storageManager.ts" />
/// <reference path="./const/constants.ts"/>
var storage_manager_records = new StorageManager(STORAGE_TYPE.TRAN_RECORDS);
(function () {
    'use strict';
    var module = angular.module(APP_CONFIGS.NAME, ['onsen']); //新規モジュールを定義
    module.directive('firstDirective', function () {
        return {
            template: '<span>初めてのディレクティブ</span>'
        };
    });
    // 全体で使用する汎用定義など
    module.controller("RootController", function ($scope) {
        $scope.sharing = {};
        $scope.sharing["hide_tabbar"] = false;
        // const定義のlabelたちをセット
        $scope.labels = {};
        for (var p in VIEW_LABELS) {
            $scope.labels[p] = VIEW_LABELS[p];
        }
        $scope.labels["OPTIONAL1"] = $scope.labels["OPTIONAL1_DEFAULT"];
        $scope.labels["OPTIONAL2"] = $scope.labels["OPTIONAL2_DEFAULT"];
        $scope.labels["OPTIONAL3"] = $scope.labels["OPTIONAL3_DEFAULT"];
        // const定義のマスタラベルたち
        $scope.mlabels = {};
        for (var p in VIEW_LABELS_MASTER) {
            $scope.mlabels[p] = VIEW_LABELS_MASTER[p];
        }
        //$scope.direct = "I'm direct prop"; //これもok
        $scope.delete_all_records = function () {
            storage_manager_records.deleteAllItem();
        };
    });
    module.factory('$data', function () {
        var data = {};
        data.items = [
            {
                title: 'Item 1 Title',
                label: '4h',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                title: 'Another Item Title',
                label: '6h',
                desc: 'Ut enim ad minim veniam.'
            },
            {
                title: 'Yet Another Item Title',
                label: '1day ago',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            },
            {
                title: 'Yet Another Item Title',
                label: '1day ago',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }
        ];
        return data;
    });
})();

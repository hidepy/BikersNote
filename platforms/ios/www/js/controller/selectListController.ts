/*
  汎用 選択リストコントローラ
*/
(function(){
  'use strict';

  var module = angular.module(APP_CONFIGS.NAME); //第2引数省略 既存モジュール拡張

  module.controller("SelectListController", function($scope, $rootScope, selectList){

      $scope.items = selectList.items;

      $scope.processItemSelect = function(index){
        var nav_options = myNavigator.getCurrentPage().options.onTransitionEnd;
        var selectedItem = selectList.items[index];
        selectList.selectedItem = selectedItem;

        myNavigator.popPage();

        // イベント通知
        $rootScope.$broadcast("listSelected", {parent_option: nav_options, item: selectedItem});

      }
  });

  module.service("selectList", function(){
    this.items = [];
    this.selectedItem = {};
    this.addItem = function(_key, _value){
        this.items.push({
            key: _key,
            value: _value
        });
    };
    this.removeItem = function(idx){
        this.items.splice(idx, 1);
    };
    this.removeAllItems = function(){
        this.items.length = 0;
    };
    this.createItemsFromObjectArr = function(objArr, key_name, value_name){
        for(var i = 0; i < objArr.length; i++){
            this.addItem(objArr[i][key_name], objArr[i][value_name]);
        }
    };
    this.createItemsFromArr = function(arr){
        for(var i = 0; i < arr.length; i++){
            this.addItem("" + i, arr[i]);
        }
    };

  });
})();

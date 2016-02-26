
var StorageManager = function(){

	console.log("StorageManager initialize start");

	this.MAINTAINANCE_RECORD_NAME = "MAINTAINANCE_RECORDS"; //整備情報

	this.maintainance_records = this.convStorage2Hash(); //整備情報を全件取得

	console.log("StorageManager initialize end");

};

/* まあ、シングルトンオブジェクトなんで、prototypeしなくていいんだけどね */


/* local storageからオブジェクトを生成 */
StorageManager.prototype.convStorage2Hash = function(){
	var item_hash = JSON.parse(window.localStorage.getItem(this.MAINTAINANCE_RECORD_NAME));

	if(!item_hash){
		item_hash = {};
	}

	return item_hash;
}
/* 全件取得 */
StorageManager.prototype.getAllItem = function(){
	return this.maintainance_records;
}
/* とある1件のみ取得 */
StorageManager.prototype.getDetailItem = function(key){
	return this.maintainance_records[key];
}
/* 1件削除 */
StorageManager.prototype.deleteItem = function(key){

	//ハッシュから削除
	delete　this.maintainance_records[key];

	//ストレージにセット
	window.localStorage.setItem(this.MAINTAINANCE_RECORD_NAME, JSON.stringify(this.maintainance_records));
}
/* 商品情報1件をハッシュに保存 */
StorageManager.prototype.saveItem = function(key, data){

	try{
		this.maintainance_records[key] = data;

		window.localStorage.setItem(this.MAINTAINANCE_RECORD_NAME, JSON.stringify(this.maintainance_records));

		return true;
	}
	catch(e){
		console.log("on saveItem, error occured...");
	}

	return false;

}


/*
		var data = {
			id
			bike
			d_bunrui
			c_bunrui
			title
			odd_meter
			date
			money
			comment
		};
*/



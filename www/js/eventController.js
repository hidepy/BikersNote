function button_clicked(event){
	console.log("button_clicked event driven");
	console.log(event);

	getHeaderInfo(event);
}

function button_clicked_to_local(){
	var url = "users/getTestData.php";

	sendRequest(url, "", 1);
}

function button_clicked_clear(event){
	document.getElementById("search_key").value = "";

}

//検索キー入力エリアでEnterボタン押下時処理
function textbox_enter_pressed(event){
	button_clicked();
}


/* イベントハンドラの登録 */
$(document).ready(function(){

	//Enter押下イベントのアタッチ
	$("#search_key").keydown(function(event){
		if(event.which == 13){
			console.log("本当にこの検索イベント入ってる？enter");
			textbox_enter_pressed();
		}
		
		
	});

	//検索ボタン押下イベントのアタッチ
	$("#search_button").click(function(event){
		console.log("本当にこの検索イベント入ってる？");
		button_clicked();
	});

});
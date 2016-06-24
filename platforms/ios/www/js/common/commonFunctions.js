/// <reference path="../../../tsd/cordova/cordova.d.ts"/>
/*
    ★★★ プロジェクト内共通　★★★
*/
/* 安全にpoppageする. 戻り先がない場合はhomeに戻る */
function popPageSafe(nav) {
    if (nav.canPopPage()) {
        nav.popPage();
    }
    else {
        nav.resetToPage("home.html");
    }
}
function handleIfreturn(ifr, nav) {
    if (ifr.id == RETURN_CD.SUCCESS) {
        showAlert(CONST_MESSAGES.ENTRY_SUCCESS);
        popPageSafe(nav);
    }
    else {
        showAlert(CONST_MESSAGES.ENTRY_FAILURE);
    }
}
function showConfirm(str, callback) {
    if (isDevice()) {
        navigator.notification.confirm(str, function (idx) {
            callback(idx == 1);
        });
    }
    else {
        var result = window.confirm(str);
        callback(result);
    }
    /*
    function onConfirm(buttonIndex) {
        if (buttonIndex==1) {
            button = "いいえ";
        } else if (buttonIndex==2) {
            button = "はい";
        } else {
            button = "unknown";
        }
        document.getElementById("confirm").innerHTML = button + " が押されました。";
    }
    */
}
/*
    ★★★ 全プロジェクト共通　★★★
*/
/* 実機上でもobjectのログを安全に吐く */
function outlog(v) {
    if (typeof v === "object") {
        if (!isDevice()) {
            console.log(v);
        }
    }
    else {
        console.log(v);
    }
}
/* デバイス上実行か確認 */
function isDevice() {
    return (window && window.device);
}
/* 時間を文字列に変換 */
function formatDate(date, onlyYMD, withSlash) {
    var delimited_char = withSlash ? "/" : "";
    var ymd_hms_separator = withSlash ? " " : "";
    var date_string = ("" + date.getFullYear() + delimited_char + ("00" + (date.getMonth() + 1)).slice(-2) + delimited_char + ("00" + date.getDate()).slice(-2));
    if (!onlyYMD) {
        date_string += "" + ymd_hms_separator + ("00" + date.getHours()).slice(-2) + delimited_char + ("00" + date.getMinutes()).slice(-2) + delimited_char + ("00" + date.getSeconds()).slice(-2);
    }
    return date_string;
}
/* JSONをクエリリクエストストリングに変換 */
function convJSON2QueryString(data) {
    var result = "";
    for (var prop in data) {
        result += "" + prop + "=" + data[prop] + "&";
    }
    console.log("in convJSON2QueryString, result is: " + result);
    return result;
}
/* ハッシュを配列に変換する */
function convHash2Arr(hash) {
    var arr = [];
    for (var prop in hash) {
        arr.push(hash[prop]);
    }
    return arr;
}
/* 配列をハッシュに変換する. キーとするプロパティ名が必要 */
function convArr2Hash(list, key) {
    var hash = {};
    if (list == null) {
        return hash;
    }
    for (var i = 0; i < list.length; i++) {
        hash[list[i][key]] = list[i];
    }
    return hash;
}
/* 文字列の空判定 */
function isEmpty(str) {
    return ((str == null) || (str == ""));
}
/* アラートを表示 */
function showAlert(str) {
    //var platform = window.device.platform;
    var platform = "";
    if (!isEmpty(str) && platform.match(/iPhone/)) {
        ons.notification.alert({
            message: str
        });
    }
    else {
        alert(str);
    }
}
// Resize Base64 Image
//   img_base64_src: string "data:image/png;base64,xxxxxxxx"
function ImgB64Resize(imgB64_src, width, height, callback) {
    console.log("in ImgB64Resize");
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    imageObj.onload = function () {
        console.log("in onload");
        //context.drawImage(imageObj, 69, 50);
        context.drawImage(imageObj, 0, 0, 100, 100);
    };
    //imageObj.src = "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg";
    imageObj.src = imgB64_src;
    console.log("img ImgB64Resize end");
}
function parseHtml(data) {
    if (jQuery) {
        //jqueryのparseを使用する
        var dom = jQuery.parseHTML(data);
        if (dom) {
            return dom;
        }
    }
    var dom_parser = new DOMParser();
    return dom_parser.parseFromString(data, "text/html");
}

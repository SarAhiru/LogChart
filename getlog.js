var appId = "appName";

var CONTENT_W = 800;
var CONTENT_H = 600;

var objBESrv = new FS_BackEndServer();

var userInfo = {};

// (function(global, $) {
// 	"use strict";

// 	var init = {
//         ctrls: function() {
//             // 自動リサイズライブラリ呼び出し
//             fsi_adjustStageSize(CONTENT_W, CONTENT_H);
//             objBESrv.getAccountInfo(function(res){
            
//                 //console.log(res);
//                 if(res.status == 0 && typeof res.data != "undefined"){
//                     userInfo = res.data;
//                     objBESrv.setSystemType(3);
//                 }else{
//                 }
            
//             });
//         },
// 		handler: function() {
//             $(window).resize(function() {
//                 // 自動リサイズライブラリ呼び出し
// 	            fsi_adjustStageSize(CONTENT_W, CONTENT_H);
//             });

//             // iPad対応（ピンチインピンチアウトによる拡大縮小を禁止）
//             document.documentElement.addEventListener('touchstart', function (e) {
//                 if (e.touches.length >= 2) {e.preventDefault();}
//             }, {passive: false});

//             // iPad対応（ダブルタップによる拡大を禁止）
//             var t = 0;
//             document.documentElement.addEventListener('touchend', function (e) {
//                 var now = new Date().getTime();
//                 if ((now - t) < 350){
//                     e.preventDefault();
//                 }
//                 t = now;
//             }, false); 
            
//             //iPad対応（ページスクロールを無効にする）
//             $(window).on('touchmove.noScroll', function(e) {
//                 e.preventDefault();
//             });
            

//         }
// 	};

// 	$(function() {
//         init.ctrls();
// 		init.handler();
        
//         $("#user_manage_id").val("33788");
//         $("#user_id").val("katonaoki");
//         $("#content_id").val("FSI_TEST_SANSUU");
        
// 	});
// }(this, jQuery));

// var getUserInfo = function(){

//     console.log(userInfo);
//     alert(JSON.stringify(userInfo));

// };

var data = [];

var getDownload = function(){
    $("#loading").css("display", "block");
    data = [];
    // value値を取得する
    // var user_manage_id = document.getElementById("user_manage_id").value;
    // var user_id = document.getElementById("user_id").value;
    // var content_id = document.getElementById("content_id").value;
    // var find_begin = document.getElementById("find_begin").value;
    // var find_end = document.getElementById("find_end").value;
    // var sort_type = document.getElementById("sort_type").value;
    // var top = document.getElementById("top").value;
    // var limit = document.getElementById("limit").value;
    // var begin_check = document.getElementById("begin_check").checked;
    // var end_check = document.getElementById("end_check").checked;
    var user_manage_id = 33788;
    var user_id = 'katonaoki';
    var content_id = 'FSI_TEST_SANSUU';
    var find_begin = document.getElementById("find_begin").value;
    var find_end = document.getElementById("find_end").value;
    var sort_type = 1;
    var top = document.getElementById("top").value;
    var limit = document.getElementById("limit").value;
    var begin_check = document.getElementById("begin_check").checked;
    var end_check = document.getElementById("end_check").checked;
    var user_id_list = [];
    if(user_id.indexOf(",") > -1){
        user_id_list = user_id.split(",");
    }else{
        user_id_list.push(user_id);
    }
    
    var myPromise = Promise.resolve();
    for(var i=0; i<user_id_list.length; i++){
        var filter = getValue(user_manage_id, user_id_list[i], content_id, find_begin, find_end, sort_type, top, limit, begin_check, end_check);
        console.log(filter);
        if(filter == null){
            $("#loading").css("display", "none");
            return;
        }else{
            myPromise = myPromise.then(task1.bind(this, filter));
        }
    }
    
    myPromise.then(function(){
        return new Promise(function (resolve, reject) {
            // ループ完了後に実行したい処理
            if(data == null || data.length == 0){
                alert("対象データがありません。検索条件を変えてください。");
            }
            else{
                //ここにデータ取得後の動作を！！
                downloadCSV(data);
            }
            resolve();
            $("#loading").css("display", "none");
        });
    });
};

function task1(filter){ // 引数iを受け取る
  return new Promise(function(resolve, reject) {
	if(filter != null){
	    objBESrv.getActionLog(filter, function(res){
			console.log(res);
		    if(typeof res.status !== "undefined" && res.status == 0){
		        //console.log(res.data);
		        //downloadCSV(res.data);
		        data = data.concat(res.data);
		    }else if(typeof res.error.code !== "undefined"){
		        //alert(res.error.code + ": " + res.error.message);
		    }
	        resolve();
	     });
	 }
  });
}


//CSVダウンロード
var downloadCSV = function(jsonData) {
    //ダウンロードするCSVファイル名
	const filename = document.getElementById("user_manage_id").value + "_" + document.getElementById("content_id").value + "_study_log.csv";
    //CSVデータ
    let csvData = "date, index, actor, action, bookId, chapter, type, pageIdx, appId, target\n";
    //JSONデータ挿入
    // jsonData.forEach(element => {
        var json = element.json;
        var time = element.date;
        var formatTime = time.substring(0, 4) +'/'+ time.substring(4, 6) +'/'+ time.substring(6, 8) +' '+ time.substring(8, 10) +':'+ time.substring(10, 12) +':'+ time.substring(12, 14);
        csvData += formatTime + ',';
        csvData += element.index + ',';
        csvData += element.actor + ',';
        csvData += json.action + ',';
        csvData += json.page.bookId + ',';
        csvData += json.page.chapter + ',';
        csvData += json.page.type + ',';
        csvData += json.page.pageIdx + ',';
        csvData += json.page.appId + ',';
    	csvData += JSON.stringify(json.target) + '\n';
    // });
    // //BOMを付与（文字化け対策）
    // const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    // //Blobでデータを作成する
    // const blob = new Blob([bom, csvData], { type: "text/csv" });
    
    // //IE対応（download属性が機能しないためmsSaveBlobを使用）
    // if(window.navigator.msSaveBlob){
    //     window.navigator.msSaveBlob(blob, filename);         
    // //その他ブラウザ
    // }else{
    //     //BlobからURLを作成
    //     const url = (window.URL || window.webkitURL).createObjectURL(blob);
    //     //ダウンロード用にリンクを作成
    //     const download = document.createElement("a");
    //     //リンク先に上記で生成したURLを指定
    //     download.href = url;
    //     //download属性にファイル名を指定
    //     download.download = filename;
    //     //作成したリンクをクリックしてダウンロードを実行
    //     download.click();
    //     //createObjectURLで作成したURLを開放
    //     (window.URL || window.webkitURL).revokeObjectURL(url);
    // }
};


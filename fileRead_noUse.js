// File APIを利用して、CSVファイルの読み取り
console.log("通過しました　file_read.js");
var file = document.getElementById('file');
var result = document.getElementById('result');

const data = [];

// 使用しているブラウザがFile APIに対応しているか確認
if(window.File && window.FileReader && window.FileList && window.Blob) {
  // File APIに対応している場合
    function loadLocalCsv(e) {
        // ファイル情報を取得
        var fileData = e.target.files[0];
        console.log("確認用");
        console.log(fileData); // 取得した内容の確認用
 
        // CSVファイル以外は処理を止める
        if(!fileData.name.match('.csv$')) {
            alert('CSVファイルを選択してください');
            return;
        }
 
        // FileReaderオブジェクトを使ってファイル読み込み
        var reader = new FileReader();
        // ファイル読み込みに成功したときの処理
        reader.onload = function() {
            const cols = reader.result.split('\n'); // 行ごとに分ける
            //const data = [];
            for (var i = 0; i < cols.length; i++) {
                data[i] = cols[i].split(','); // 行ごとに分けたものを , ごとに分ける
            }
            console.log(data);
            console.log(data[0][2]); // 2次元配列になっている
            var insert = createTable(data);
            result.appendChild(insert);
        }
        // ファイル読み込みを実行
        //reader.readAsText(fileData); // 今回は文字化けするのでこれはコメントアウト
        reader.readAsText(fileData, 'Shift_JIS');
    }
    file.addEventListener('change', loadLocalCsv, false);
 
} else {
  // File APIに対応していない場合
    file.style.display = 'none';
    result.innerHTML = 'File APIに対応したブラウザでご確認ください';
}
 
function createTable(data) {
    var table = document.createElement('table');
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < data[i].length; j++) {
            var td = document.createElement('td');
            td.innerText = data[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
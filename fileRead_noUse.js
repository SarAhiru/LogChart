
var admin = require("firebase-admin");

var serviceAccount = require("./digitaltextbook-log-firebase-adminsdk-qc7c7-fe81df942c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// var docRef = db.collection('users').doc('alovelace');

// var setAda = docRef.set({
//     first: 'Ada',
//     last: 'Lovelace',
//     born: 1815
// });

db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });


// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// (async () => {
//     try {
//       const firebase = require('firebase')
//       const config = {
//         apiKey: '### FIREBASE API KEY ###',
//         authDomain: '### FIREBASE AUTH DOMAIN ###',
//         projectId: '### CLOUD FIRESTORE PROJECT ID ###',
//       }
//       firebase.initializeApp(config)
//       const db = firebase.firestore()
  
//       const userRef = db.collection('users').doc('kpUVKKold2s0rMcDnPTx')
//       const userDoc = await userRef.get()
//       if (userDoc.exists) {
//         console.log(userDoc.id)
//         console.log(userDoc.data())
//         console.log(userDoc.get('name'))
//         console.log(userDoc.get('old'))
//       } else {
//         console.log('No such document!')
//       }
//       await db.app.delete()
//     } catch (err) {
//       console.log(`Error: ${JSON.stringify(err)}`)
//     }
//   })()

// console.log("finish");





// // File APIを利用して、CSVファイルの読み取り
// function fileRead(){

// }


// console.log("通過しました　file_read.js");
// var file = document.getElementById('file');
// var result = document.getElementById('result');

// const data = [];

// // 使用しているブラウザがFile APIに対応しているか確認
// if(window.File && window.FileReader && window.FileList && window.Blob) {
//   // File APIに対応している場合
//     function loadLocalCsv(e) {
//         // ファイル情報を取得
//         var fileData = e.target.files[0];
//         console.log("確認用");
//         console.log(fileData); // 取得した内容の確認用
 
//         // CSVファイル以外は処理を止める
//         if(!fileData.name.match('.csv$')) {
//             alert('CSVファイルを選択してください');
//             return;
//         }
 
//         // FileReaderオブジェクトを使ってファイル読み込み
//         var reader = new FileReader();
//         // ファイル読み込みに成功したときの処理
//         reader.onload = function() {
//             const cols = reader.result.split('\n'); // 行ごとに分ける
//             //const data = [];
//             for (var i = 0; i < cols.length; i++) {
//                 data[i] = cols[i].split(','); // 行ごとに分けたものを , ごとに分ける
//             }
//             console.log(data);
//             console.log(data[0][2]); // 2次元配列になっている
//             var insert = createTable(data);
//             result.appendChild(insert);
//         }
//         // ファイル読み込みを実行
//         //reader.readAsText(fileData); // 今回は文字化けするのでこれはコメントアウト
//         reader.readAsText(fileData, 'Shift_JIS');
//     }
//     file.addEventListener('change', loadLocalCsv, false);
 
// } else {
//   // File APIに対応していない場合
//     file.style.display = 'none';
//     result.innerHTML = 'File APIに対応したブラウザでご確認ください';
// }
 
// function createTable(data) {
//     var table = document.createElement('table');
//     for (var i = 0; i < data.length; i++) {
//         var tr = document.createElement('tr');
//         for (var j = 0; j < data[i].length; j++) {
//             var td = document.createElement('td');
//             td.innerText = data[i][j];
//             tr.appendChild(td);
//         }
//         table.appendChild(tr);
//     }
//     return table;
// }
function scvFileRead(){
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
              //result.appendChild(insert);
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
}


function drawChart(){
  // グラフの表示
  console.log("通過しました　main.js");
  var ctx = document.getElementById("myChart").getContext('2d');
  //console.log(data[0][2]);

  var chart = new Chart(ctx, {
      "type":"bar",
      "data":
      {"labels":["Eating","Drinking","Sleeping","Designing","Coding","Cycling","Running"],
      "datasets":
        [
          {"label":"First Data","data":[65,59,90,81,56,55,40],
          "fill":true,
          "backgroundColor":"rgba(255, 99, 132, 0.2)",
          "borderColor":"rgb(255, 99, 132)","pointBackgroundColor":"rgb(255, 99, 132)",
          "pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff",
          "pointHoverBorderColor":"rgb(255, 99, 132)"},

          {"label":"My Second Dataset","data":[28,48,40,19,96,27,100],
          "fill":true,"backgroundColor":"rgba(54, 162, 235, 0.2)",
          "borderColor":"rgb(54, 162, 235)","pointBackgroundColor":"rgb(54, 162, 235)",
          "pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(54, 162, 235)"}
        ]
      },
      "options":{"elements":{"line":{"tension":0,"borderWidth":3}}}
  });
}



    /*
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
})*/

//学習者用デジタル教科書　英語　ログ　人数合計グラフ生成　[全体]

function drawStuNumChart(member, time, num) {

  let stuNum = []; // グラフ縦軸
  // let actor = []; //操作者　重複回避用
  // let actorJudge = 0; //操作者　重複回避用

  // let datanum = 0; //配列番号カウント用

  // let ftime = 0; //first time
  // let judge = 0; //初回かどうかを判断

  for (let x = 0; x < time.length; x++) {
    stuNum[x] = 0;
  }

  // console.log(num);
  for(let x = 0; x < time.length; x++){
    for(let i = 0; i < member.length; i++){
      if(num[i][x] != 0){
        stuNum[x] ++;
      }
    }
  }


  // // 初期化
  // for (let x = 0; x < time.length; x++) {
  //   stuNum[x] = 0;
  // }
  // for (let x = 0; x < member.length; x++) {
  //   actor[x] = 0;
  // }

  // if (result.length > 0) {
  //   for (let x = startnum; x <= finishnum; ++x) {
  //     let logDate = result[x][0]; // date取得
  //     let logActor = result[x][2]; // actor取得

  //     //console.log(x + "  " + result[x][0]);
  //     //console.log(x + "  " + result[x][2]);

  //     let date = new Date(logDate); //時刻型のデータに変換

  //     //始めだけfirst timeを設定
  //     if (judge == 0) {
  //       ftime = new Date(logDate);
  //       datanum = 1;
  //     }
  //     judge = 1;

  //     //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
  //     while (date.getTime() >= ftime.getTime()) { //1分経過したのかを判断
  //       ftime.setMinutes(ftime.getMinutes() + 1);

  //       for (let x = 0; x < member.length; x++) {
  //         actor[x] = 0;
  //       }
  //       datanum++;
  //     }

  //     //actorを最後までたどって一致するものがあるのか判断させたい
  //     for (let i = 0; i <= member.length; i++) {
  //       if (member[i] == logActor) {
  //         actor[i]++;
  //         if (actor[i] == 1) {
  //           stuNum[datanum - 1]++;
  //         }
  //         break;
  //       }
  //     }
  //   }
  // }

  let ctx = document.getElementById('numChart').getContext('2d');
  window.numChart = new Chart(ctx, {
    //線グラフ
    type: 'bar',
    //データ
    data: {
      labels: time,
      //データセット
      datasets: [{
        label: '操作人数',
        data: stuNum,
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        borderColor: 'rgba(255, 75, 0, 1)',
        borderWidth: 1
      }]
    },
    options: {
      animation: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
                label += stuNum[context.dataIndex];
                label += '人';
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  });
}
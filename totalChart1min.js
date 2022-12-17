//児童ごと　操作回数合計　[グラフ]　[全体合計 １分]

function drawBarChart(member, time, num, nickname) {
  let color = ['rgba(102, 102, 204, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 128, 1)', 'rgba(128, 128, 0, 1)', 'rgba(0, 128, 0, 1)'
    , 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 128, 1)', 'rgba(255, 0, 255, 1)'
    , 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 0, 1)', 'rgba(128, 0, 0, 1)', 'rgba(255, 102, 0, 1)', 'rgba(128, 128, 0, 1)'
    , 'rgba(0, 128, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 128, 1)'
    , 'rgba(255, 0, 255, 1)', 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 0, 1)', 'rgba(128, 0, 0, 1)', 'rgba(255, 102, 0, 1)'
    , 'rgba(128, 128, 0, 1)', 'rgba(0, 128, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)', 'rgba(0, 0, 255, 1)'
    , 'rgba(0, 0, 128, 1)', 'rgba(255, 0, 255, 1)', 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 0, 1)', 'rgba(128, 0, 0, 1)'
    , 'rgba(255, 102, 0, 1)', 'rgba(128, 128, 0, 1)', 'rgba(0, 128, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)',]

  // let color = ['rgba(0, 90, 255, 1)','rgba(3, 175, 122, 1)','rgba(77, 196, 255, 1)','rgba(246, 170, 0, 1)','rgba(255, 241, 0, 1)'
  //             ,'rgba(0, 0, 0, 1)','rgba(255, 75, 0, 1)','rgba(0, 90, 255, 1)','rgba(3, 175, 122, 1)','rgba(77, 196, 255, 1)'
  //             ,'rgba(246, 170, 0, 1)','rgba(255, 241, 0, 1)','rgba(0, 0, 0, 1)','rgba(255, 75, 0, 1)','rgba(0, 90, 255, 1)'
  //             ,'rgba(3, 175, 122, 1)','rgba(77, 196, 255, 1)','rgba(246, 170, 0, 1)','rgba(255, 241, 0, 1)','rgba(0, 0, 0, 1)'
  //             ,'rgba(255, 75, 0, 1)','rgba(0, 90, 255, 1)','rgba(3, 175, 122, 1)','rgba(77, 196, 255, 1)','rgba(246, 170, 0, 1)'
  //             ,'rgba(255, 241, 0, 1)','rgba(0, 0, 0, 1)','rgba(255, 75, 0, 1)','rgba(0, 90, 255, 1)','rgba(3, 175, 122, 1)'
  //             ,'rgba(77, 196, 255, 1)','rgba(246, 170, 0, 1)','rgba(255, 241, 0, 1)','rgba(0, 0, 0, 1)','rgba(255, 75, 0, 1)'
  //             ,'rgba(0, 90, 255, 1)','rgba(3, 175, 122, 1)','rgba(77, 196, 255, 1)','rgba(246, 170, 0, 1)','rgba(255, 241, 0, 1)',]

  // let color = ['rgba(51, 0, 152, 1)','rgba(255, 204, 0, 1)','rgba(255, 153, 153, 1)','rgba(255, 153, 0, 1)','rgba(255, 102, 153, 1)'
  //             ,'rgba(255, 102, 0, 1)','rgba(255, 51, 153, 1)','rgba(255, 51, 0, 1)','rgba(204, 255, 0, 1)','rgba(204, 204, 0, 1)'
  //             ,'rgba(204, 153, 0, 1)','rgba(204, 153, 0, 1)','rgba(204, 102, 153, 1)','rgba(204, 102, 0, 1)','rgba(204, 51, 204, 1)'
  //             ,'rgba(204, 51, 51, 1)','rgba(153, 255, 153, 1)','rgba(153, 204, 51, 1)','rgba(153, 153, 255, 1)','rgba(153, 153, 51, 1)'
  //             ,'rgba(153, 102, 204, 1)','rgba(153, 102, 51, 1)','rgba(153, 51, 153, 1)','rgba(153, 0, 0, 1)','rgba(102, 204, 204, 1)'
  //             ,'rgba(102, 204, 102, 1)','rgba(102, 153, 204, 1)','rgba(102, 102, 204, 1)','rgba(102, 51, 51, 1)','rgba(102, 0, 153, 1)'
  //             ,'rgba(51, 153, 204, 1)','rgba(51, 102, 153, 1)','rgba(51, 51, 153, 1)','rgba(51, 51, 0, 1)','rgba(51, 0, 102, 1)'
  //             ,'rgba(0, 255, 153, 1)','rgba(0, 153, 255, 1)','rgba(0, 153, 51, 1)','rgba(0, 102, 153, 1)','rgba(0, 51, 0, 1)',]


  /*
      //console.log(member);
    
      let totalnum = []; //全体平均用
      let num = []; // 操作回数
      let membernum = 0; //何人目のデータか
  
      let datanum = 0; //配列番号カウント用
      let ftime = 0; //first time
      let judge = 0; //初回かどうかを判断
      let fminute = 0; //グラフの軸ラベル用
      let fhour = 0;
  
      // 初期化
      for(let x = 0; x < time.length ; x++){
        totalnum[x] = 0;
      }
      for(let i = 0 ; i < member.length ; i++){
          num.push(Array(time.length));
          for(let x = 0; x < time.length ; x++){
            num[i][x] = 0;
          }
      }
  
      if(dataLength > 0){
          for(let x = 1; x < dataLength ; x++){
              let logDate = result[x][0]; // date取得
              let logActor = result[x][2]; // actor取得
  
              //console.log(x + "  " + result[x][0]);
              //console.log(x + "  " + result[x][2]);// actor表示
  
              //今回のデータは何人目の生徒なのか
              // for(let i = 0 ; i < member.length ; i++){
              //   if(member[i] == logActor){
              //     membernum = i;
              //     break;
              //   }
              // }
              membernum = member.indexOf(logActor);
              console.log(membernum);
  
              //横軸時間管理
              let date = new Date(logDate);
  
              //始めだけfirst timeを設定
              if(judge == 0){
                ftime = new Date(logDate);
                datanum = 1;
              }
              judge = 1;
              
              //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
              
              while(date.getTime() >= ftime.getTime()){ //1分経過したのかを判断
                  ftime.setMinutes(ftime.getMinutes() + 1);
                  datanum ++;
              }
              num[membernum][datanum-1] ++;
              totalnum[datanum-1] ++;
          }
      }
  
      for(let x = 0; x < time.length ; x++){
        totalnum[x] = totalnum[x]/member.length;  //人数で割って平均を出したい
      }
  */
  // console.log("確認用");

  //ランダムな色の生成
  function generateRandomCode() {
    var myRandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return myRandomColor;
  }

  //生徒ごとのデータ作成
  const studentDatasets = function () {
    const datasets = [];

    datasets.push({
      label: '児童平均',
      data: num[member.length],
      backgroundColor: 'rgba(255, 75, 0, 1)',//'rgba(255, 0, 0, 1)',
      // backgroundColor: generateRandomCode() ,
    })


    for (let i = 0; i < member.length; i++) {
      if (nickname[i] === undefined) {
        datasets.push({
          label: '生徒' + (i + 1),
          data: num[i],
          backgroundColor: color[i],
          // backgroundColor: generateRandomCode() ,
        })
      } else {
        datasets.push({
          label: nickname[i],
          data: num[i],
          backgroundColor: color[i],
          // backgroundColor: generateRandomCode() ,
        })
      }
    }
    return datasets
  }

  let ctx = document.getElementById('studentChart').getContext('2d');
  window.studentChart = new Chart(ctx, {
    //線グラフ
    type: 'bar',
    //データ
    data: {
      labels: time,
      datasets: studentDatasets(),
      /*
      //データセット
      datasets: [{
        label: '全体平均',
        data: num[0], //totalnum,
        backgroundColor: 'rgba(255, 0, 0, 1)',
        borderColor:'rgba(255, 0, 0, 1)',
        borderWidth: 1
      },
      {
        label: '1_生徒1',
        data: num[0],
        backgroundColor: 'rgba(0, 255, 0, 1)',
        borderColor:'rgba(0, 255, 0, 1)',
        borderWidth: 1
      },
      {
        label: '1_生徒2',
        data: num[1],
        backgroundColor: 'rgba(128, 0, 0, 1)',
        borderColor:'rgba(128, 0, 0, 1)',
        borderWidth: 1
      }
    ]*/
    },
    options: {
      animation: false,
      scales: {
        x: {
          categoryPercentage: 1.1,
          barPercentage: 1,
        },
        y: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  });
  // console.log("表示完了！");
}

function drawBarChart_select(member, time, detailnum, nickname, selectjudge) {
  let color = ['rgba(102, 102, 204, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 128, 1)', 'rgba(128, 128, 0, 1)', 'rgba(0, 128, 0, 1)'
    , 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 128, 1)', 'rgba(255, 0, 255, 1)'
    , 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 0, 1)', 'rgba(128, 0, 0, 1)', 'rgba(255, 102, 0, 1)', 'rgba(128, 128, 0, 1)'
    , 'rgba(0, 128, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 0, 128, 1)'
    , 'rgba(255, 0, 255, 1)', 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 0, 1)', 'rgba(128, 0, 0, 1)', 'rgba(255, 102, 0, 1)'
    , 'rgba(128, 128, 0, 1)', 'rgba(0, 128, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)', 'rgba(0, 0, 255, 1)'
    , 'rgba(0, 0, 128, 1)', 'rgba(255, 0, 255, 1)', 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 0, 1)', 'rgba(128, 0, 0, 1)'
    , 'rgba(255, 102, 0, 1)', 'rgba(128, 128, 0, 1)', 'rgba(0, 128, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 128, 128, 1)',]

  // //ランダムな色の生成
  // function generateRandomCode() {
  //   var myRandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  //   return myRandomColor;
  // }

  //生徒ごとのデータ作成
  const studentDatasets = function () {
    const datasets = [];
    let num = [];
    for (let i = 0; i < member.length; i++) {
      num.push(Array(time.length));
      for (let x = 0; x < time.length; x++) {
        num[i][x] = 0;
      }
    }
    // console.log(num);
    console.log(selectjudge);
    for (let i = 0; i < member.length; i++) {
      // num.push(Array(time.length));
      for (let x = 0; x < time.length; x++) {
        // console.log(detailnum[selectjudge + 8 * i][x]);
        num[i][x] = detailnum[selectjudge + 8 * i][x];
        // console.log(num);
      }
    }


    // datasets.push({
    //   label: '児童平均',
    //   data: num[member.length],
    //   backgroundColor: 'rgba(255, 75, 0, 1)',//'rgba(255, 0, 0, 1)',
    //   // backgroundColor: generateRandomCode() ,
    // })

    for (let i = 0; i < member.length; i++) {
      if (nickname[i] === undefined) {
        datasets.push({
          label: '生徒' + (i + 1),
          data: num[i],
          backgroundColor: color[i],
          // backgroundColor: generateRandomCode() ,
        })
      } else {
        datasets.push({
          label: nickname[i],
          data: num[i],
          backgroundColor: color[i],
          // backgroundColor: generateRandomCode() ,
        })
      }
    }
    return datasets
  }

  let ctx = document.getElementById('studentChart').getContext('2d');
  window.studentChart = new Chart(ctx, {
    //線グラフ
    type: 'bar',
    //データ
    data: {
      labels: time,
      datasets: studentDatasets(),
      /*
      //データセット
      datasets: [{
        label: '全体平均',
        data: num[0], //totalnum,
        backgroundColor: 'rgba(255, 0, 0, 1)',
        borderColor:'rgba(255, 0, 0, 1)',
        borderWidth: 1
      },
      {
        label: '1_生徒1',
        data: num[0],
        backgroundColor: 'rgba(0, 255, 0, 1)',
        borderColor:'rgba(0, 255, 0, 1)',
        borderWidth: 1
      },
      {
        label: '1_生徒2',
        data: num[1],
        backgroundColor: 'rgba(128, 0, 0, 1)',
        borderColor:'rgba(128, 0, 0, 1)',
        borderWidth: 1
      }
    ]*/
    },
    options: {
      animation: false,
      scales: {
        x: {
          categoryPercentage: 1.1,
          barPercentage: 1,
        },
        y: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  });
  // console.log("表示完了！");
}
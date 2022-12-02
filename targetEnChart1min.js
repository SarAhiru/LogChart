//英語　機能　[グラフ]

function drawChartTarget(result, time, startnum, finishnum) {
  let indexCount = []; //目次を見た回数
  let cpCount = []; //ページ移動の回数
  let audioCount = []; //音声の回数
  let videoCount = []; //動画回数
  let penCount = []; //ペン選択回数

  let datanum = 0; //配列番号カウント用
  // let ftime = 0; //first time
  // let judge = 0; //初回かどうかを判断

  // 初期化
  for (let x = 0; x < time.length; x++) {
    indexCount[x] = 0;
    cpCount[x] = 0;
    audioCount[x] = 0;
    videoCount[x] = 0;
    penCount[x] = 0;
  }

  if (result.length > 0) {
    for (let x = startnum; x <= finishnum; ++x) {
      let logDate = result[x][0]; // date取得
      let logTarget = result[x][9]; // target取得

      //console.log(x + "  " + result[x][0]);
      //console.log(x + "  " + result[x][9]);

      let date = logDate.substring(11, 16);
      datanum = time.indexOf(date);

      // let date = new Date(logDate); //logDateをDate型に直す
      // //console.log(date.toLocaleString());

      // //始めだけfirst timeを設定
      // if (judge == 0) {
      //   ftime = new Date(logDate);
      //   datanum = 0;
      //   judge = 1;
      //   ftime.setMinutes(ftime.getMinutes() + 1);
      // }
      // else {
      //   while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
      //     ftime.setMinutes(ftime.getMinutes() + 1);
      //     datanum++;
      //   }
      // }
      // console.log(datanum);


      if (logTarget.includes('index')) { // indexの文字を含んでいるのかどうか
        indexCount[datanum]++;
      }
      else if (logTarget.includes('cp')) {
        let last = logTarget.slice(-2, -1);
        if (last == "4") {
          cpCount[datanum]++;
        }
      }
      else if (logTarget.includes('pager') || logTarget.includes('open tenkey')) {
        cpCount[datanum]++;
      }
      else if (logTarget.includes('audio')) {
        if (logTarget.includes('audio volume') || logTarget.includes('audio button pitch') || logTarget.includes('audio button setting') || logTarget.includes('audio button mute') || logTarget.includes('audio button close')) {
        } else {
          audioCount[datanum]++;
        }
      }
      else if (logTarget.includes('video')) {
        if (logTarget.includes('video volume') || logTarget.includes('video button pitch') || logTarget.includes('video button fullscreen') || logTarget.includes('video button setting') || logTarget.includes('video button mute') || logTarget.includes('video button close')) {
        } else {
          videoCount[datanum]++;
        }
      }
      else if (logTarget.includes('simplePen black: true') || logTarget.includes('simplePen red: true') || logTarget.includes('penType')) {
        penCount[datanum]++;
      }
    }
  }


  let ctx = document.getElementById('targetChart').getContext('2d');
  window.targetChart = new Chart(ctx, {
    //線グラフ
    type: 'bar', //'line',
    //データ
    data: {
      labels: time,
      //データセット
      datasets: [{
        label: '目次閲覧',
        data: indexCount,
        backgroundColor: 'rgba(127, 0, 255, 0.5)',
        borderColor: 'rgba(127, 0, 255, 2)',
        borderWidth: 1
      },
      {
        label: 'ページ移動',
        data: cpCount,
        backgroundColor: 'rgba(0, 128, 255, 0.5)',
        borderColor: 'rgba(0, 128, 255, 1)',
        borderWidth: 1
      },
      {
        label: '音声',
        data: audioCount,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1
      },
      {
        label: '動画',
        data: videoCount,
        backgroundColor: 'rgba(255, 210, 0, 0.5)',
        borderColor: 'rgba(255, 128, 0, 1)',
        borderWidth: 1
      },
      {
        label: 'ペン選択',
        data: penCount,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1
      }
      ]
    },
    options: {
      animation: false,
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

function drawChartTarget_noEng(result, time, startnum, finishnum) {
  let indexCount = []; //目次を見た回数
  let cpCount = []; //ページ移動の回数
  let rinkCount = []; //リンクを踏んだ回数
  let pinchCount = []; //拡大した回数
  let penCount = []; //ペン選択回数

  let datanum = 0; //配列番号カウント用
  // let ftime = 0; //first time
  // let judge = 0; //初回かどうかを判断

  // 初期化
  for (let x = 0; x < time.length; x++) {
    indexCount[x] = 0;
    cpCount[x] = 0;
    rinkCount[x] = 0;
    pinchCount[x] = 0;
    penCount[x] = 0;
  }

  if (result.length > 0) {
    for (let x = startnum; x <= finishnum; ++x) {
      let logDate = result[x][0]; // date取得
      let logTarget = result[x][9]; // target取得

      //console.log(x + "  " + result[x][0]);
      //console.log(x + "  " + result[x][9]);

      let date = logDate.substring(11, 16);
      datanum = time.indexOf(date);
      // let date = new Date(logDate); //logDateをDate型に直す
      // //console.log(date.toLocaleString());

      // //始めだけfirst timeを設定
      // if (judge == 0) {
      //   ftime = new Date(logDate);
      //   datanum = 0;
      //   judge = 1;
      //   ftime.setMinutes(ftime.getMinutes() + 1);
      // }
      // else {
      //   while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
      //     ftime.setMinutes(ftime.getMinutes() + 1);
      //     datanum++;
      //   }
      // }
      // console.log(datanum);


      if (logTarget.includes('index')) { // indexの文字を含んでいるのかどうか
        indexCount[datanum]++;
      }
      else if (logTarget.includes('cp')) {
        // console.log(logTarget);
        let last = logTarget.slice(-2, -1);
        // console.log(last);
        if (last == "4") {
          cpCount[datanum]++;
        }
        if (last == "0" || last == "1" || last == "2" || last == "3" || last == "5" || last == "7") {
          rinkCount[datanum]++;
        }
        if (last == "6") {
          pinchCount[datanum]++;
        }
      }
      else if (logTarget.includes('pager') || logTarget.includes('open tenkey')) {
        cpCount[datanum]++;
      }
      else if (logTarget.includes('reflow') || logTarget.includes('bottomTab')) {
        rinkCount[datanum]++;
      }
      else if (logTarget.includes('zoom')) {
        if (logTarget.includes('zoomEnd')) {
        } else {
          pinchCount[datanum]++;
        }
      }
      else if (logTarget.includes('simplePen black: true') || logTarget.includes('simplePen red: true') || logTarget.includes('penType')) {
        penCount[datanum]++;
      }
    }
  }


  let ctx = document.getElementById('targetChart').getContext('2d');
  window.targetChart = new Chart(ctx, {
    //線グラフ
    type: 'bar', //'line',
    //データ
    data: {
      labels: time,
      //データセット
      datasets: [{
        label: '目次閲覧',
        data: indexCount,
        backgroundColor: 'rgba(127, 0, 255, 0.5)',
        borderColor: 'rgba(127, 0, 255, 2)',
        borderWidth: 1
      },
      {
        label: 'ページ移動',
        data: cpCount,
        backgroundColor: 'rgba(0, 128, 255, 0.5)',
        borderColor: 'rgba(0, 128, 255, 1)',
        borderWidth: 1
      },
      {
        label: 'リンク',
        data: rinkCount,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1
      },
      {
        label: '拡大',
        data: pinchCount,
        backgroundColor: 'rgba(255, 210, 0, 0.5)',
        borderColor: 'rgba(255, 128, 0, 1)',
        borderWidth: 1
      },
      {
        label: 'ペン選択',
        data: penCount,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1
      }
      ]
    },
    options: {
      animation: false,
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

function drawChartTarget2(result, time, startnum, finishnum) {
  let indexCount = []; //目次を見た回数
  let cpCount = []; //ページ移動の回数
  let audioCount = []; //音声の回数
  let videoCount = []; //動画回数
  let penCount = []; //ペン選択回数

  let datanum = 0; //配列番号カウント用
  let ftime = 0; //first time
  let judge = 0; //初回かどうかを判断

  // 初期化
  for (let x = 0; x < time.length; x++) {
    indexCount[x] = 0;
    cpCount[x] = 0;
    audioCount[x] = 0;
    videoCount[x] = 0;
    penCount[x] = 0;
  }

  if (result.length > 0) {
    for (let x = startnum; x <= finishnum; ++x) {
      let logTime = result[x][0]; // date取得
      let logTarget = result[x][9]; // target取得

      //console.log(x + "  " + result[x][0]);
      //console.log(x + "  " + result[x][9]);

      // let date = new Date(logDate); //logDateをDate型に直す
      //console.log(date.toLocaleString());

      //始めだけfirst timeを設定
      if (judge == 0) {
        // ftime = new Date(logDate);
        ftime = logTime;
        datanum = 0;
        judge = 1;
      }
      else {
        // while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
        //   ftime.setMinutes(ftime.getMinutes() + 1);
        //   datanum++;
        // }
        while (logTime > ftime) { //1分経過したのかを判断
          // console.log("1分経過");
          let hour = parseInt(ftime.substring(0, 2));
          let minute = parseInt(ftime.substring(3, 5));

          minute = minute + 1;
          if (minute >= 60) { //60分より大きい場合の調整
            minute = 00;
            hour = hour + 1;
          }

          if (minute < 10 || hour < 10) {
            let minute2 = minute;
            let hour2 = hour;

            if (minute < 10) {
              minute2 = "0" + String(minute);
            }
            if (hour < 10) {
              hour2 = "0" + String(hour);
            }
            ftime = hour2 + ":" + minute2;
          }
          else {
            ftime = hour + ":" + minute;
          }
          // console.log(ftime);
          // ftime.setMinutes(ftime.getMinutes() + 1);

          datanum++;
        }
      }
      // console.log(datanum);


      if (logTarget.includes('index')) { // indexの文字を含んでいるのかどうか
        indexCount[datanum]++;
      }
      else if (logTarget.includes('cp')) {
        let last = logTarget.slice(-2, -1);
        if (last == "4") {
          cpCount[datanum]++;
        }
      }
      else if (logTarget.includes('pager') || logTarget.includes('open tenkey')) {
        cpCount[datanum]++;
      }
      else if (logTarget.includes('audio')) {
        if (logTarget.includes('audio volume') || logTarget.includes('audio button pitch') || logTarget.includes('audio button setting') || logTarget.includes('audio button mute') || logTarget.includes('audio button close')) {
        } else {
          audioCount[datanum]++;
        }
      }
      else if (logTarget.includes('video')) {
        if (logTarget.includes('video volume') || logTarget.includes('video button pitch') || logTarget.includes('video button fullscreen') || logTarget.includes('video button setting') || logTarget.includes('video button mute') || logTarget.includes('video button close')) {
        } else {
          videoCount[datanum]++;
        }
      }
      else if (logTarget.includes('simplePen black: true') || logTarget.includes('simplePen red: true') || logTarget.includes('penType')) {
        penCount[datanum]++;
      }
    }
  }


  let ctx = document.getElementById('targetChart').getContext('2d');
  window.targetChart = new Chart(ctx, {
    //線グラフ
    type: 'bar', //'line',
    //データ
    data: {
      labels: time,
      //データセット
      datasets: [{
        label: '目次閲覧',
        data: indexCount,
        backgroundColor: 'rgba(127, 0, 255, 0.5)',
        borderColor: 'rgba(127, 0, 255, 2)',
        borderWidth: 1
      },
      {
        label: 'ページ移動',
        data: cpCount,
        backgroundColor: 'rgba(0, 128, 255, 0.5)',
        borderColor: 'rgba(0, 128, 255, 1)',
        borderWidth: 1
      },
      {
        label: '音声',
        data: audioCount,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1
      },
      {
        label: '動画',
        data: videoCount,
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        borderColor: 'rgba(255, 128, 0, 1)',
        borderWidth: 1
      },
      {
        label: 'ペン選択',
        data: penCount,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1
      }
      ]
    },
    options: {
      animation: false,
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
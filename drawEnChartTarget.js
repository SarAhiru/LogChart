//学習者用デジタル教科書　英語　ログ　グラフ生成　[機能ごと]

function drawChartTarget(result, dataLength) {

    //console.log(result);
    //console.log(dataLength);

    let lavel = []; //グラフ横軸ラベル
    let indexCount = []; //目次を見た回数
    let cpCount = []; //ページ移動の回数
    let audioCount = []; //オーディオの回数
    let penColorCount = []; //ペン色変更回数
    let penCount = []; //ペン選択回数


    let datanum = 0; //配列番号カウント用
    let ftime = 0; //first time
    let judge = 0; //初回かどうかを判断
 
    let fsecond = 0; //グラフの軸ラベル用
    let fminute = 0;
    let fhour = 0;

    if(dataLength > 0){
        for(let x = 1; x < dataLength ; ++x){
            let logDate = result[x][0]; // date取得
            let logTarget = result[x][9]; // target取得

            //console.log(x + "  " + result[x][0]);
            //console.log(x + "  " + result[x][9]);

            let date = new Date(logDate); //logDateをDate型に直す
            //console.log(date.toLocaleString());

            //操作のカウントをしたい
            //console.log(logTarget);
            //console.log('index_page');
            //console.log(typeof(logTarget));
            //console.log(typeof('index_page'));

            //console.log(logTarget == 'index_page');
            


            //10秒の始めだけfirst timeを設定
            if(judge == 0){
              ftime = new Date(logDate);
              let time = Math.floor(date.getSeconds() / 10) * 10 ;
              ftime.setSeconds(time);
              //console.log(ftime.toLocaleString());

              //グラフの軸ラベル設定(最初)
              fsecond = logDate.substr( 17 );
              fminute = logDate.slice( 14, 16 );
              fhour = logDate.slice( 11, 13 );
              
              fsecond = Math.floor(fsecond / 10) *10;
              
              //文字を数字に直す変換が必要！！！！！
              fminute = parseInt(fminute);
              fhour = parseInt(fhour);

              if(fsecond == 0 || fminute < 10 || fhour < 10){
                let second2 = fsecond;
                let minute2 = fminute;
                let hour2 = fhour;
                if(fsecond == 0){
                  second2 = "00";
                }
                if(fminute < 10){
                  minute2 = "0" + String(fminute);
                }
                if(fhour < 10){
                  hour2 = "0" + String(fhour);
                }
                lavel[0] = hour2 + ":" + minute2 + ":" + second2 ;
              }
              else{
                lavel[0] = fhour + ":" + fminute + ":" + fsecond ;
              }
              //console.log(lavel);
            }
            judge = 1;
            
            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
            while(date.getTime() > ftime.getTime()){ //10秒経過したのかを判断
                ftime.setSeconds(ftime.getSeconds() + 10);
                //console.log(ftime.toLocaleString());
                
                //グラフの軸ラベル設定
                fsecond = fsecond + 10;
                if(fsecond >= 60){
                  fsecond = 00;
                  fminute = fminute + 1;
                  
                  if(fminute >= 60){
                    fminute = 00;
                    fhour = fhour + 1;
                  }
                }

                if(fsecond == 0 || fminute < 10 || fhour < 10){
                  let second2 = fsecond;
                  let minute2 = fminute;
                  let hour2 = fhour;
                  if(fsecond == 0){
                    second2 = "00";
                  }
                  if(fminute < 10){
                    minute2 = "0" + String(fminute);
                  }
                  if(fhour < 10){
                    hour2 = "0" + String(fhour);
                  }
                  lavel[datanum + 1] = hour2 + ":" + minute2 + ":" + second2 ;
                }
                else{
                  lavel[datanum + 1] = fhour + ":" + fminute + ":" + fsecond ;
                }
                //console.log(lavel);

                datanum ++;
                //console.log("**");
                
                //nullのときにはデータを0に設定
                if(indexCount[datanum-1] == null){
                  indexCount[datanum-1] =0;
                }
                if(cpCount[datanum-1] == null){
                  cpCount[datanum-1] =0;
                }
                if(audioCount[datanum-1] == null){
                  audioCount[datanum-1] =0;
                }
                if(penColorCount[datanum-1] == null){
                  penColorCount[datanum-1] =0;
                }
                if(penCount[datanum-1] == null){
                  penCount[datanum-1] =0;
                }
            }
            //indexCount[datanum-1] ++;
            //indexCount[datanum] =0;

            console.log(logTarget);
            if(logTarget.includes('index')){ // indexの文字を含んでいるのかどうか
              //console.log(logTarget);
              indexCount[datanum-1] ++;
            }
            else if(logTarget.includes('cp')){
              //console.log(logTarget);
              cpCount[datanum-1] ++;
            }
            else if(logTarget.includes('audio')){
              //console.log(logTarget);
              audioCount[datanum-1] ++;
            }
            else if(logTarget.includes('color')){
              //console.log(logTarget);
              penColorCount[datanum-1] ++;
            }
            else if(logTarget.includes('true') || logTarget.includes('penType')){
              //console.log(logTarget);
              penCount[datanum-1] ++;
            }

            //console.log("***");
            //console.log(logTarget.includes('cp'));

            indexCount[datanum] =0;
            cpCount[datanum] =0;
            audioCount[datanum] =0;
            penColorCount[datanum] =0;
            penCount[datanum] =0;

            //console.log(penCount);
        }
    }
    

    let ctx = document.getElementById('myChart1').getContext('2d');
    window.myChart1 = new Chart(ctx, {
    　//線グラフ
      type: 'line',
      //データ
      data: {
        labels: lavel,
        //labels: ['14:09:10~', '14:09:20~', '14:09:30~', '14:09:40~', '14:09:50~', '14:10:00~', '14:10:10', '14:10:20'],
        //データセット
        datasets: [{
          label: '目次閲覧',
          data: indexCount,
          backgroundColor: 'rgba(127, 0, 255, 0.2)',
          borderColor:'rgba(127, 0, 255, 2)',
          borderWidth: 1
        },
        {
          label: 'ページ移動',
          data: cpCount,
          backgroundColor: 'rgba(0, 128, 255, 0.2)',
          borderColor:'rgba(0, 128, 255, 1)',
          borderWidth: 1
        },
        {
          label: 'オーディオ',
          data: audioCount,
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor:'rgba(0, 255, 0, 1)',
          borderWidth: 1
        },
        {
          label: 'ペン色変更',
          data: penColorCount,
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor:'rgba(255, 128, 0, 1)',
          borderWidth: 1
        },
        {
          label: 'ペン選択',
          data: penCount,
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor:'rgba(255, 0, 0, 1)',
          borderWidth: 1
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}
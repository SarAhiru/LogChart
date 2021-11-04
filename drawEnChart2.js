//学習者用デジタル教科書　英語　ログ　人数合計グラフ生成　[全体]

function drawChart2(result, dataLength) {

    //console.log(result);
    //console.log(dataLength);

    let lavel = []; //グラフ横軸ラベル
    let num = []; // グラフ縦軸
    let actor = []; //操作者管理用
    let actorJudge = 0; //操作者　重複回避用

    let datanum = 0; //配列番号カウント用

    let ftime = 0; //first time
    let fjudge = 0; //初回かどうかを判断

    let fsecond = 0;  //グラフの軸ラベル用
    let fminute = 0;
    let fhour = 0;

    if(dataLength > 0){
        for(let x = 1 ; x < dataLength ; ++x){
            let logDate = result[x][0]; // date取得
            let logActor = result[x][2]; // actor取得

            //console.log(x + "  " + result[x][0]);
            //console.log(x + "  " + result[x][2]);

            let date = new Date(logDate); //時刻型のデータに変換
            
            //はじめだけfirst timeを設定
            if(fjudge == 0){
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
              datanum ++;
              //console.log(lavel);
              if(num[datanum-1] == null){
                num[datanum-1] =0;
              }
            }
            fjudge = 1;
            
            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
            while(date.getTime() > ftime.getTime()){ //10秒経過したのかを判断
                ftime.setSeconds(ftime.getSeconds() + 10);
                //console.log(ftime.toLocaleString());
                //actor= [];
                //console.log(actor);

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

                //lavel(横軸) の設定
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
                  lavel[datanum] = hour2 + ":" + minute2 + ":" + second2 ;
                  //console.log("datanum"+datanum);
                  //num[datanum-2] = actor.length;
                  //console.log(num);
                  actor= [];
                  actorJudge = 0;
                }
                else{
                  lavel[datanum] = fhour + ":" + fminute + ":" + fsecond ;
                  //console.log("datanum"+datanum);
                  //num[datanum-2] = actor.length;
                  //console.log(num);
                  actor= [];
                  actorJudge = 0;
                }
                //console.log(lavel);

                datanum ++;

                if(num[datanum-2] == null){
                  num[datanum-2] =0;
                }
                
               
            }

            
            //actorを最後までたどって一致するものがあるのか判断させたい
            for(let i = 0 ; i <= actor.length ; i++){
              if(actor[i] == logActor){
                actorJudge = 1;
                //console.log("break");
                break;
              }
            }
            if(actorJudge == 0){
              actor.push(logActor);
              //console.log(datanum);
              num[datanum-1] ++;
              //console.log(num);
            }
            
            if(num[datanum-1] == null){
              num[datanum-1] =0;
            }
            //console.log(actor);

            //num[datanum-1] ++;
            //num[datanum] =0;
            num[datanum-2] = actor.length;
            //console.log(num);

            //console.log(num);
        }
        //console.log(num);
    }
    

    let ctx = document.getElementById('myChart2').getContext('2d');
    window.myChart2 = new Chart(ctx, {
    　//線グラフ
      type: 'bar',
      //データ
      data: {
        labels: lavel,
        //labels: ['14:09:10~', '14:09:20~', '14:09:30~', '14:09:40~', '14:09:50~', '14:10:00~', '14:10:10', '14:10:20'],
        //データセット
        datasets: [{
          label: '操作回数',
          data: num,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor:'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
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
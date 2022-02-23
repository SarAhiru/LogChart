//学習者用デジタル教科書　英語　ログ　人数合計グラフ生成　[全体]

function drawChart2(result, dataLength, member, time) {

    let num = []; // グラフ縦軸
    let actor = []; //操作者　重複回避用
    let actorJudge = 0; //操作者　重複回避用

    let datanum = 0; //配列番号カウント用

    let ftime = 0; //first time
    let judge = 0; //初回かどうかを判断

    let fminute = 0; //グラフの軸ラベル用
    let fhour = 0;

    // 初期化
    for(let x = 0; x < time.length ; x++){
      num[x] = 0;
    }
    for(let x = 0; x < member.length ; x++){
      actor[x] = 0;
    }

    if(dataLength > 0){
        for(let x = 1 ; x < dataLength ; ++x){
            let logDate = result[x][0]; // date取得
            let logActor = result[x][2]; // actor取得

            //console.log(x + "  " + result[x][0]);
            //console.log(x + "  " + result[x][2]);

            let date = new Date(logDate); //時刻型のデータに変換
            
            //始めだけfirst timeを設定
            if(judge == 0){
              ftime = new Date(logDate);
              let time =date.getMinutes(); //分

              //時間・分をそれぞれ「文字として」切り取り
              fminute = logDate.slice( 13, 16 );
              fhour = logDate.slice( 10, 12 );
              
              //文字を数字に直す変換
              fminute = parseInt(fminute);
              fhour = parseInt(fhour);
              datanum = 1;
            }
            judge = 1;
            
            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
            while(date.getTime() >= ftime.getTime()){ //1分経過したのかを判断
              ftime.setMinutes(ftime.getMinutes() + 1);
              fminute = fminute + 1;
              if(fminute >= 60){
                fminute = 00;
                fhour = fhour + 1;
              }
              for(let x = 0; x < member.length ; x++){
                actor[x] = 0;
              }
              datanum ++;
              
            }             
            
            // console.log(datanum);
            //actorを最後までたどって一致するものがあるのか判断させたい
            for(let i = 0 ; i <= member.length ; i++){
              if(member[i] == logActor){
                actor[i] ++;
                if(actor[i] == 1){
                  num[datanum-1] ++;
                  //console.log(time[datanum-1]);
                  //console.log(member[i]);
                }
                break;
              }
            }
        }
    }
    console.log(time);
    console.log(num);

    let ctx = document.getElementById('myChart2').getContext('2d');
    window.myChart2 = new Chart(ctx, {
    　//線グラフ
      type: 'bar',
      //データ
      data: {
        labels: time,
        //labels: ['14:09:10~', '14:09:20~', '14:09:30~', '14:09:40~', '14:09:50~', '14:10:00~', '14:10:10', '14:10:20'],
        //データセット
        datasets: [{
          label: '操作人数',
          data: num,
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor:'rgba(255, 0, 0, 1)',
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
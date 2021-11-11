//学習者用デジタル教科書　英語　ログ　グラフ生成　[全体合計]

function drawCharttt(result, dataLength) {

    console.log(result);
    console.log(dataLength);

    let lavel = []; //グラフ横軸ラベル
    let totalnum = [];
    let num = []; // 操作回数
    let num2 = []; // 操作回数

    let datanum = 0; //配列番号カウント用
    let ftime = 0; //first time
    let judge = 0; //初回かどうかを判断

    let fsecond = 0;  //グラフの軸ラベル用
    let fminute = 0;
    let fhour = 0;

    if(dataLength > 0){
        for(let x = 1; x < dataLength ; x++){
            let logDate = result[x][0]; // date取得
            let logActor = result[x][2]; // actor取得
            //let logTarget = result[x][9]; // target取得

            //console.log(x + "  " + result[x][0]);
            console.log(x + "  " + result[x][2]);

            let date = new Date(logDate);
            //console.log(date.toLocaleString());
            
            //10秒の始めだけfirst timeを設定
            if(judge == 0){
              ftime = new Date(logDate);
              let time = Math.floor(date.getSeconds() / 10) * 10 ; //秒の一桁を0にする
              ftime.setSeconds(time);
              console.log(ftime.toLocaleString());

              //////////////////ここら辺変更したよ
              fsecond = logDate.substr( 17 );
              fminute = logDate.slice( 14, 16 );
              fhour = logDate.slice( 11, 13 );
              //console.log(fsecond);
              //console.log(fminute);
              //console.log(fhour);
              
              
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





              console.log(lavel);
            }
            judge = 1;
            
            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
            while(date.getTime() >= ftime.getTime()){ //10秒経過したのかを判断
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
                //console.log("**");
                
                if(totalnum[datanum] == null){
                  totalnum[datanum] =0;
                }
                if(num[datanum] == null){
                  num[datanum] =0;
                }
                if(num2[datanum] == null){
                  num2[datanum] =0;
                }

                datanum ++;
                
            }
            
            if(totalnum[datanum] == null){
              totalnum[datanum] =0;
            }
            if(num[datanum] == null){
              num[datanum] =0;
            }
            if(num2[datanum] == null){
              num2[datanum] =0;
            }

            totalnum[datanum-1] ++;
            if(logActor == '12748_imlstudent'){
              num[datanum-1] ++;
            }
            if(logActor == '12748_naokikato'){
              num2[datanum-1] ++;
            }
            console.log(datanum);

            console.log(num);
        }
    }
    

    let ctx = document.getElementById('myCharttt').getContext('2d');
    window.myCharttt = new Chart(ctx, {
    　//線グラフ
      type: 'bar',
      //データ
      data: {
        labels: lavel,
        //データセット
        
        datasets: [{
          label: '全体',
          data: totalnum,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor:'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: '12748_imlstudent',
          data: num,
          backgroundColor: 'rgba(0, 255, 0, 1)',
          borderColor:'rgba(0, 255, 0, 1)',
          borderWidth: 1
        },
        {
          label: '12748_naokikato',
          data: num2,
          backgroundColor: 'rgba(0, 128, 255, 1)',
          borderColor:'rgba(0, 128, 255, 1)',
          borderWidth: 1,
          lavel: true,
          hidden: false,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            categoryPercentage: 1.1,
            barPercentage: 1,
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}
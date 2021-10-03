//学習者用デジタル教科書　英語　ログ　グラフ生成　[全体合計]

function drawChart(result, dataLength) {

    console.log(result);
    console.log(dataLength);

    var lavel = [];
    var num = [0,0,0,0,0,0,0,0]; // 回数

    var datanum = 0; //配列番号カウント用
    var ftime = 0; //first time
    var judge = 0; //初回かどうかを判断

    var flavel = 0; //グラフの軸ラベル用
    var fsecond = 0;
    var fminute = 0;
    var fhour = 0;

    if(dataLength > 0){
        for(var x = 1; x < dataLength-1 ; ++x){
            var logDate = result[x][0]; // date取得
            var logTarget = result[x][9]; // target取得

            //console.log(x + "  " + result[x][0]);
            //console.log(x + "  " + result[x][9]);

            let date = new Date(logDate); //letとvarの違い何？？？
            console.log(date.toLocaleString());
            
            //10秒の始めだけfirst timeを設定
            if(judge == 0){
              ftime = new Date(logDate);
              var time = Math.floor(date.getSeconds() / 10) * 10 ;
              ftime.setSeconds(time);
              console.log(ftime.toLocaleString());

              //グラフの軸ラベル設定(最初)
              fsecond = logDate.substr( 18 );
              fminute = logDate.slice( 15, 17 );
              fhour = logDate.slice( 12, 14 );
              
              fsecond = Math.floor(fsecond / 10) *10;
              
              console.log(fsecond);
              console.log(fminute);
              console.log(fhour);
              //文字を数字に直す変換が必要！！！！！
              fminute = parseInt(fminute);
              fhour = parseInt(fhour);
              console.log(fminute);
              console.log(fhour);


              if(fsecond == 0 || fminute < 10 || fhour < 10){
                var second2 = fsecond;
                var minute2 = fminute;
                var hour2 = fhour;
                if(fsecond == 0){
                  second2 = "00";
                }
                if(fminute < 10){
                  minute2 = "0" + String(fminute);
                }
                if(fhour < 10){
                  var minute2 = "0" + String(fminute);
                }
                lavel[0] = hour2 + ":" + minute2 + ":" + second2 ;
              }
              else{
                lavel[0] = fhour + ":" + fminute + ":" + fsecond ;
              }
              console.log(lavel);
            }
            judge = 1;
            
            //console.log("date " + date.getTime());
            //console.log("ftime" + ftime.getTime());
            //console.log(date.getTime() > ftime.getTime());
            
            
            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
            while(date.getTime() > ftime.getTime()){ //10秒経過したのかを判断
                ftime.setSeconds(ftime.getSeconds() + 10);
                console.log(ftime.toLocaleString());
                
                //グラフの軸ラベル設定
                console.log(datanum);
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
                  var second2 = fsecond;
                  var minute2 = fminute;
                  var hour2 = fhour;
                  if(fsecond == 0){
                    second2 = "00";
                  }
                  if(fminute < 10){
                    minute2 = "0" + String(fminute);
                  }
                  if(fhour < 10){
                    var minute2 = "0" + String(fminute);
                  }
                  lavel[datanum + 1] = hour2 + ":" + minute2 + ":" + second2 ;
                }
                else{
                  lavel[datanum + 1] = fhour + ":" + fminute + ":" + fsecond ;
                }

                console.log(fsecond);
                console.log(fminute);
                console.log(fhour);
                //lavel[datanum+1] = flavel + fsecond;
                
                console.log(lavel);
                //lavel[datanum+1] = logDate.substr( 12 );
                //console.log(lavel);

                datanum ++;
                console.log(datanum);
                console.log("**");
                
            }
            num[datanum-1] ++;

            console.log(num);

            
        }
    }
    //console.log(num);
    

    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
    　//線グラフ
      type: 'line',
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
    console.log(num);
}
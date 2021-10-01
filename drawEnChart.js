//学習者用デジタル教科書　英語　ログ　グラフ生成用

function drawChart(result, dataLength) {

    console.log(result);
    console.log(dataLength);

    var num = [0,0,0,0,0,0,0,0]; // 回数
    var datanum = 0; //配列番号カウント用
    var ftime = 0; //first time
    var judge = 0; //初回かどうかを判断

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
            }
            judge = 1;
            
            console.log("date " + date.getTime());
            console.log("ftime" + ftime.getTime());
            console.log(date.getTime() > ftime.getTime());
            
            
            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
            while(date.getTime() > ftime.getTime()){ //10秒経過したのかを判断
                ftime.setSeconds(ftime.getSeconds() + 10);
                console.log(ftime.toLocaleString());
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
        labels: ['14:09:10~', '14:09:20~', '14:09:30~', '14:09:40~', '14:09:50~', '14:10:00~', '14:10:10', '14:10:20'],
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
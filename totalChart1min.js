//学習者用デジタル教科書　英語　ログ　グラフ生成　[全体合計]

function drawCharttt(result, dataLength) {

    //console.log(result);
    //console.log(dataLength);

    let lavel = []; //グラフ横軸ラベル
    let totalnum = []; //全体平均用
    let num = []; // 操作回数
    let num2 = []; // 操作回数

    let datanum = 0; //配列番号カウント用
    let ftime = 0; //first time
    let judge = 0; //初回かどうかを判断

    let fminute = 0; //グラフの軸ラベル用
    let fhour = 0;

    if(dataLength > 0){
        for(let x = 1; x < dataLength ; x++){
            let logDate = result[x][0]; // date取得
            let logActor = result[x][2]; // actor取得
            //let logTarget = result[x][9]; // target取得

            //console.log(x + "  " + result[x][0]);
            console.log(x + "  " + result[x][2]);// actor表示

            let date = new Date(logDate);
            console.log(date.toLocaleString());
            
            //始めだけfirst timeを設定
            if(judge == 0){
              ftime = new Date(logDate);
              let time =date.getMinutes(); //分
              // let time = Math.floor(date.getMinutes() / 10) * 10 ; //分
              //ftime.setSeconds(time);
              console.log(ftime.toLocaleString());

              //時間・分をそれぞれ「文字として」切り取り
              fminute = logDate.slice( 13, 16 );
              fhour = logDate.slice( 10, 12 );
              console.log(fminute);
              console.log(fhour);
              
              //文字を数字に直す変換
              fminute = parseInt(fminute);
              fhour = parseInt(fhour);

              //10より小さい場合には最初に0を付ける
              if(fminute < 10 || fhour < 10){
                let minute2 = fminute;
                let hour2 = fhour;

                if(fminute < 10){
                  minute2 = "0" + String(fminute);
                }
                if(fhour < 10){
                  hour2 = "0" + String(fhour);
                }
                lavel[0] = hour2 + ":" + minute2;
              }
              else{
                lavel[0] = fhour + ":" + fminute;
              }

              console.log(lavel);
            }
            judge = 1;
            
            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録させたい
            while(date.getTime() >= ftime.getTime()){ //1分経過したのかを判断
                ftime.setMinutes(ftime.getMinutes() + 1);
                //console.log(ftime.toLocaleString());
                
                //グラフの軸ラベル設定
                fminute = fminute + 1;    
                if(fminute >= 60){
                  fminute = 00;
                  fhour = fhour + 1;
                }

                //10より小さい場合には最初に0を付ける
                if(fminute < 10 || fhour < 10){
                  let minute2 = fminute;
                  let hour2 = fhour;
                  if(fminute < 10){
                    minute2 = "0" + String(fminute);
                  }
                  if(fhour < 10){
                    hour2 = "0" + String(fhour);
                  }
                  lavel[datanum + 1] = hour2 + ":" + minute2;
                }
                else{
                  lavel[datanum + 1] = fhour + ":" + fminute;
                }
                console.log(lavel);
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
    for(let x = 1; x < dataLength ; x++){
      totalnum[x] = totalnum[x]/2  //人数で割って平均を出したい
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
          label: '全体平均',
          data: totalnum,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor:'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: '1_生徒1',//12748_imlstudent
          data: num,
          backgroundColor: 'rgba(0, 255, 0, 1)',
          borderColor:'rgba(0, 255, 0, 1)',
          borderWidth: 1
        },
        {
          label: '2_生徒2',//12748_naokikato
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
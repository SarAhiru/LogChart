//学習者用デジタル教科書　英語　ログ　グラフ生成　[全体合計]

function lavel(result, dataLength) {

    //console.log(result);
    //console.log(member);

    let lavel = []; //グラフ横軸ラベル

    let datanum = 1; //配列番号カウント用
    let ftime = 0; //first time
    let judge = 0; //初回かどうかを判断

    let fminute = 0; //グラフの軸ラベル用
    let fhour = 0;

    if(dataLength > 0){
        for(let x = 1; x < dataLength ; x++){
            let logDate = result[x][0]; // date取得

            //横軸時間管理
            let date = new Date(logDate);
            //console.log(date.toLocaleString());
            
            //始めだけfirst timeを設定
            if(judge == 0){
              ftime = new Date(logDate);
              let time =date.getMinutes(); //分
              // let time = Math.floor(date.getMinutes() / 10) * 10 ; //分
              //ftime.setSeconds(time);
              //console.log(ftime.toLocaleString());

              //時間・分をそれぞれ「文字として」切り取り
              fminute = logDate.slice( 13, 16 );
              fhour = logDate.slice( 10, 12 );
              //console.log(fminute);
              //console.log(fhour);
              
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

              //console.log(lavel);
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
                datanum ++;               
            }

        }
    }
    //console.log(lavel);
    return lavel;
}
//学習者用デジタル教科書　英語　ログ　横軸ラベル作成

function lavel(result, dataLength) {

  // //選択した日付を返す
  // let choicedate = document.querySelector(`input[type='date'][name='date']`);
  // choicedate.addEventListener(`change`, function () {
  //   document.querySelector(`#output`).innerHTML = choicedate.value;
  // });

  //横軸ラベル作成
  let lavel = []; //グラフ横軸ラベル　配列

  let datanum = 0; //配列番号カウント用
  let ftime = 0; //first time
  let judge = 0; //初回かどうかを判断

  let fminute = 0; //グラフの軸ラベル用
  let fhour = 0;

  if (dataLength > 0) {
    for (let x = 1; x < dataLength; x++) {
      let logDate = result[x][0]; // ログからdate取得

      //横軸時間管理
      let date = new Date(logDate);
      console.log(date);
      console.log(date.toLocaleString());

      console.log(choicedate.value < date);
      if(choicedate < date){

      }


      //始めだけfirst time(ftime)を設定
      if (judge == 0) {
        ftime = new Date(logDate);
        // let time =date.getMinutes();

        //時間・分をそれぞれ「文字として」切り取り
        fminute = ftime.getMinutes();
        fhour = ftime.getHours();
        // console.log(fminute);
        // console.log(fhour);

        //文字を数字に直す変換
        fminute = parseInt(fminute);
        fhour = parseInt(fhour);

        //10より小さい場合には最初に0を付ける
        if (fminute < 10 || fhour < 10) {
          let minute2 = fminute;
          let hour2 = fhour;

          if (fminute < 10) {
            minute2 = "0" + String(fminute);
          }
          if (fhour < 10) {
            hour2 = "0" + String(fhour);
          }
          lavel[0] = hour2 + ":" + minute2;
        }
        else {
          lavel[0] = fhour + ":" + fminute;
        }
        datanum = 1;
      }
      judge = 1;

      //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録
      while (date.getTime() >= ftime.getTime()) { //取得した時間がftimeと同じ時間になるまで1分ずつ足し続ける
        ftime.setMinutes(ftime.getMinutes() + 1);

        //分と時間の変更
        fminute = fminute + 1;
        if (fminute >= 60) { //60分より大きい場合の調整
          fminute = 00;
          fhour = fhour + 1;
        }

        //10より小さい場合には最初に0を付ける（数値→文字の変更）
        if (fminute < 10 || fhour < 10) {
          let minute2 = fminute;
          let hour2 = fhour;
          if (fminute < 10) {
            minute2 = "0" + String(fminute);
          }
          if (fhour < 10) {
            hour2 = "0" + String(fhour);
          }
          lavel[datanum] = hour2 + ":" + minute2;
        }
        else {
          lavel[datanum] = fhour + ":" + fminute;
        }
        datanum++;
      }

    }
  }
  //console.log(lavel);
  return lavel;
}
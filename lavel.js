//学習者用デジタル教科書　英語　ログ　横軸ラベル作成
//自分で読み取りVer
function lavel(result, choicedate) {

  //横軸ラベル作成
  let label = []; // グラフ横軸　配列
  let lognum = 0; //配列番号カウント用

  let ftime = 0; //first time
  let judge = 0; //初回かどうかを判断

  let fminute = 0; //グラフの軸ラベル用
  let fhour = 0;

  let startnum = 0;
  let finishnum = 0;


  if (result.length > 0) {
    for (let x = 1; x < result.length - 1; x++) {
      let logDate = result[x][0]; // ログからdate取得

      //横軸時間管理
      let date = new Date(logDate);
      // console.log(date);
      // console.log(date.toLocaleString());
      let judgeYear = date.getFullYear();
      let judgeMonth = date.getMonth() + 1;
      let judgeDay = date.getDate();

      let choiceYear = choicedate.value.substr(0, 4);
      let choiceMonth = choicedate.value.substr(5, 2);
      choiceMonth = parseInt(choiceMonth); //数字に変更
      let choiceDay = choicedate.value.substr(8, 2);
      choiceDay = parseInt(choiceDay); // 数字に変更

      if (choiceYear == judgeYear) {
        if (choiceMonth == judgeMonth) {
          if (choiceDay == judgeDay) {
            finishnum = x;
            //始めだけfirst time(ftime)を設定
            if (judge == 0) {
              startnum = x;

              ftime = new Date(logDate);

              //時間・分をそれぞれ「文字として」切り取り
              fminute = ftime.getMinutes();
              fhour = ftime.getHours();

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
                label[0] = hour2 + ":" + minute2;
              }
              else {
                label[0] = fhour + ":" + fminute;
              }
            }
            judge = 1;

            //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録
            //！！本当は進んだ分数を引き算で求めて、重複させるだけでいいのかも
            while (date.getTime() >= ftime.getTime()) { //取得した時間がftimeと同じ時間になるまで1分ずつ足し続ける
              ftime.setMinutes(ftime.getMinutes() + 1);
              lognum++;

              //初期化
              // num.push(Array(member.length));
              // for(let x = 0; x < member.length ; x++){
              //   num[x][lognum] = 0; //[人数][時間]
              // }
              // // log[lognum] = new Array(member.length + 4 + 1); //時間 + 人ごとの操作 + 機能 + 人数
              // console.log(num);

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
                label[lognum] = hour2 + ":" + minute2;
              }
              else {
                label[lognum] = fhour + ":" + fminute;
              }
            }

            // //ここから分析する
            // let logActor = result[x][2]; // actor取得

            // //操作回数
            // membernum = member.indexOf(logActor);
            // num[0][lognum] ++; // num[0]は全体合計
            // num[membernum][lognum] ++;

          }
        }
      }
    }
  }
  console.log(label);
  return [label, startnum, finishnum];
  // return label;
}

function lavelChenge(result, choicedate, startTime, finishTime) {
  //finishの時間が＋１分になっているけどとりあえず放置
  //横軸ラベル作成
  let label = []; // グラフ横軸　配列
  let lognum = 0; //配列番号カウント用

  let ftime = 0; //first time
  let judge = 0; //初回かどうかを判断

  let fminute = 0; //グラフの軸ラベル用
  let fhour = 0;

  let startnum = 0;
  let finishnum = 0;


  if (result.length > 0) {
    for (let x = 1; x < result.length - 1; x++) {
      let logDate = result[x][0]; // ログからdate取得

      //横軸時間管理
      let date = new Date(logDate);
      let judgeYear = date.getFullYear();
      let judgeMonth = date.getMonth() + 1;
      let judgeDay = date.getDate();

      let choiceYear = choicedate.value.substr(0, 4);
      let choiceMonth = choicedate.value.substr(5, 2);
      choiceMonth = parseInt(choiceMonth); //数字に変更
      let choiceDay = choicedate.value.substr(8, 2);
      choiceDay = parseInt(choiceDay); // 数字に変更

      let judgeTime = logDate.substring(9, 14);
      // console.log(judgeTime);

      if (choiceYear == judgeYear) {
        if (choiceMonth == judgeMonth) {
          if (choiceDay == judgeDay) {
            // finishnum = x;
            //始めだけfirst time(ftime)を設定
            if (judge == 0) {
              startnum = x;

              ftime = new Date(logDate);

              //時間・分をそれぞれ「文字として」切り取り
              fminute = ftime.getMinutes();
              fhour = ftime.getHours();

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
                label[0] = hour2 + ":" + minute2;
              }
              else {
                label[0] = fhour + ":" + fminute;
              }
              if (startTime == judgeTime) {
                // console.log("aaaaa");
                // console.log(label);
                judge = 1;
              }
            } else {
              if (finishTime >= judgeTime) {

                //ここで条件分岐して、一定時間にどのくらい機能を使用したのかを記録
                //！！本当は進んだ分数を引き算で求めて、重複させるだけでいいのかも
                while (date.getTime() >= ftime.getTime()) { //取得した時間がftimeと同じ時間になるまで1分ずつ足し続ける
                  ftime.setMinutes(ftime.getMinutes() + 1);
                  lognum++;

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
                    label[lognum] = hour2 + ":" + minute2;
                  }
                  else {
                    label[lognum] = fhour + ":" + fminute;
                  }

                  finishnum = x;
                  break;
                }
              }

              // //ここから分析する
              // let logActor = result[x][2]; // actor取得

              // //操作回数
              // membernum = member.indexOf(logActor);
              // num[0][lognum] ++; // num[0]は全体合計
              // num[membernum][lognum] ++;
            }
          }
        }
      }
    }
  }
  console.log(label);
  return [label, startnum, finishnum];
  // return label;
}


//cloud firestore　Ver
function choiceDay(choicedate) {

  let choiceYear = choicedate.value.substring(0, 4);
  let choiceMonth = choicedate.value.substring(5, 7);
  let choiceDay = choicedate.value.substring(8, 10);

  let choice;
  choice = choiceYear + "/" + choiceMonth + "/" + choiceDay;

  return choice;
}

function lavel2(result) {

  //横軸ラベル作成
  let label = []; // グラフ横軸　配列
  let num = 0; //配列番号カウント用
  let startTime;
  let finishTime;

  if (result.length > 0) {
    let startT = result[0][0]; // 最初の時間を取得
    let finishT = result[result.length - 1][0]; // 最後の時間を取得

    startTime = startT.substring(0, 5);
    let hour = parseInt(startT.substring(0, 2));
    let minute = parseInt(startT.substring(3, 5));
    label[num] = startTime;
    num = num + 1;

    finishTime = finishT.substring(0, 5);
    // console.log(hour);
    // console.log(minute);

    let time = startTime;

    while (time != finishTime) {
      minute = minute + 1;
      if (minute >= 60) { //60分より大きい場合の調整
        minute = 00;
        hour = hour + 1;
      }

      //10より小さい場合には最初に0を付ける
      if (minute < 10 || hour < 10) {
        let minute2 = minute;
        let hour2 = hour;

        if (minute < 10) {
          minute2 = "0" + String(minute);
        }
        if (hour < 10) {
          hour2 = "0" + String(hour);
        }
        time = hour2 + ":" + minute2;
        label[num] = time;
      }
      else {
        time = hour + ":" + minute;
        label[num] = time;
      }
      num = num + 1;
    }
    console.log(label);
  }
  return [label, startTime, finishTime];
  // return label;
}
//学習者用デジタル教科書　英語　ログ　生徒管理用

function actor(result) {
  let actc = [];
  let actor = []; //操作者管理用　配列
  let actornum = 0; //配列番号カウント用 // ここに生徒人数を入れる！！
  let actorJudge = 0; //操作者　重複回避用


  if (result.length > 0) {
    for (let x = 1; x < result.length; x++) { //逆順の時にはresult.length-1
      // console.log(result[x][2]);
      let logActor = result[x][2]; // ログからactor取得

      //操作者管理
      if (actc.length != 0) {
        for (let i = 0; i <= actc.length; i++) {
          if (actc[i] == logActor) { //一致していたら抜ける
            actorJudge = 1;
            // actornum = i;
            break;
          }
        }
      }
      if (actorJudge == 0) {
        actc.push(logActor);
        actornum = actc.length;
      }
      actorJudge = 0;
    }
  }
  actornum = actc.length;
  console.log(actornum);

  for (let x = 1; x < actornum; x++) {
    let stuID;
    if (x < 10) {
      stuID = "12741_05020" + x;
    } else {
      stuID = "12741_0502" + x;
    }
    actor.push(stuID);
  }

  console.log(actor);
  return actor;
}
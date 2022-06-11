//学習者用デジタル教科書　英語　ログ　生徒管理用

function actor(result) {

    let actor = []; //操作者管理用　配列
    let actornum = 39; //配列番号カウント用 // ここに生徒人数を入れる！！
    let actorJudge = 0; //操作者　重複回避用


    // if(result.length > 0){
    //     for(let x = 1; x < result.length; x++){ //逆順の時にはresult.length-1
    //       // console.log(result[x][2]);
    //       let logActor = result[x][2]; // ログからactor取得

    //         //操作者管理
    //         if(actor.length != 0){
    //           for(let i = 0 ; i <= actor.length ; i++){
    //             if(actor[i] == logActor){ //一致していたら抜ける
    //               actorJudge = 1;
    //               actornum = i;
    //               break;
    //             }
    //           }
    //         }
    //         if(actorJudge == 0){
    //           actor.push(logActor);
    //           actornum = actor.length;
    //         }
    //         actorJudge = 0;          
    //     }
    // }
    // console.log(actor);

    for(let x = 1; x < actornum +1; x++){
      let stuID;
      if(x<10){
        stuID = "12741_05020" + x;
      }else{
        stuID = "12741_0502" + x;
      }
      actor.push(stuID);
    }

    console.log(actor);
    return actor;
}
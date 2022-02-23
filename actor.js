//学習者用デジタル教科書　英語　ログ　グラフ生成　[全体合計]

function actor(result, dataLength) {

    //console.log(result);
    //console.log(dataLength);

    let actor = []; //操作者管理用
    let actorJudge = 0; //操作者　重複回避用
    let actornum = 0; //何番目の人なのか


    if(dataLength > 0){
        for(let x = 1; x < dataLength ; x++){
            let logActor = result[x][2]; // actor取得

            //console.log(x + "  " + result[x][0]);
            //console.log(x + "  " + result[x][2]);// actor表示

            //操作者管理
            if(actor.length != 0){
              for(let i = 0 ; i <= actor.length ; i++){
                if(actor[i] == logActor){ //一致していたら抜ける
                  actorJudge = 1;
                  actornum = i;
                  break;
                }
              }
            }
            if(actorJudge == 0){
              actor.push(logActor);
              actornum = actor.length;
            }
            actorJudge = 0;
            //console.log(actor);            
        }
    }
    return actor;

}
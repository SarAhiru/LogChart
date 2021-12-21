//事前に生徒登録は完了している全体で行う。

function table(result, dataLength){
    console.log("Jsに来たよ");
    let table = document.getElementById('targetTable');
    let member = ['12748_imlstudent', '12748_naokikato']; //これは今後外部から読み取りできるようにする

    let audioData = new Array(member.length);
    let initial_value = 0;  // 初期化する固定値
    let minute = new Array(member.length);
    let second = new Array(member.length);
    

    for (var x = 0; x < member.length; x++){
        // 2次元配列の「列」部分を作成
        audioData[x] = new Array(4);
        for (let y = 0; y < 4; y++){
            audioData[x][y] = initial_value;   // 初期化
        }
        minute[x] = initial_value;
        second[x] = initial_value;
    }
    for(var x = 0; x < member.length; x++){
        audioData[x][0] = member[x];
    }
    console.log(audioData);  //audioData配列は[ユーザー名, 再生回数, 再生時間, 再生コンテンツ数]
    console.log(minute);
    console.log(second);

    //ここからデータの分析
    if(dataLength > 0){
        for(let x = 1; x < dataLength ; x++){
            let logActor = result[x][2]; // actor取得
            let logTarget = result[x][9]; // target取得
            let user = 0;

            if(logTarget.includes('audio end')){
                console.log("音声再生");
                for(let a = 0; a < member.length ; a++){
                    if(logActor.includes(audioData[a][0]) ){
                        user = a; //ユーザーの識別
                    }
                }
                audioData[user][1] ++ ; //再生回数のカウントを+1
                //console.log(audioData);
                
                //再生時間
                let addminute = logTarget.slice( 11, 13 );
                addminute = parseInt(addminute);
                let addsecond = logTarget.substr( 14 );
                addsecond = parseInt(addsecond);

                minute[user] = minute[user] + addminute;
                second[user] = second[user] + addsecond;
                if(second[user] >= 60){ //60秒を越えていたときの処理
                    minute[user] = minute[user] + 1;
                    second[user] = second[user] - 60;
                }
            }

            if(logTarget.includes('video end')){
                console.log("動画再生");
                //audioData[0][1] ++ ;
                for(let a = 0; a < member.length ; a++){
                    if(logActor.includes(audioData[a][0]) ){
                        user = a; //ユーザーの識別
                    }
                }
                audioData[user][1] ++ ; //再生回数のカウントを+1
                //console.log(audioData);
                
                //再生時間
                let addminute = logTarget.slice( 11, 13 );
                addminute = parseInt(addminute);
                let addsecond = logTarget.substr( 14 );
                addsecond = parseInt(addsecond);

                minute[user] = minute[user] + addminute;
                second[user] = second[user] + addsecond;
                if(second[user] >= 60){ //60秒を越えていたときの処理
                    minute[user] = minute[user] + 1;
                    second[user] = second[user] - 60;
                }
            }

        }
    }

    //再生時間の修正
    for(let a = 0; a < member.length ; a++){
        if(second[a] == 0){
            second[a] = "00";
        }
        if(minute[a] < 10){
            minute[a] = "0" + String(minute[a]);
        }
        audioData[a][2] =  minute[a] + ":" + second[a] ;
        console.log(audioData);
        console.log(minute);
        console.log(second);
    }

    //テーブルのセルを１行目以外削除する
    while( table.rows[ 1 ] ) table.deleteRow( 1 );

    //テーブルのセルを追加する
    for(let x = 0; x < member.length ; x++){
        let newRow = table.insertRow();

        for(let y = 0; y < 4 ; y++){
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(audioData[x][y]);
            newCell.appendChild(newText);
        }
    }
}

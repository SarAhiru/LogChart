
function table(result, member, choicedate, startnum, finishnum) {
    console.log(startnum+"   "+finishnum)
    let table = document.getElementById('targetTable');
    let audiocheck = document.getElementById('audiocheck');
    let videocheck = document.getElementById('videocheck');

    let audioData = new Array(member.length);
    let initial_value = 0;  // 初期化する固定値
    let minute = new Array(member.length);
    let second = new Array(member.length);

    for (var x = 0; x < member.length; x++) {
        // 2次元配列の「列」部分を作成
        audioData[x] = new Array(4);
        for (let y = 0; y < 4; y++) {
            audioData[x][y] = initial_value;   // 初期化
        }
        minute[x] = initial_value;
        second[x] = initial_value;
    }
    for (var x = 0; x < member.length; x++) {
        audioData[x][0] = "生徒_" + (x + 1);
    }
    // console.log(audioData);  //audioData配列は[ユーザー名, 再生回数, 再生時間, 再生コンテンツ数]
    // console.log(minute);
    // console.log(second);

    //ここからデータの分析
    if (result.length > 0) {
        for (let x = startnum; x <= finishnum; x++) {
            let logDate = result[x][0]; // ログからdate取得
            let logActor = result[x][2]; // actor取得
            let logTarget = result[x][9]; // target取得
            let user = 0;

            let date = new Date(logDate);

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

                        if(audiocheck.checked == true){
                            // console.log("一旦ここまで");
                            if (logTarget.includes('audio end') || logTarget.includes('audio stop') || logTarget.includes('audio seek')) {
                                console.log("音声再生");
                                for (let a = 0; a < member.length; a++) {
                                    if (logActor.includes(member[a])) {
                                        user = a; //ユーザーの識別
                                    }
                                }
                                audioData[user][1]++; //再生回数のカウントを+1
                                //console.log(audioData);

                                //再生時間
                                if(logTarget.includes('audio end')){
                                    // console.log(logTarget);
                                    var addminute = logTarget.substring(11, 13);
                                    // console.log("minute"+addminute);
                                    var addsecond = logTarget.substring(14, 16);
                                    // console.log("second"+addsecond);
                                }
                                if(logTarget.includes('audio stop') || logTarget.includes('audio seek')){
                                    // console.log(logTarget);
                                    var addminute = logTarget.substring(12, 14);
                                    // console.log("minute"+addminute);
                                    var addsecond = logTarget.substring(15, 17);
                                    // console.log("second"+addsecond);
                                }

                                addminute = parseInt(addminute);
                                addsecond = parseInt(addsecond);
    
    
                                minute[user] = minute[user] + addminute;
                                second[user] = second[user] + addsecond;
                                if (second[user] >= 60) { //60秒を越えていたときの処理
                                    minute[user] = minute[user] + 1;
                                    second[user] = second[user] - 60;
                                }
                                // console.log(second);
                            }
                        }
                        
                        if(videocheck.checked == true){
                            if (logTarget.includes('video end')) {
                                console.log("動画再生");
                                //audioData[0][1] ++ ;
                                for (let a = 0; a < member.length; a++) {
                                    if (logActor.includes(member[a])) {
                                        user = a; //ユーザーの識別
                                    }
                                }
                                audioData[user][1]++; //再生回数のカウントを+1
                                //console.log(audioData);
    
                                //再生時間
                                // console.log(logTarget);
                                let addminute = logTarget.substr(11, 2);
                                // console.log(addminute);
                                addminute = parseInt(addminute);
                                let addsecond = logTarget.substr(13, 2);
                                // console.log(addsecond);
                                addsecond = parseInt(addsecond);
    
                                minute[user] = minute[user] + addminute;
                                second[user] = second[user] + addsecond;
                                if (second[user] >= 60) { //60秒を越えていたときの処理
                                    minute[user] = minute[user] + 1;
                                    second[user] = second[user] - 60;
                                }
                            }
                        } 
                    }
                }
            }
        }
    }


    //ここに計算式を入れてセルの色変更をする
    //再生回数の最大値ー最小値をした時間を５分割にする
    let count = new Array();
    for (let x = 0; x < member.length; x++) {
        count[x] = audioData[x][1];
    }
    //時間の最大値判定【再生回数】
    let maxcount = count[0];
    for (let x = 0; x < member.length; x++) {
        if (maxcount < count[x]) {
            maxcount = count[x];
        }
    }
    //時間の最小値判定【再生回数】
    let mincount = count[0];
    for (let x = 0; x < member.length; x++) {
        if (mincount > count[x]) {
            mincount = count[x];
        }
    }
    //５分割【再生回数】
    let divecount = (maxcount - mincount) / 5
    // console.log(count);
    // console.log(divecount);


    //ここに計算式を入れてセルの色変更をする
    //再生時間の最大値ー最小値をした時間を５分割にする
    let time = new Array();
    for (let x = 0; x < member.length; x++) {
        time[x] = minute[x] * 60 + second[x];
    }
    //時間の最大値判定【再生時間】
    let maxtime = time[0];
    for (let x = 0; x < member.length; x++) {
        if (maxtime < time[x]) {
            maxtime = time[x];
        }
    }
    //時間の最小値判定【再生時間】
    let mintime = time[0];
    for (let x = 0; x < member.length; x++) {
        if (mintime > time[x]) {
            mintime = time[x];
        }
    }
    //５分割【再生時間】
    let divetime = (maxtime - mintime) / 5;

    
    //再生時間を表示用に修正
    for (let a = 0; a < member.length; a++) {
        if (second[a] == 0) {
            second[a] = "00";
        }
        else if (second[a] < 10) {
            second[a] = "0" + String(second[a]);
        }
        if (minute[a] < 10) {
            minute[a] = "0" + String(minute[a]);
        }
        audioData[a][2] = minute[a] + ":" + second[a];
    }


    /* ----------------------------
        ここからテーブルの編集コード
       ----------------------------  */

    //テーブルのセルを１行目以外削除する
    while (table.rows[1]) table.deleteRow(1);

    //テーブルのセルを追加する
    for (let x = 0; x < member.length; x++) {
        let newRow = table.insertRow();

        for (let y = 0; y < 4; y++) {
            let newCell = newRow.insertCell();
            let newText = document.createTextNode(audioData[x][y]);


            //再生回数の色分け
            if (y == 1) {
                if (count[x] <= (mincount + divecount)) {
                    newCell.style.backgroundColor = "#ffffff";
                    // console.log(1);
                }
                else if (count[x] <= (mincount + divecount * 2)) {
                    newCell.style.backgroundColor = "#ccffd4";//S20
                    // console.log(2);
                }
                else if (count[x] <= (mincount + divecount * 3)) {
                    newCell.style.backgroundColor = "#99ffab";//S40
                    // console.log(3);
                }
                else if (count[x] <= (mincount + divecount * 4)) {
                    newCell.style.backgroundColor = "#66ff84";//S60
                    // console.log(4);
                }
                else if (count[x] <= maxcount) {
                    newCell.style.backgroundColor = "#00ff37";//S100
                    // console.log(5);
                }
            }


            //再生時間の色分け
            if (y == 2) {
                if (time[x] <= (mintime + divetime)) {
                    newCell.style.backgroundColor = "#ffffff";
                    // console.log(1);
                }
                else if (time[x] <= (mintime + divetime * 2)) {
                    newCell.style.backgroundColor = "#ffcc99";//S40
                    // console.log(2);
                }
                else if (time[x] <= (mintime + divetime * 3)) {
                    newCell.style.backgroundColor = "#ffb566";//S60
                    // console.log(3);
                }
                else if (time[x] <= (mintime + divetime * 4)) {
                    newCell.style.backgroundColor = "#ff9c32";//S80
                    // console.log(4);
                }
                else if (time[x] <= maxtime) {
                    newCell.style.backgroundColor = "#ff8300";//S100
                    // console.log(5);
                }
            }
            newCell.appendChild(newText);
        }
    }
}

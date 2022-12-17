//学習者用デジタル教科書　英語　ログ　グラフ生成　[全体合計 １分]
// ファイル読み取り用
function totalcount(result, time, startnum, finishnum) {
    let totalnum = []; // 全体平均用
    let datanum = 0; //配列番号カウント用
    let ftime = 0; //first time
    let judge = 0; //初回かどうかを判断

    // 初期化
    for (let x = 0; x < time.length; x++) {
        totalnum[x] = 0;
    }

    if (result.length > 0) {
        for (let x = startnum; x <= finishnum; x++) {
            let logDate = result[x][0]; // date取得
            let logTarget = result[x][9]; // target取得

            //横軸時間管理
            let date = new Date(logDate);

            //始めだけfirst timeを設定
            if (judge == 0) {
                ftime = new Date(logDate);
                datanum = 0;
                judge = 1;
                ftime.setMinutes(ftime.getMinutes() + 1);
            }
            else {
                while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
                    ftime.setMinutes(ftime.getMinutes() + 1);
                    datanum++;
                }
            }

            if (logTarget.includes('audio volume')) {
            } else {
                // console.log(datanum);
                totalnum[datanum]++;
            }
        }
    }
    // console.log(totalnum);
    return totalnum;
}


function count(result, member, time, startnum, finishnum) {
    // console.log(result);
    // console.log(startnum);
    // console.log(finishnum);

    let totalnum = []; //全体平均用
    let num = []; // 操作回数
    let membernum = 0; //何人目のデータか

    let datanum = 0; //配列番号カウント用
    // let ftime = 0; //first time
    // let judge = 0; //初回かどうかを判断

    // 初期化
    for (let x = 0; x < time.length; x++) {
        totalnum[x] = 0;
    }
    for (let i = 0; i <= member.length; i++) {
        num.push(Array(time.length));
        for (let x = 0; x < time.length; x++) {
            num[i][x] = 0;
        }
    }

    if (result.length > 0) {
        for (let x = startnum; x <= finishnum; x++) {
            let logDate = result[x][0]; // date取得
            let logActor = result[x][2]; // actor取得
            let logTarget = result[x][9]; // target取得

            // console.log(x + "  " + result[x][0]);
            // console.log(x + "  " + result[x][9]);

            //今回のデータは何人目の生徒なのか
            membernum = member.indexOf(logActor);
            if (member.indexOf(logActor) < 0) {
                membernum = member.length;
                member[membernum] = logActor;
                num.push(Array(time.length));
                for (let x = 0; x < time.length; x++) {
                    num[member.length - 1][x] = 0;
                }
            }
            // console.log(member);
            // console.log(num);

            //横軸時間管理
            let date = logDate.substring(11, 16);
            // console.log(date);

            datanum = time.indexOf(date);

            // console.log(membernum + "  "+ datanum);
            if (datanum < 0) {
            } else {
                if (logTarget.includes('audio volume')) {
                } else if (logTarget.includes('openBook index')) {
                } else {
                    totalnum[datanum]++;
                    num[membernum][datanum]++;
                }
            }


            // //始めだけfirst timeを設定
            // if (judge == 0) {
            //     ftime = new Date(logDate);
            //     datanum = 0;
            //     judge = 1;
            //     ftime.setMinutes(ftime.getMinutes() + 1);
            // }
            // else {
            //     while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
            //         ftime.setMinutes(ftime.getMinutes() + 1);
            //         datanum++;
            //     }
            // }
            // // console.log(datanum);

            // if (logTarget.includes('audio volume')) {
            // } else if (logTarget.includes('openBook index')) {
            // } else {
            //     totalnum[datanum]++;
            //     num[membernum][datanum]++;
            // }
        }
    }
    // console.log(member.length);

    for (let x = 0; x < time.length; x++) {
        num[member.length][x] = totalnum[x] / member.length;  //人数で割って平均を出したい
    }
    // console.log(num);
    return num;
}

// function detailcount(result, member, time, startnum, finishnum) {
//     let totalnum = []; //全体平均用
//     let num = []; // 操作回数
//     let membernum = 0; //何人目のデータか

//     let datanum = 0; //配列番号カウント用

//     // 初期化
//     for (let x = 0; x < time.length; x++) {
//         totalnum[x] = 0;
//     }
//     for (let i = 0; i < (member.length * 6); i++) {
//         num.push(Array(time.length));
//         for (let x = 0; x < time.length; x++) {
//             num[i][x] = 0;
//         }
//     }
//     /* num　配列　これが人数分続く
//     num[1][]:目次
//     num[2][]:ページ移動
//     num[3][]:音声
//     num[4][]:動画
//     num[5][]:ペン選択
//     num[6][]:
//     */

//     if (result.length > 0) {
//         for (let x = startnum; x <= finishnum; x++) {
//             let logDate = result[x][0]; // date取得
//             let logActor = result[x][2]; // actor取得
//             let logTarget = result[x][9]; // target取得

//             //console.log(x + "  " + result[x][0]);
//             //console.log(x + "  " + result[x][2]);// actor表示

//             //今回のデータは何人目の生徒なのか
//             membernum = member.indexOf(logActor);

//             //横軸時間管理
//             let date = logDate.substring(11, 16);
//             datanum = time.indexOf(date);

//             if (logTarget.includes('index')) { // indexの文字を含んでいるのかどうか
//                 if (logTarget.includes('openBook index')) {
//                 } else {
//                     num[0 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('cp')) {
//                 let last = logTarget.slice(-2, -1);
//                 if (last == "4") {
//                     num[1 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('pager') || logTarget.includes('open tenkey')) {
//                 num[1 + 6 * membernum][datanum]++;
//             }
//             else if (logTarget.includes('audio')) {
//                 if (logTarget.includes('audio volume') || logTarget.includes('audio button pitch') || logTarget.includes('audio button setting') || logTarget.includes('audio button mute') || logTarget.includes('audio button close')) {
//                 } else {
//                     num[2 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('video')) {
//                 if (logTarget.includes('video volume') || logTarget.includes('video button pitch') || logTarget.includes('video button fullscreen') || logTarget.includes('video button setting') || logTarget.includes('video button mute') || logTarget.includes('video button close')) {
//                 } else {
//                     num[3 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('simplePen black: true') || logTarget.includes('simplePen red: true') || logTarget.includes('penType')) {
//                 num[4 + 6 * membernum][datanum]++;
//             }
//             else {
//                 num[5 + 6 * membernum][datanum]++;
//             }
//         }
//     }
//     return num;
// }

function detailcount(result, member, time, startnum, finishnum) {
    let totalnum = []; //全体平均用
    let num = []; // 操作回数
    let membernum = 0; //何人目のデータか

    let datanum = 0; //配列番号カウント用

    // 初期化
    for (let x = 0; x < time.length; x++) {
        totalnum[x] = 0;
    }
    for (let i = 0; i < (member.length * 8); i++) {
        num.push(Array(time.length));
        for (let x = 0; x < time.length; x++) {
            num[i][x] = 0;
        }
    }
    /* num　配列　これが人数分続く
    num[0][]:目次
    num[1][]:ページ移動
    num[2][]:リンク
    num[3][]:拡大
    num[4][]:音声
    num[5][]:動画
    num[6][]:ペン選択
    num[7][]:
    */

    if (result.length > 0) {
        for (let x = startnum; x <= finishnum; x++) {
            let logDate = result[x][0]; // date取得
            let logActor = result[x][2]; // actor取得
            let logTarget = result[x][9]; // target取得

            //console.log(x + "  " + result[x][0]);
            //console.log(x + "  " + result[x][2]);// actor表示

            //今回のデータは何人目の生徒なのか
            membernum = member.indexOf(logActor);

            //横軸時間管理
            let date = logDate.substring(11, 16);
            datanum = time.indexOf(date);

            if (logTarget.includes('index')) { // indexの文字を含んでいるのかどうか
                if (logTarget.includes('openBook index')) {
                } else {
                    num[0 + 8 * membernum][datanum]++;
                }
            }
            else if (logTarget.includes('cp')) {
                let last = logTarget.slice(-2, -1);
                if (last == "4") {
                    num[1 + 8 * membernum][datanum]++;
                }
                if (last == "0" || last == "1" || last == "2" || last == "3" || last == "5" || last == "7") {
                    num[2 + 8 * membernum][datanum]++;
                }
                if (last == "6") {
                    num[3 + 8 * membernum][datanum]++;
                }
            }
            else if (logTarget.includes('pager') || logTarget.includes('open tenkey')) {
                num[1 + 8 * membernum][datanum]++;
            }
            else if (logTarget.includes('reflow') || logTarget.includes('bottomTab')) {
                num[2 + 8 * membernum][datanum]++;
            }
            else if (logTarget.includes('zoom')) {
                if (logTarget.includes('zoomEnd')) {
                } else {
                    num[3 + 8 * membernum][datanum]++;
                }
            }
            else if (logTarget.includes('audio')) {
                if (logTarget.includes('audio volume') || logTarget.includes('audio button pitch') || logTarget.includes('audio button setting') || logTarget.includes('audio button mute') || logTarget.includes('audio button close')) {
                } else {
                    num[4 + 8 * membernum][datanum]++;
                }
            }
            else if (logTarget.includes('video')) {
                if (logTarget.includes('video volume') || logTarget.includes('video button pitch') || logTarget.includes('video button fullscreen') || logTarget.includes('video button setting') || logTarget.includes('video button mute') || logTarget.includes('video button close')) {
                } else {
                    num[5 + 8 * membernum][datanum]++;
                }
            }
            else if (logTarget.includes('simplePen black: true') || logTarget.includes('simplePen red: true') || logTarget.includes('penType')) {
                num[6 + 8 * membernum][datanum]++;
            }
            else if(logTarget.includes('draw' && 'pen') ){
                num[6 + 8 * membernum][datanum]++;
              }
            else {
                num[7 + 8 * membernum][datanum]++;
            }
        }
    }
    return num;
}

// function detailcount_test(result, member, time, startnum, finishnum) {
//     let totalnum = []; //全体平均用
//     let num = []; // 操作回数
//     let membernum = 0; //何人目のデータか

//     let datanum = 0; //配列番号カウント用
//     let ftime = 0; //first time
//     let judge = 0; //初回かどうかを判断

//     // 初期化
//     for (let x = 0; x < time.length; x++) {
//         totalnum[x] = 0;
//     }
//     for (let i = 0; i < (member.length * 6); i++) {
//         num.push(Array(time.length));
//         for (let x = 0; x < time.length; x++) {
//             num[i][x] = 0;
//         }
//     }
//     /* num　配列　これが人数分続く
//     num[1][]:目次
//     num[2][]:ページ移動
//     num[3][]:音声
//     num[4][]:動画
//     num[5][]:ペン選択
//     num[6][]:
//     */

//     if (result.length > 0) {
//         for (let x = startnum; x <= finishnum; x++) {
//             let logDate = result[x][0]; // date取得
//             let logActor = result[x][2]; // actor取得
//             let logTarget = result[x][9]; // target取得

//             //console.log(x + "  " + result[x][0]);
//             //console.log(x + "  " + result[x][2]);// actor表示

//             //今回のデータは何人目の生徒なのか
//             membernum = member.indexOf(logActor);

//             //横軸時間管理
//             let date = new Date(logDate);

//             //始めだけfirst timeを設定
//             if (judge == 0) {
//                 ftime = new Date(logDate);
//                 datanum = 0;
//                 judge = 1;
//                 ftime.setMinutes(ftime.getMinutes() + 1);
//             }
//             else {
//                 while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
//                     ftime.setMinutes(ftime.getMinutes() + 1);
//                     datanum++;
//                 }
//             }

//             if (logTarget.includes('index')) { // indexの文字を含んでいるのかどうか
//                 if (logTarget.includes('openBook index')) {
//                 } else {
//                     num[0 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('cp')) {
//                 if (logTarget.substring(18, 19) == 4) { //cp:ページ遷移のみ取り出し
//                     num[1 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('audio')) {
//                 if (logTarget.includes('audio volume')) {
//                 } else {
//                     num[2 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('video')) {
//                 if (logTarget.includes('video volume')) {
//                 } else {
//                     num[3 + 6 * membernum][datanum]++;
//                 }
//             }
//             else if (logTarget.includes('true') || logTarget.includes('penType')) {
//                 num[4 + 6 * membernum][datanum]++;
//             }
//             else {
//                 num[5 + 6 * membernum][datanum]++;
//             }
//         }
//     }

//     // for (let x = 0; x < time.length; x++) {
//     //     totalnum[x] = totalnum[x] / member.length;  //人数で割って平均を出したい
//     // }
//     // console.log(num);
//     return num;
// }


//学習者用デジタル教科書　英語　ログ　グラフ生成　[全体合計 １分]
//realtime database用
function countttt(result, member, time, startnum, finishnum) {
    let totalnum = []; //全体平均用
    let num = []; // 操作回数
    let membernum = 0; //何人目のデータか

    let datanum = 0; //配列番号カウント用
    let ftime = 0; //first time
    let judge = 0; //初回かどうかを判断
    // let fminute = 0; //グラフの軸ラベル用
    // let fhour = 0;

    // 初期化
    for (let x = 0; x < time.length; x++) {
        totalnum[x] = 0;
    }
    for (let i = 0; i < member.length; i++) {
        num.push(Array(time.length));
        for (let x = 0; x < time.length; x++) {
            num[i][x] = 0;
        }
    }

    if (result.length > 0) {
        for (let x = startnum; x <= finishnum; x++) {
            // console.log(result[x]);
            let logTime = result[x][0]; // time取得
            let logActor = result[x][2]; // actor取得
            let logTarget = result[x][9]; // target取得

            //console.log(x + "  " + result[x][0]);
            //console.log(x + "  " + result[x][2]);// actor表示

            //今回のデータは何人目の生徒なのか
            membernum = member.indexOf(logActor);
            // console.log(membernum);

            //横軸時間管理
            // let date = new Date(logDate);

            //始めだけfirst timeを設定
            if (judge == 0) {
                // ftime = new Date(logDate);
                ftime = logTime;
                datanum = 0;
                judge = 1;
            }
            else {
                // while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
                //     ftime.setMinutes(ftime.getMinutes() + 1);
                //     datanum++;
                // }

                // console.log(logTime + " " + ftime + " " + (logTime > ftime));
                while (logTime > ftime) { //1分経過したのかを判断
                    // console.log("1分経過");
                    let hour = parseInt(ftime.substring(0, 2));
                    let minute = parseInt(ftime.substring(3, 5));

                    minute = minute + 1;
                    if (minute >= 60) { //60分より大きい場合の調整
                        minute = 00;
                        hour = hour + 1;
                    }

                    if (minute < 10 || hour < 10) {
                        let minute2 = minute;
                        let hour2 = hour;

                        if (minute < 10) {
                            minute2 = "0" + String(minute);
                        }
                        if (hour < 10) {
                            hour2 = "0" + String(hour);
                        }
                        ftime = hour2 + ":" + minute2;
                    }
                    else {
                        ftime = hour + ":" + minute;
                    }
                    // console.log(ftime);
                    // ftime.setMinutes(ftime.getMinutes() + 1);

                    datanum++;
                }
            }

            if (logTarget.includes('audio volume')) {

            } else {
                num[membernum][datanum]++;
            }


            // console.log(datanum);
            // totalnum[datanum - 1]++;
        }
    }

    // for (let x = 0; x < time.length; x++) {
    //     totalnum[x] = totalnum[x] / member.length;  //人数で割って平均を出したい
    // }
    console.log(num);
    return num;
}


// function count2(result, member, time, startTime, finishTime) {
//     let totalnum = []; //全体平均用
//     let num = []; // 操作回数
//     let membernum = 0; //何人目のデータか

//     let datanum = 0; //配列番号カウント用
//     let ftime = 0; //first time
//     let judge = 0; //初回かどうかを判断

//     // 初期化
//     for (let x = 0; x < time.length; x++) {
//         totalnum[x] = 0;
//     }
//     for (let i = 0; i < member.length; i++) {
//         num.push(Array(time.length));
//         for (let x = 0; x < time.length; x++) {
//             num[i][x] = 0;
//         }
//     }

//     if (result.length > 0) {
//         for (let x = startnum; x <= finishnum; x++) {
//             let logDate = result[x][0]; // date取得
//             let logActor = result[x][2]; // actor取得

//             //console.log(x + "  " + result[x][0]);
//             //console.log(x + "  " + result[x][2]);// actor表示

//             //今回のデータは何人目の生徒なのか
//             membernum = member.indexOf(logActor);
//             // console.log(membernum);

//             //横軸時間管理
//             let date = new Date(logDate);

//             //始めだけfirst timeを設定
//             if (judge == 0) {
//                 ftime = new Date(logDate);
//                 datanum = 1;
//                 judge = 1;
//             }
//             else {
//                 while (date.getTime() > ftime.getTime()) { //1分経過したのかを判断
//                     ftime.setMinutes(ftime.getMinutes() + 1);
//                     datanum++;
//                 }
//             }

//             num[membernum][datanum - 1]++;
//             // console.log(datanum);
//             // totalnum[datanum - 1]++;
//         }
//     }

//     // for (let x = 0; x < time.length; x++) {
//     //     totalnum[x] = totalnum[x] / member.length;  //人数で割って平均を出したい
//     // }
//     console.log(num);
//     return num;
// }

// リアルタイム用
function count2(result, member, time) {
    let totalnum = []; //全体平均用
    let num = []; // 操作回数
    let membernum = 0; //何人目のデータか
    let datanum = 0

    // 初期化
    for (let x = 0; x < time.length; x++) {
        totalnum[x] = 0;
    }
    for (let i = 0; i <= member.length; i++) {
        num.push(Array(time.length));
        for (let x = 0; x < time.length; x++) {
            num[i][x] = 0;
        }
    }

    if (result.length > 0) {
        for (let x = startnum; x <= finishnum; x++) {
            // console.log(result[x]);
            let logTime = result[x][0]; // time取得
            let logActor = result[x][2]; // actor取得
            let logTarget = result[x][9]; // target取得

            // console.log(x + "  " + result[x][0]);
            // console.log(x + "  " + result[x][9]);// actor表示

            //今回のデータは何人目の生徒なのか
            membernum = member.indexOf(logActor);

            //今回のデータは何番目の時間なのか
            let loghour = parseInt(logTime.substring(8, 10));// + 9;
            let logmin = logTime.substring(10, 12);
            let logt;
            if (loghour < 10) {
                logt = "0" + String(loghour) + ":" + logmin;
            }else{
                logt = loghour + ":" + logmin;
            }
            // console.log(logt);
            datanum = time.indexOf(logt);
            // console.log(datanum);

            // console.log(membernum + " "+datanum)
            if (datanum < 0) {
            } else {
                if (logTarget.includes('audio volume')) {
                } else if (logTarget.includes('openBook index')) {
                } else {
                    totalnum[datanum]++;
                    num[membernum][datanum]++;
                }
            }
        }
        // console.log(num);
    }

    if (time.length == 0) {
    } else {
        for (let x = 0; x < time.length; x++) {
            num[member.length][x] = totalnum[x] / member.length;  //人数で割って平均を出したい
        }
    }

    // console.log(num);
    return num;
}
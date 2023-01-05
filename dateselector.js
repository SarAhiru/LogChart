function dateselect(result) {
    const element = document.getElementById("dateselect");
    // console.log(element.options.length)
    for (let x = element.options.length-1; x >= 0; x--) {
        // console.log(x)
        element.remove(x);
    }
    // console.log(element.options.length)

    // console.log(result);
    let datelist = [];

    if (result.length > 0) {
        for (let x = 1; x < result.length-1; x++) {
            let logDate = result[x][0]; // date取得
            let date = logDate.substring(0, 10);

            if (datelist.indexOf(date) >= 0) {
            } else {
                if(date == "date"){

                }else{
                    // selectタグを取得する
                    var select = document.getElementById("dateselect");
                    // optionタグを作成する
                    var option = document.createElement("option");
                    // optionタグのテキストをdateに設定する
                    option.textContent = date;
                    // optionタグのvalueを設定する
                    option.value = date;
                    // option.value = datelist.length;
                    // selectタグの子要素にoptionタグを追加する
                    select.appendChild(option);
                    datelist[datelist.length] = date;
                    // console.log(datelist);
                }
            }
        }
    }
    var yyyy = datelist[0].substring(0, 4);
    var mm = datelist[0].substring(5, 7);
    var dd = datelist[0].substring(8, 10);
    document.getElementById("output").value = yyyy + '-' + mm + '-' + dd;
}


function dateselect2(date) {
    const element = document.getElementById("dateselect");
    // console.log(element.options.length)
    for (let x = element.options.length-1; x >= 0; x--) {
        // console.log(x)
        element.remove(x);
    }

    for(let x=0; x<date.length; x++){
        // selectタグを取得する
        var select = document.getElementById("dateselect");
        // optionタグを作成する
        var option = document.createElement("option");
        // optionタグのテキストをdateに設定する
        option.textContent = date[x];
        // optionタグのvalueを設定する
        option.value = date[x];
        // option.value = datelist.length;
        // selectタグの子要素にoptionタグを追加する
        select.appendChild(option);
        // console.log(datelist);
    }
}

function schoolclass_add() {
    const element = document.getElementById("schoolclass");
    // console.log(element.options.length)
    for (let x = element.options.length-1; x >= 0; x--) {
        // console.log(x)
        element.remove(x);
    }

    // selectタグを取得する
    var select = document.getElementById("schoolclass");
    // optionタグを作成する
    var option = document.createElement("option");
    // optionタグのテキストをdateに設定する
    option.textContent = "全体";
    // optionタグのvalueを設定する
    option.value = "6";
    // selectタグの子要素にoptionタグを追加する
    select.appendChild(option);

    for(let x=1; x<4; x++){
        // selectタグを取得する
        var select = document.getElementById("schoolclass");
        // optionタグを作成する
        var option = document.createElement("option");
        // optionタグのテキストをdateに設定する
        option.textContent = "6-" + x;
        // optionタグのvalueを設定する
        option.value = "6-" + x;
        // option.value = datelist.length;
        // selectタグの子要素にoptionタグを追加する
        select.appendChild(option);
        // console.log(datelist);
    }
}

function schoolclass_remove() {
    const element = document.getElementById("schoolclass");
    // console.log(element.options.length)
    for (let x = element.options.length-1; x >= 0; x--) {
        // console.log(x)
        element.remove(x);
    }
}

function heatmap(member, time, num, nickname) {

    // Chart.register(ChartDataLabels);

    const mapHeight = member.length; //人数
    const mapWidth = time.length;

    // データセットの生成
    const generateDatasets = function () {
        const datasets = [];
        for (let i = mapHeight - 1; i >= 0; i--) {
            if (nickname[i] === undefined) {
                datasets.push({
                    label: '生徒' + (i + 1),
                    // label: nickname[i],
                    data: new Array(mapWidth).fill(1), //時間
                    borderWidth: 0.2,
                    borderColor: "#FFFFFF",
                    // backgroundColor: 'skyblue'
                    backgroundColor: generateColor(i)
                })
            } else {
                datasets.push({
                    // label: '生徒' + (i+1),
                    label: nickname[i],
                    data: new Array(mapWidth).fill(1), //時間
                    borderWidth: 0.2,
                    borderColor: "#FFFFFF",
                    // backgroundColor: 'skyblue'
                    backgroundColor: generateColor(i)
                })
            }
        }
        return datasets;
    }

    // 色配列の生成 (追加）
    const generateColor = function (y) {
        const datasetColors = []
        for (let x = 0; x < mapWidth; x++) {
            // const opa = ((x * y / maxVal)*0.7 + 0.3).toFixed(2);
            let opa = 0;

            //ここの閾値を今度考える
            if (num[y][x] == 0) {
                opa = 0;
            }
            else if (num[y][x] < 80) {
                opa = (num[y][x] / 100 + 0.1).toFixed(1);
            }
            else if (num[y][x] < 100) {
                opa = 0.8;
            }
            else if (num[y][x] < 150) {
                opa = 0.9;
            }
            // else if(num[y][x] <= 200){
            //     opa = 0.9;
            // }
            else {
                opa = 1;
            }
            // const opa = ((num[member])*0.7 + 0.3).toFixed(2);
            // const opa = ((datalist[x + (mapHeight-y-1) * mapWidth])*0.7 + 0.3).toFixed(2);
            // datasetColors.push("rgba(135,206,235," + opa + ")"
            datasetColors.push("rgba(255,0,0," + opa + ")")
        }
        return datasetColors;
    }

    let ctx = document.getElementById('heatMap').getContext('2d');
    window.heatMap = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: time, //generateLabels()
            datasets: generateDatasets(),
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Heat Map',
                    fontSize: 18,
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            // console.log(context);
                            // console.log(context.dataset.data.length);

                            if (label) {
                                label += ': ';
                                // console.log(context);
                                // console.log(context.datasetIndex);
                                // console.log(context.dataIndex);
                                // console.log(num);
                                // console.log(num[38 - context.datasetIndex][context.dataIndex]);
                                label += num[mapHeight - context.datasetIndex - 1][context.dataIndex];//38
                                label += '回';
                            }
                            return label;
                        },
                    }
                },
                //グラフ内に数字を入れる
                // datalabels: {
                //     color: 'blue',
                //     labels: {
                //         title: null,
                //         value: {
                //             color: 'black',
                //             font: {
                //                 size: "10px",
                //                 weigth: 'bold',
                //             }
                //         }
                //     }
                // },
                // responsive: false,
                // ChartDataLabels,
            },
            animation: false,
            scales: {
                x: {
                    gridLines: {
                        color: '#FFFFFF',
                    },
                    barPercentage: 0.99,
                    categoryPercentage: 0.99,
                    stacked: true,
                    ticks: {
                        min: 0,
                        // display: false,
                    }
                },
                y: {
                    gridLines: {
                        color: '#FFFFFF',
                        zeroLineWidth: 0
                    },
                    stacked: true,
                    ticks: {
                        //     min: 0,
                        //     stepSize: 1,
                        display: false,
                        //     // lavel: member,
                        //     callback: function(tick, member){
                        //         return tick.toString() + '人';
                        //         // return tick.toString() + member;
                        //     }
                    }
                },
                // responsive: false,
                // ticks: {
                //     lavel: [20,22,24,26],
                // }
            },

        },
        //グラフ内に数字を入れる
        // plugins: [
        //     ChartDataLabels,
        // ]
    });

    //. クリックイベントハンドラー
    // ctx.addEventListener( 'click', function( evt ){
    //     var item = myChart.getElementByEvent( evt );
    //     var item = myChart.getElementAtEvent( evt );
    //     if( item.length == 0 ){
    //       return;
    //     }

    //     item = item[0];
    //     var index = item._index;  //. 配列の何番目のデータがクリックされたか
    //     var item_data = item._chart.config.data.datasets;  //. クリックされたオブジェクトのデータセット
    //     console.log( index );
    //     console.log( item_data );
    // });
}

function heatmap_select(member, time, detailnum, nickname, selectjudge) {
    const mapHeight = member.length; //人数
    const mapWidth = time.length;

    // データセットの生成
    const generateDatasets = function () {
        const datasets = [];
        for (let i = mapHeight - 1; i >= 0; i--) {
            if (nickname[i] === undefined) {
                datasets.push({
                    label: '生徒' + (i + 1),
                    // label: nickname[i],
                    data: new Array(mapWidth).fill(1), //時間
                    borderWidth: 0.2,
                    borderColor: "#FFFFFF",
                    // backgroundColor: 'skyblue'
                    backgroundColor: generateColor(i)
                })
            } else {
                datasets.push({
                    // label: '生徒' + (i+1),
                    label: nickname[i],
                    data: new Array(mapWidth).fill(1), //時間
                    borderWidth: 0.2,
                    borderColor: "#FFFFFF",
                    // backgroundColor: 'skyblue'
                    backgroundColor: generateColor(i)
                })
            }
        }
        return datasets;
    }

    // 色配列の生成 (追加）
    const generateColor = function (y) {
        const datasetColors = []
        for (let x = 0; x < mapWidth; x++) {
            let opa = 0;
            let heatmapnum;
            // console.log(selectjudge);
            heatmapnum = selectjudge + 8 * y;

            //ここの閾値を今度考える
            if (detailnum[heatmapnum][x] == 0) {
                opa = 0;
            }
            else if (detailnum[heatmapnum][x] < 8) {
                opa = (detailnum[heatmapnum][x] / 10 + 0.1).toFixed(1);
            }
            else if (detailnum[heatmapnum][x] < 10) {
                opa = 0.8;
            }
            else if (detailnum[heatmapnum][x] < 50) {
                opa = 0.9;
            }
            // else if(num[y][x] <= 200){
            //     opa = 0.9;
            // }
            else {
                opa = 1;
            }
            if(selectjudge == 0){
                datasetColors.push("rgba(255,75,0," + opa + ")");    
            }
            if(selectjudge == 1){
                datasetColors.push("rgba(77, 196, 255," + opa + ")");    
            }
            if(selectjudge == 2){
                datasetColors.push("rgba(246, 170, 0," + opa + ")");    
            }
            if(selectjudge == 3){
                datasetColors.push("rgba(0, 0, 0," + opa + ")");    
            }
            if(selectjudge == 4){
                datasetColors.push("rgba(3, 175, 122," + opa + ")");    
            }
            if(selectjudge == 5){
                datasetColors.push("rgba(255, 241, 0," + opa + ")");    
            }
            if(selectjudge == 6){
                datasetColors.push("rgba(0, 90, 255," + opa + ")");    
            }
        }
        return datasetColors;
    }

    let ctx = document.getElementById('heatMap').getContext('2d');
    window.heatMap = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: time, //generateLabels()
            datasets: generateDatasets(),
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Heat Map',
                    fontSize: 18,
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            // console.log(context);
                            // console.log(context.dataset.data.length);

                            if (label) {
                                label += ': ';
                                // console.log(context);
                                // console.log(context.datasetIndex);
                                // console.log(context.dataIndex);
                                // console.log(num);
                                // console.log(num[38 - context.datasetIndex][context.dataIndex]);
                                label += detailnum[selectjudge+8*(mapHeight - context.datasetIndex - 1)][context.dataIndex];//38
                                label += '回';
                            }
                            return label;
                        },
                    }
                },
                //グラフ内に数字を入れる
                // datalabels: {
                //     color: 'blue',
                //     labels: {
                //         title: null,
                //         value: {
                //             color: 'black',
                //             font: {
                //                 size: "10px",
                //                 weigth: 'bold',
                //             }
                //         }
                //     }
                // },
                // responsive: false,
                // ChartDataLabels,
            },
            animation: false,
            scales: {
                x: {
                    gridLines: {
                        color: '#FFFFFF',
                    },
                    barPercentage: 0.99,
                    categoryPercentage: 0.99,
                    stacked: true,
                    ticks: {
                        min: 0,
                        // display: false,
                    }
                },
                y: {
                    gridLines: {
                        color: '#FFFFFF',
                        zeroLineWidth: 0
                    },
                    stacked: true,
                    ticks: {
                        //     min: 0,
                        //     stepSize: 1,
                        display: false,
                        //     // lavel: member,
                        //     callback: function(tick, member){
                        //         return tick.toString() + '人';
                        //         // return tick.toString() + member;
                        //     }
                    }
                },
                // responsive: false,
                // ticks: {
                //     lavel: [20,22,24,26],
                // }
            },

        },
        //グラフ内に数字を入れる
        // plugins: [
        //     ChartDataLabels,
        // ]
    });

    //. クリックイベントハンドラー
    // ctx.addEventListener( 'click', function( evt ){
    //     var item = myChart.getElementByEvent( evt );
    //     var item = myChart.getElementAtEvent( evt );
    //     if( item.length == 0 ){
    //       return;
    //     }

    //     item = item[0];
    //     var index = item._index;  //. 配列の何番目のデータがクリックされたか
    //     var item_data = item._chart.config.data.datasets;  //. クリックされたオブジェクトのデータセット
    //     console.log( index );
    //     console.log( item_data );
    // });
}

function heatmap_pen(member, time, num, detailnum, nickname) {
    const mapHeight = member.length * 2; //人数
    const mapWidth = time.length;

    // データセットの生成
    const generateDatasets = function () {
        const datasets = [];
        for (let i = mapHeight - 1; i >= 0; i--) {
            // console.log(~~(i / 2));
            if (nickname[~~(i / 2)] === undefined) {
                // console.log('生徒' + (~~(i / 2) + 1))
                datasets.push({
                    label: '生徒' + (~~(i / 2) + 1),
                    // label: nickname[i],
                    data: new Array(mapWidth).fill(1), //時間
                    borderWidth: 0.2,
                    borderColor: "#FFFFFF",
                    // backgroundColor: 'skyblue'
                    backgroundColor: generateColor(i)
                })
            } else {
                datasets.push({
                    // label: '生徒' + (i+1),
                    label: nickname[~~(i / 2)],
                    data: new Array(mapWidth).fill(1), //時間
                    borderWidth: 0.2,
                    borderColor: "#FFFFFF",
                    // backgroundColor: 'skyblue'
                    backgroundColor: generateColor(i)
                })
            }
        }
        return datasets;
    }

    // 色配列の生成 (追加）
    const generateColor = function (y) {
        const datasetColors = []
        for (let x = 0; x < mapWidth; x++) {
            // const opa = ((x * y / maxVal)*0.7 + 0.3).toFixed(2);
            let opa = 0;
            let heatmapnum;
            // console.log(~~(y / 2))//77

            if (y % 2 === 0) { // 偶数
                // console.log(~~(y / 2));
                heatmapnum = ~~(y / 2);
                //ここの閾値を今度考える
                if (num[heatmapnum][x] == 0) {
                    opa = 0;
                }
                else if (num[heatmapnum][x] < 80) {
                    opa = (num[heatmapnum][x] / 100 + 0.1).toFixed(1);
                }
                else if (num[heatmapnum][x] < 100) {
                    opa = 0.8;
                }
                else if (num[heatmapnum][x] < 150) {
                    opa = 0.9;
                }
                // else if(num[y][x] <= 200){
                //     opa = 0.9;
                // }
                else {
                    opa = 1;
                }
                // const opa = ((num[member])*0.7 + 0.3).toFixed(2);
                // const opa = ((datalist[x + (mapHeight-y-1) * mapWidth])*0.7 + 0.3).toFixed(2);
                // datasetColors.push("rgba(135,206,235," + opa + ")"
                // datasetColors.push("rgba(255,90,0," + opa + ")");
                datasetColors.push("rgba(255,0,0," + opa + ")");
            } else {
                // console.log(4 + 6 * ~~(y / 2));
                // console.log(4 + 6 * ((y - 1) / 2));
                heatmapnum = 4 + 6 * (~~(y / 2));
                //ここの閾値を今度考える
                if (detailnum[heatmapnum][x] == 0) {
                    opa = 0;
                }
                else if (detailnum[heatmapnum][x] < 8) {
                    opa = (detailnum[heatmapnum][x] / 10 + 0.1).toFixed(1);
                }
                else if (detailnum[heatmapnum][x] < 10) {
                    opa = 0.8;
                }
                else if (detailnum[heatmapnum][x] < 50) {
                    opa = 0.9;
                }
                // else if(num[y][x] <= 200){
                //     opa = 0.9;
                // }
                else {
                    opa = 1;
                }
                // const opa = ((num[member])*0.7 + 0.3).toFixed(2);
                // const opa = ((datalist[x + (mapHeight-y-1) * mapWidth])*0.7 + 0.3).toFixed(2);
                // datasetColors.push("rgba(135,206,235," + opa + ")"
                datasetColors.push("rgba(0,90,255," + opa + ")");
                // datasetColors.push("rgba(0,255,0," + opa + ")");
            }
        }
        return datasetColors;
    }

    let ctx = document.getElementById('heatMap').getContext('2d');
    window.heatMap = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: time, //generateLabels()
            datasets: generateDatasets(),
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Heat Map',
                    fontSize: 18,
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            console.log(context.datasetIndex)
                            if (label) {
                                label += ': ';
                                if (context.datasetIndex % 2 != 0) {
                                    label += num[mapHeight - (~~(context.datasetIndex/2)) - 1][(~~(context.datasetIndex/2))];//38
                                }else{
                                    label += detailnum[mapHeight - (4 + 6 * (~~(context.datasetIndex / 2))) - 1][(~~(context.datasetIndex/2))];
                                }
                                label += '回';
                            }
                            return label;
                        },
                    }
                },
            },
            animation: false,
            scales: {
                x: {
                    gridLines: {
                        color: '#FFFFFF',
                    },
                    barPercentage: 0.99,
                    categoryPercentage: 0.99,
                    stacked: true,
                    ticks: {
                        min: 0,
                        // display: false,
                    }
                },
                y: {
                    gridLines: {
                        color: '#FFFFFF',
                        zeroLineWidth: 0
                    },
                    stacked: true,
                    ticks: {
                        display: false,
                    }
                },
            },

        },
    });
}
function drawChart(result, dataLength) {

    console.log(result);
    console.log(dataLength);

    var num = [0,0,0,0,0,0,0,0,0,0,0];

    if(dataLength > 0){
        for(var x = 0; x < dataLength-2 ; ++x){
            var logNum = result[x][2];
            //console.log(x + "  " + result[x][2]);

            num[logNum] ++;
            //console.log(num);
        }
    }
    //console.log(num);
    

    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["お絵かきソフト起動","色変更","消しゴム選択","描画開始","描画終了","画像出力","画像保存","画像拡大","画像縮小","描画クリア","線の太さ変更"],
        datasets: [{
          label: '# of Votes',
          data: num,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor:'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    console.log(num);
}
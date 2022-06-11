//時間選択用　グラフ生成　[全体合計 １分]

function drawChart(time, totalnum) {
  
    let ctx = document.getElementById('timeset').getContext('2d');
    window.timeset = new Chart(ctx, {
      //線グラフ
      type: 'bar',
      //データ
      data: {
        labels: time,
        datasets: [{
          lavel: '全体合計',
          data: totalnum,
          backgroundColor: 'rgba(255, 0, 0, 1)',
          // borderColor:'rgba(255, 0, 0, 1)',
        },]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false,
            categoryPercentage: 1.1,
            barPercentage: 1,
          },
          y: {
            ticks: {
              beginAtZero: true
            }
          }
        }
      }
    });
}
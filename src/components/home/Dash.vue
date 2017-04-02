<template>
<div class="dash-div">
  <h2>Welcome <span class="username">{{username}}</span></h2>
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <h3 class="chart-title">Chart 1</h3>
      </div>
      <div class="row">
        <canvas class="chart" id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <h3 class="chart-title">Chart 2</h3>
      </div>
      <div class="row">
        <canvas class="chart" id="myLineChart" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// Chart.JS code
import Chart from 'chart.js'

// VueJS code
export default {
  data() {
    return {
      username: localStorage.getItem('username')
    }
  },
  mounted() {
    var ctx = document.getElementById("myChart");
    var ctx2 = document.getElementById("myLineChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
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

    var myLineChart = new Chart(ctx2, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: [{
            x: -10,
            y: 0
          }, {
            x: 0,
            y: 10
          }, {
            x: 10,
            y: 5
          }]
        }]
      }
    });
  }
}
</script>

<style lang="css">
.dash-div h2 {
    display: block;
    width: 100%;
    text-align: center;
    margin: 0 0 0 0;
    color: #555;
}

.dash-div h2:after {
    display: block;
    height: 2px;
    background-color: #e67e22;
    content: " ";
    width: 100px;
    margin: 0 auto;
    margin-top: 20px;
}

.username {
    color: #2c3e50;
    text-transform: capitalize;
    letter-spacing: 3px;
}

.chart {
    width: 400px !important;
    height: 400px !important;
}

.chart-title {
    display: inline-block;
    width: 70%;
    margin: 9px auto 20px auto;
    text-align: center;
    letter-spacing: 2px;
    border: 1px solid grey;
}

</style>

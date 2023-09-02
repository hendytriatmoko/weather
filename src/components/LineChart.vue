<template>
  <center>
    <canvas ref="chartCanvas" style="height: 80px; width: 99%"></canvas>
  </center>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'LineChart',
  props: ['chartData'],
  setup(props) {
    const chartCanvas = ref(null)
    let lineChart

    onMounted(() => {
      if (chartCanvas.value) {
        const ctx = chartCanvas.value.getContext('2d')
        lineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: props.chartData.labels,
            datasets: [
              {
                label: 'Line Chart Example',
                data: props.chartData.data,
                borderColor: '#0987bd',
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              x: { display: false },
              y: { display: false },
            },
            plugins: {
              legend: { display: false },
            },
          },
        })
      }
    })

    return {
      chartCanvas,
    }
  },
  beforeUnmount() {
    if (lineChart) {
      lineChart.destroy()
    }
  },
}
</script>

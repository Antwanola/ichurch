<template>
  <vue-apex-charts type=pie height=345 class="mt-10 mb-10" :options="chartOptions" :series="series" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    VueApexCharts,
  },
  props: ['memberStats'],
  data() {
    return {
      chartOptions: {
        labels: ['Men', 'Women', 'Children'],
        dataLabels: {
          enabled: false
        },
        legend: { show: true, position: 'bottom' },
        chart: {
          type: 'pie',
          offsetY: 0,
          dropShadow: {
            enabled: false,
            blur: 5,
            left: 1,
            top: 1,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: 5
        },
        colors: ['#7961F9', '#FF9F43', '#EA5455'],
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#9c8cfc', '#FFC085', '#f29292']
          }
        }
      },
      series: [690, 258, 149],
    }
  },
  watch: {
    memberStats (newValue) {
      this.series = []
      for (let i in newValue) {
        this.series.push(newValue[i])
      }
    }
  },
}
</script>

<style>
</style>
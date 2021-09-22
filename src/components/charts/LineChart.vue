<template>
  <vue-apex-charts
    type=line
    height=345
    :options="chartOptions"
    :series="series" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    VueApexCharts,
  },
  props: ['income', 'expenses'],
  data() {
    return {
      chartOptions: {
        legend: { show: true },
        chart: {
          type: 'line',
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
          curve: 'smooth',
          width: [2, 4],
        },
        colors: ['#7961F9', '#FF9F43'],
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#9c8cfc', '#FFC085']
          }
        },
        xaxis: {
          labels: {
            style: {
              cssClass: 'text-grey fill-current',
            }
          },
          axisTicks: {
            show: false,
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisBorder: {
            show: false,
          },
          tooltip: {
            x: { show: false }
          }
        },
      },
      series: [
        {
          name: 'Income',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: 'Expenses',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
  },
  watch: {
    income (newValue) {
      const income = this.getData(newValue)
      this.series = [
        {
          name: 'Income',
          data: income
        },
        {
          name: 'Expenses',
          data: this.series[1].data
        }
      ]
    },
    expenses (newValue) {
      const expenses = this.getData(newValue)
      this.series = [
        {
          name: 'Income',
          data: this.series[0].data
        },
        {
          name: 'Expenses',
          data: expenses
        }
      ]
    }
  },
  methods: {
    getData (data) {
      const arr = []
      for (let i in data) {
        arr.push(data[i])
      }
      return arr
    }
  },
}
</script>

<style>
</style>
<template>
  <vx-card id="main" class="px-5">
    <vx-card>
      <h3>Incomes</h3>
      <vue-apex-charts
      type=bar
      height=355
      :options="generateChartOptions(incomes)"
      :series="series" />
    </vx-card>
    <!-- expenses -->
    <vx-card class="mt-5">
      <h3 class="mt-5">Expenses</h3>
      <vue-apex-charts
      type=bar
      height=355
      :options="generateChartOptions(expenses)"
      :series="series2" />
    </vx-card>
    <!-- contributions -->
    <vx-card class="mt-5">
      <h3 class="mt-5">Contributions</h3>
      <vue-apex-charts
      type=bar
      height=355
      :options="generateChartOptions(contributions)"
      :series="series3" />
    </vx-card>
  </vx-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { financials } from '@/api/reports'

export default {
  name: 'financials',
  components: {
    VueApexCharts,
  },
  data() {
    return {
      series: [{
        name: 'Income',
        data: [0]
      }],
      series2: [{
        name: 'Expenses',
        data: [0]
      }],
      series3: [{
        name: 'Contributions',
        data: [0]
      }],
      incomes: [
        {
          type: [0],
          percentage: [0]
        }
      ],
      expenses: [
        {
          type: [0],
          percentage: [0]
        }
      ],
      contributions: [
        {
          type: [0],
          percentage: [0]
        }
      ]
    }
  },
  async mounted () {
    this.$vs.loading({
      container: '#main',
      scale: 0.6
    })
    try {
      const { data } = await financials()
      const finances = data.financialCharts
      const incomes = {
        name: 'Income',
        data: []
      }
      const incomesOpt = []
      const expenses = {
        name: 'Expenses',
        data: []
      }
      const expensesOpt = []
      const contributions = {
        name: 'Contributions',
        data: []
      }
      const contributionsOpt = []
      // get income data
      for (let i = 0; i < finances.incomeCategory.length; i++) {
        incomes.data.push(finances.incomeCategory[i].amount)
        incomesOpt.push({
          type: [finances.incomeCategory[i].type],
          percentage: [finances.incomeCategory[i].percentage]
        })
      }
      // get expenses data
      for (let i = 0; i < finances.expenseCategory.length; i++) {
        expenses.data.push(finances.expenseCategory[i].amount)
        expensesOpt.push({
          type: [finances.expenseCategory[i].type],
          percentage: [finances.expenseCategory[i].percentage]
        })
      }
      // get contribution data
      for (let i = 0; i < finances.contributionCategory.length; i++) {
        contributions.data.push(finances.contributionCategory[i].amount)
        contributionsOpt.push({
          type: [finances.contributionCategory[i].type],
          percentage: [finances.contributionCategory[i].percentage]
        })
      }
      this.incomes = incomesOpt
      this.expenses = expensesOpt
      this.contributions = contributionsOpt
      this.series = [incomes]
      this.series2 = [expenses]
      this.series3 = [contributions]
      this.$vs.loading.close('#main > .con-vs-loading')
    } catch (error) {
      this.$vs.notify({
        title: 'Notification',
        text: error.response ? error.response.data.message : error.message,
        color: 'warning'
      })
      this.$vs.loading.close('#main > .con-vs-loading')
    } 
  },
  methods: {
    generateChartOptions (data) {
      // compute categories
      const categories = data.map(item => item.type)
      return {
        chart: {
          height: 455,
          type: 'bar',
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
        plotOptions: {
          bar: {
            distributed: true,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, index) {
            if (index.dataPointIndex < data.length) {
              return `₦${val} (${data[index.dataPointIndex].percentage}%)`
            }
          },
          offsetY: -10,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return '₦' + val
            }
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
          categories,
          axisBorder: {
            show: false,
          },
          tooltip: {
            x: { show: false }
          }
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
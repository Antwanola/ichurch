<template>
  <vx-card id="main">
    <p>Select a Date Range</p>
    <vs-row class="mt-4">
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Start Date"
          type="date"
          v-model="payload.start"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="End Date"
          v-model="payload.end"
          type="date"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button class="mt-5" color="primary" type="flat" @click="reset">Reset</vs-button>
    <vs-button class="mt-5" @click="search">Search</vs-button>
    <hr class="my-6">
    <!-- receipts -->
    <h4 class="text-center text-grey-dark mb-4">Account Summary</h4>
    <h2 class="text-center text-grey-900 mb-5">
      Total Balance: 
      <span 
        :class="{'text-success': report.totalBalance > 0,
                 'text-danger': report.totalBalance < 0}"
      >
        {{ formatNumberWithCommas(report.totalBalance) }}
      </span>
    </h2>
    <div class="vx-row" id="summary">
      <div class="vx-col w-full mt-5">
        <vs-table stripe :data="incomes" max-items="10" pagination>
          <template slot="header">
            <h4 class="mb-2">
              Income
            </h4>
            <p class="text-md text-success mb-0">Total: {{ formatNumberWithCommas(report.totalIncome) }}</p>
          </template>
          <template slot="thead">
            <vs-th>
              Type
            </vs-th>
            <vs-th>
              Amount
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="data[indextr].type">
                <span class="text-cap">{{data[indextr].type}}</span>
              </vs-td>

              <vs-td :data="data[indextr].amount">
                {{ formatNumberWithCommas(data[indextr].amount) }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <div class="vx-col w-full mt-5">
        <vs-table stripe :data="expenses" max-items="10" pagination>
          <template slot="header">
            <h4 class="mb-2">
              Expenses
            </h4>
            <p class="text-md text-danger mb-0">Total: {{ formatNumberWithCommas(report.totalExpenses + report.totalSalaryPaid) }}</p>
          </template>
          <template slot="thead">
            <vs-th>
              Type
            </vs-th>
            <vs-th>
              Amount
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr].type">
                <span class="text-cap">{{data[indextr].type}}</span>
              </vs-td>

              <vs-td :data="data[indextr].amount">
                {{ formatNumberWithCommas(data[indextr].amount) }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- <div class="vx-col w-full md:w-1/2 mt-5">
        <vs-table stripe :data="contributions" max-items="10" pagination>
          <template slot="header">
            <h4 class="mb-2">
              Contributions
            </h4>
            <p class="text-md text-success mb-0">Total: {{ report.totalIncome }}</p>
          </template>
          <template slot="thead">
            <vs-th>
              Type
            </vs-th>
            <vs-th>
              Amount
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr].type">
                <span class="text-cap">{{data[indextr].type}}</span>
              </vs-td>

              <vs-td :data="data[indextr].amount">
                {{data[indextr].amount}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div> -->
    </div>
  </vx-card>
</template>

<script>
import { cashFlow, cashFlowDate } from '@/api/reports'

export default {
  data() {
    return {
      payload: {
        start: '',
        end: ''
      },
      report: {
        totalSalaryPaid: '',
        totalIncome: '',
        totalBalance: ''
      },
      contributions: [],
      expenses: [],
      incomes: [],
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    formatNumberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async getData () {
      this.$vs.loading({
        container: '#summary',
        scale: 0.6
      })
      try {
        const { data } = await cashFlow()
        this.report = data.cashFlowReport
        this.contributions = data.cashFlowReport.contributionCategory
        this.expenses = data.cashFlowReport.expenseCategory
        this.expenses.push({
          amount: data.cashFlowReport.totalSalaryPaid,
          type: 'salaries'
        })
        this.incomes = data.cashFlowReport.incomeCategory
        this.$vs.loading.close('#summary > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#summary > .con-vs-loading')
      }
    },
    async search () {
      this.report = {}
      // ensure user enters date
      if (!this.payload.start || !this.payload.end) {
        return this.$vs.notify({
          title: 'Notification',
          text: 'Please enter dates',
          color: 'warning'
        })
      }
      // validate date
      const validDatePattern = /^(\d{4})([/-])(\d{1,2})\2(\d{1,2})$/
      if (validDatePattern.test(this.payload.start) || validDatePattern.test(this.payload.end)) {
        if (this.payload.start > this.payload.end) {
          return this.$vs.notify({
            title: 'Notification',
            text: 'End date must be greater than start date',
            color: 'warning'
          })
        }
      } else {
        return this.$vs.notify({
          title: 'Notification',
          text: 'Please enter valid dates',
          color: 'warning'
        })
      }
      this.$vs.loading({
        container: '#summary',
        scale: 0.6
      })
      try {
        const { data } = await cashFlowDate(this.payload)
        this.report = data.cashFlowReport
        this.$vs.loading.close('#summary > .con-vs-loading')
      } catch (error) {
        this.$vs.notify({
          title: 'Notification',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
        this.$vs.loading.close('#summary > .con-vs-loading')
      }
    },
    reset () {
      this.payload = {
        start: '',
        end: ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.text-cap {
  text-transform: capitalize;
}
</style>
<template>
  <vx-card>
    <vs-table stripe :data="expenses" max-items="10" pagination id="table">
      <template slot="header">
        <!-- <h3 class="mb-6">Manage Expenses</h3> -->
      </template>
      <template slot="thead">
        <vs-th>Title</vs-th>
        <vs-th>Amount</vs-th>
        <vs-th>Category</vs-th>
        <vs-th>Date</vs-th>
        <vs-th>Description</vs-th>
        <vs-th>Member</vs-th>
        <vs-th>Files</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].expenseTitle">{{ data[index].expenseTitle }}</vs-td>
          <vs-td :data="data[index].expenseAmount">{{ data[index].expenseAmount }}</vs-td>
          <vs-td :data="data[index].expenseCategory">{{ data[index].expenseCategory }}</vs-td>
          <vs-td :data="data[index].date">{{ formatDate(data[index].date) }}</vs-td>
          <vs-td :data="data[index].description">{{ data[index].description }}</vs-td>
          <vs-td
            :data="data[index].member"
          >{{ data[index].member.firstName }} {{ data[index].member.lastName }}</vs-td>
          <vs-td :data="data[index].files">
            <img :src="data[index].files[0]" width="30" height="30" @click="expandFile = true">
            <vs-popup title="File" :active.sync="expandFile">
              <img :src="data[index].files[0]" height="400" style="width: 100%;">
            </vs-popup>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { allExpenses } from '@/api/expenses'

export default {
  data() {
    return {
      expenses: [],
      showDetails: false,
      selectedPerson: {},
      expandFile: false
    }
  },
  mounted () {
    this.getExpenses()
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return `${d.toDateString()}`
    },
    async getExpenses() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await allExpenses()
        if (data.status) this.expenses = data.expenses
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
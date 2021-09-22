<template>
  <vx-card>
    <vs-table stripe :data="contributions" max-items="10" pagination id="table">
      <template slot="header">
        <!-- <h3 class="mb-6">Manage Contributions</h3> -->
      </template>
      <template slot="thead">
        <vs-th>Fullname</vs-th>
        <vs-th>Amount</vs-th>
        <vs-th>Date</vs-th>
        <vs-th>Contribution Type</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Notes</vs-th>
        <vs-th>Payment Method</vs-th>
        <vs-th>Created On</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].fullname">{{ data[index].fullname }}</vs-td>
          <vs-td :data="data[index].amount">{{ data[index].amount }}</vs-td>
          <vs-td :data="data[index].date">{{ formatDate(data[index].date) }}</vs-td>
          <vs-td :data="data[index].contributionType">{{ data[index].contributionType }}</vs-td>
          <vs-td :data="data[index].email">{{ data[index].email }}</vs-td>
          <vs-td :data="data[index].notes">{{ data[index].notes }}</vs-td>
          <vs-td :data="data[index].paymentMethod">{{ data[index].paymentMethod }}</vs-td>
          <vs-td :data="data[index].createdAt">{{ formatDate(data[index].createdAt) }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { allContributions } from '@/api/contribution'

export default {
  data() {
    return {
      contributions: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false
    }
  },
  mounted () {
    this.getContributions()
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    },
    async getContributions() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await allContributions()
        if (data.status) this.contributions = data.contributions
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
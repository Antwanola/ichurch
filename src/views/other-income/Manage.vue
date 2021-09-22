<template>
  <vx-card>
    <vs-table stripe :data="incomes" max-items="10" pagination id="table">
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
          <vs-td :data="data[index].incomeTitle">{{ data[index].incomeTitle }}</vs-td>
          <vs-td :data="data[index].incomeAmount">{{ data[index].incomeAmount }}</vs-td>
          <vs-td :data="data[index].incomeCategory">{{ data[index].incomeCategory }}</vs-td>
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
import { allIncomes } from '@/api/incomes'

export default {
  data() {
    return {
      incomes: [],
      showDetails: false,
      selectedPerson: {},
      expandFile: false
    }
  },
  mounted () {
    this.getIncomes()
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return `${d.toDateString()}`
    },
    async getIncomes() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await allIncomes()
        if (data.status) this.incomes = data.incomes
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
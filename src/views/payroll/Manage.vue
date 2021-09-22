<template>
  <vx-card>
    <vs-table stripe :data="payrolls" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Photo</vs-th>
        <vs-th>Staff Name</vs-th>
        <vs-th>Role</vs-th>
        <vs-th>Salary</vs-th>
        <vs-th>Payment Due</vs-th>
        <vs-th>Total Deductions</vs-th>
        <vs-th>Net Pay</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(group, index) in data" :key="index">
          <vs-td :data="data[index].staff.photo">
            <img radius :src="data[index].staff.photo" width="30" height="30" />
          </vs-td>
          <vs-td :data="data[index].staff.name">{{ data[index].staff.name }}</vs-td>
          <vs-td :data="data[index].staff.role">{{ data[index].staff.role }}</vs-td>
          <vs-td :data="data[index].staff.salary">{{ data[index].staff.salary }}</vs-td>
          <vs-td :data="data[index].staff.payDay">{{ formatDate(data[index].staff.payDay) }}</vs-td>
          <vs-td :data="data[index].totalDeduction">{{ data[index].totalDeduction }}</vs-td>
          <vs-td :data="data[index].netPay">{{ data[index].netPay }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { viewPayroll } from '@/api/payrolls'
import { downloadPayroll } from '@/api/table'

export default {
  data() {
    return {
      payrolls: [],
      showDetails: false,
      selected: {},
      activeEditPrompt: false,
      downloading: false
    }
  },
  mounted() {
    this.getPayroll()
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return `${d.getDate()}-${d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getFullYear()}`
    },
    async getPayroll() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewPayroll()
        if (data.status) this.payrolls = data.payrolls
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    },
    async download () {
      this.downloading = true
      try {
        await downloadPayroll()
        this.downloading = false
      } catch (error) {
        this.downloading = false
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to download'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
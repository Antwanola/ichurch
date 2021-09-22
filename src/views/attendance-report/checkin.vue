<template>
  <vx-card id="main">
    <p>Select a date to display attendance for that day</p>
    <vs-row class="mt-4">
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Select Date"
          type="date"
          v-model="date"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="3">
        <vs-button class="mt-5" @click="submit">Submit</vs-button>
      </vs-col>
    </vs-row>
    <!-- attendance table -->
    <vs-table :data="checkIns" v-if="checkIns.length" stripe max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Check-In Time</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].name">{{ data[index].name }}</vs-td>
          <vs-td :data="data[index].checkInTime">{{ data[index].checkInTime }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { checkIn } from '@/api/attendance'

export default {
  data() {
    return {
      date: '',
      checkIns: []
    }
  },
  methods: {
    async submit () {
      this.$vs.loading({
        container: '#main',
        scale: 0.6
      })
      // validate date input
      const validDatePattern = /^(\d{4})([/-])(\d{1,2})\2(\d{1,2})$/
      if (!validDatePattern.test(this.date)) {
        return this.$vs.notify({
          title: 'Notification',
          text: 'Please enter valid date',
          color: 'warning'
        })
      }
      try {
        const { data } = await checkIn(this.date)
        this.checkIns = data.checkIns
        this.$vs.loading.close('#main > .con-vs-loading')
        if (!this.checkIns.length) {
          this.$vs.notify({
            title: 'Notification',
            text: 'No check-ins found',
            color: 'warning'
          })
        }
      } catch (error) {
        this.$vs.notify({
          title: 'Error',
          text: error.response ? error.response.data.message : error.message,
          color: 'danger'
        })
        this.$vs.loading.close('#main > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
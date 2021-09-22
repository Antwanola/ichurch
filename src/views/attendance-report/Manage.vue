<template>
  <vx-card>
    <vs-table stripe :data="reports" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Event</vs-th>
        <vs-th>Date of Event</vs-th>
        <vs-th>Male (Total)</vs-th>
        <vs-th>Female (Total)</vs-th>
        <vs-th>Children (Total)</vs-th>
        <vs-th>Converts (Total)</vs-th>
        <vs-th>First Timers (Total)</vs-th>
        <vs-th>Minister</vs-th>
        <vs-th>Sermon Title</vs-th>
        <vs-th>Bible Text</vs-th>
        <vs-th>Extra Information</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].eventType">{{ data[index].eventType }}</vs-td>
          <vs-td :data="data[index].date">{{ data[index].date }}</vs-td>
          <vs-td :data="data[index].numberOfMales">{{ data[index].numberOfMales }}</vs-td>
          <vs-td :data="data[index].numberOfFemales">{{ data[index].numberOfFemales }}</vs-td>
          <vs-td :data="data[index].numberOfChildren">{{ data[index].numberOfChildren }}</vs-td>
          <vs-td :data="data[index].numberOfConverts">{{ data[index].numberOfConverts }}</vs-td>
          <vs-td :data="data[index].numberOfFirstTimers">{{ data[index].numberOfFirstTimers }}</vs-td>
          <vs-td :data="data[index].nameOfMinister">{{ data[index].nameOfMinister }}</vs-td>
          <vs-td :data="data[index].sermonTopic">{{ data[index].sermonTopic }}</vs-td>
          <vs-td :data="data[index].biblePassages">{{ data[index].biblePassages }}</vs-td>
          <vs-td :data="data[index].moreInformation">{{ data[index].moreInformation }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { viewAttendance } from '@/api/attendance'

export default {
  data() {
    return {
      reports: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false
    }
  },
  mounted () {
    this.fetchAttendance()
  },
  methods: {
    async fetchAttendance() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewAttendance()
        if (data.status) this.reports = data.reports
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
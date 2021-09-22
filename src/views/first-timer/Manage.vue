<template>
  <vx-card>
    <vs-table stripe :data="firstTimers" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Fullname</vs-th>
        <vs-th>Phone</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Date</vs-th>
        <vs-th>Time</vs-th>
        <vs-th>Address</vs-th>
        <vs-th>Occupation</vs-th>
        <vs-th>Event</vs-th>
        <vs-th>Preferred Visiting Day & Time</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].fullname">{{ data[index].fullname }}</vs-td>
          <vs-td :data="data[index].phoneNumber">{{ data[index].phoneNumber }}</vs-td>
          <vs-td :data="data[index].email">{{ data[index].email }}</vs-td>
          <vs-td :data="data[index].date">{{ data[index].date }}</vs-td>
          <vs-td :data="data[index].time">{{ data[index].time }}</vs-td>
          <vs-td :data="data[index].address">{{ data[index].address }}</vs-td>
          <vs-td :data="data[index].occupation">{{ data[index].occupation }}</vs-td>
          <vs-td :data="data[index].event">{{ data[index].event }}</vs-td>
          <vs-td
            :data="data[index].visitingDay"
          >{{ data[index].visitingDay }} {{ data[index].visitingTime }}</vs-td>
          <vs-td>
            <div class="flex justify-around my-5">
              <!-- view action -->
              <vs-button
                radius
                class="m-2"
                color="primary"
                type="border"
                icon="visibility"
                size="small"
                @click="viewDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="User Details" :active.sync="showDetails">
                <view-first-timer :data="selectedPerson" />
              </vs-popup>
              <!-- edit action -->
              <vs-button
                radius
                class="m-2"
                color="warning"
                type="border"
                icon="edit"
                size="small"
                @click="showEditPrompt(data[index])"
              ></vs-button>
              <vs-popup title="Edit Info" :active.sync="activeEditPrompt">
                <edit-first-timer :data="selectedPerson" @details-edited="close" />
              </vs-popup>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewFirstTimer from '@/components/first-timer/ViewFirstTimer.vue'
import EditFirstTimer from '@/components/first-timer/EditFirstTimer.vue'
import { viewFirstTimers, deleteFirstTimer, getSingleFirstTimer } from '@/api/first-timer'
import { downloadFirstTimers } from '@/api/table'

export default {
  components: {
    'view-first-timer': ViewFirstTimer,
    'edit-first-timer': EditFirstTimer
  },
  data() {
    return {
      firstTimers: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false,
      downloading: false
    }
  },
  mounted() {
    this.fetchFirstTimers()
  },
  methods: {
    async fetchFirstTimers() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewFirstTimers()
        if (data.status) this.firstTimers = data.firstTimers
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: error && error.response ? error.response.data.message : error.message
        })
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    viewDetails(data) {
      this.showDetails = true
      this.selectedPerson = data
    },
    async showEditPrompt(person) {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await getSingleFirstTimer(person._id)
        if (data.status) {
          this.selectedPerson = data.firstTimers
          this.selectedPerson._id = person._id
        }
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: error && error.response ? error.response.data.message : error.message
        })
        this.$vs.loading.close('#table > .con-vs-loading')
      }
      this.activeEditPrompt = true
    },
    async download () {
      this.downloading = true
      try {
        await downloadFirstTimers()
        this.downloading = false
      } catch (error) {
        this.downloading = false
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to download'
        })
      }
    },
    delNews(data) {
      this.selectedPerson = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        text: 'Are you sure you want to delete this person?',
        accept: this.del
      })
    },
    async del() {
      try {
        await deleteFirstTimer(this.selectedPerson._id)
        this.$vs.notify({
          color: 'success',
          title: 'Notification',
          text: 'Deleted successfully'
        })
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to delete'
        })
      }
      this.fetchFirstTimers()
    },
    close() {
      this.activeEditPrompt = false
      this.$vs.notify({
        color: 'success',
        title: 'Notification',
        text: 'Data updated Successfully'
      })
      this.fetchFirstTimers()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
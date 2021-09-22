<template>
  <vx-card>
    <vs-table stripe :data="followUps" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>S/N</vs-th>
        <vs-th>Assigned To</vs-th>
        <vs-th>Members</vs-th>
        <vs-th>First Timers</vs-th>
        <vs-th>Category</vs-th>
        <vs-th>Description</vs-th>
        <!-- <vs-th>Actions</vs-th> -->
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].description">{{ index + 1 }}</vs-td>
          <vs-td :data="data[index].assignedTo">
            <div
              v-for="(item, index) in data[index].assignedTo"
              :key="index"
            >{{ item.firstName }} {{ item.lastName }},</div>
          </vs-td>
          <vs-td :data="data[index].members">
            <div
              v-for="(item, index) in data[index].members"
              :key="index"
            >{{ item.firstName }} {{ item.lastName }},</div>
          </vs-td>
          <vs-td :data="data[index].firstTimers">
            <div
              v-for="(item, index) in data[index].firstTimers"
              :key="index"
            >{{ item.fullname }}</div>
          </vs-td>
          <vs-td :data="data[index].category">{{ data[index].category ? data[index].category.name : '' }}</vs-td>
          <vs-td :data="data[index].description">{{ data[index].description }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewFirstTimer from '@/components/first-timer/ViewFirstTimer.vue'
import EditFirstTimer from '@/components/first-timer/EditFirstTimer.vue'
import { allFollowUps } from '@/api/follow-up'

export default {
  components: {
    'view-first-timer': ViewFirstTimer,
    'edit-first-timer': EditFirstTimer
  },
  data() {
    return {
      followUps: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false
    }
  },
  mounted() {
    this.getFollowUps()
  },
  methods: {
    async getFollowUps() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await allFollowUps()
        console.log(data.followUps)
        this.followUps = data.followUps
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
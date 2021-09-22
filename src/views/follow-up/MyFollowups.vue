<template>
  <vx-card>
    <vs-table stripe :data="assignedFollowUps" max-items="10" pagination id="table">
      <template slot="header">
        <h3 class="mb-6">Assigned Follow Ups</h3>
      </template>
      <template slot="thead">
        <vs-th>S/N</vs-th>
        <vs-th>Assigned To</vs-th>
        <vs-th>Members</vs-th>
        <vs-th>Category</vs-th>
        <vs-th>Description</vs-th>
        <vs-th>Created On</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].index">{{ index + 1 }}</vs-td>
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
          <vs-td :data="data[index].category">{{ data[index].category.name }}</vs-td>
          <vs-td :data="data[index].description">{{ data[index].description }}</vs-td>
          <vs-td :data="data[index].createdAt">{{ formatDate(data[index].createdAt) }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { myFollowups } from '@/api/follow-up'

export default {
  data() {
    return {
      assignedFollowUps: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false
    }
  },
  mounted() {
    this.getFollowUps()
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    },
    async getFollowUps() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await myFollowups()
        this.assignedFollowUps = data.assignedFollowUps
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
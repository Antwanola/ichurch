<template>
  <vx-card>
    <vs-table search stripe :data="members" max-items="10" pagination id="main">
      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Admin</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].firstName">{{ data[index].firstName }}
            {{ data[index].lastName }}
          </vs-td>
          <vs-td :data="data[index].admin">
            <vs-switch v-model="data[index].admin" @click="makeAdmin($event, data[index]._id)">
              <span slot="on">Yes</span>
              <span slot="off">No</span>
            </vs-switch>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { viewMembers, makeAdmin } from '@/api/member'

export default {
  data() {
    return {
      members: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false
    }
  },
  mounted () {
    this.getMembers()
  },
  methods: {
    async getMembers() {
      this.$vs.loading({
        container: '#main',
        scale: 0.6
      })
      try {
        const { data } = await viewMembers()
        this.members = data.members
        this.$vs.loading.close('#main > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#main > .con-vs-loading')
      }
    },
    async makeAdmin(e, id) {
      await makeAdmin(id)
      this.getMembers()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <vx-card>
    <vs-table stripe :data="members" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Gender</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(group, index) in data" :key="index">
          <vs-td
            :data="data[index].firstName"
          >{{ data[index].firstName }} {{ data[index].lastName }}</vs-td>
          <vs-td :data="data[index].gender">{{ data[index].gender }}</vs-td>
          <vs-td :data="data[index].email">{{ data[index].email }}</vs-td>
          <vs-td>
            <div class="flex justify-between my-5">
              <vs-button
                class="m-2"
                color="primary"
                size="small"
                @click="createPassword(data[index])"
              >Confirm Member</vs-button>
              <!-- delete group action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delMember"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { createPassword } from '@/api/auth'
import { unconfirmedMembers, deleteMember } from '@/api/member'

export default {
  data() {
    return {
      members: [],
      selected: {},
    }
  },
  mounted() {
    this.fetchMembers()
  },
  methods: {
    async fetchMembers() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await unconfirmedMembers()
        if (data.status) this.members = data.members
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
    delMember(data) {
      this.selected = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        text: 'Are you sure you want to delete this member?',
        accept: this.del
      })
    },
    async createPassword(member) {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await createPassword(member._id)
        if (data.status) this.members = data.members
        this.fetchMembers()
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    },
    async del() {
      try {
        await deleteMember(this.selected._id)
        this.$vs.notify({
          color: 'success',
          title: 'Notification',
          text: 'Deleted successfully'
        })
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to delete member'
        })
      }
      this.fetchMembers()
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
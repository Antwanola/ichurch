<template>
  <vx-card>
    <vs-table stripe :data="emails" max-items="10" pagination id="table">
      <template slot="header">
        <vs-row>
          <vs-col vs-w="6">
            <!-- <h3 class="mb-6">Send Emails</h3> -->
          </vs-col>
          <vs-col vs-w="6" class="text-right">
            <router-link to="/communication/new-email">
              <vs-button class="m-2" color="primary" size="small">Send Email</vs-button>
            </router-link>
          </vs-col>
        </vs-row>
      </template>
      <template slot="thead">
        <vs-th>Sent To</vs-th>
        <vs-th>Groups</vs-th>
        <vs-th>Subject</vs-th>
        <vs-th>Sender</vs-th>
        <vs-th>Message</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].toMember">
            <p
              v-for="(item, index) in data[index].toMember"
              :key="index"
            >{{ item.firstName }} {{ item.lastName }}</p>
          </vs-td>
          <vs-td :data="data[index].toGroup">
            <p
              v-for="(item, index) in data[index].toGroup"
              :key="index"
            >{{ item.groupName }}</p>
          </vs-td>
          <vs-td :data="data[index].subject">{{ data[index].subject }}</vs-td>
          <vs-td :data="data[index].sentBy">{{ data[index].sentBy.firstName }} {{ data[index].sentBy.lastName }}</vs-td>
          <vs-td :data="data[index].message" v-html="data[index].message"></vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { sentEmails } from '@/api/communication'

export default {
  data() {
    return {
      emails: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false
    }
  },
  mounted () {
    this.getEmails()
  },
  methods: {
    async getEmails () {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await sentEmails()
        if (data.status) this.emails = data.emails
        console.log(this.emails)
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
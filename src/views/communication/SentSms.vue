<template>
  <vx-card>
    <vs-table stripe :data="sms" max-items="10" pagination id="table">
      <template slot="header">
        <vs-row>
          <vs-col vs-w="6">
            <!-- <h3 class="mb-6">Send SMS</h3> -->
          </vs-col>
          <vs-col vs-w="6" class="text-right">
            <router-link to="/communication/new-sms">
              <vs-button class="m-2" color="primary" size="small">Send SMS</vs-button>
            </router-link>
          </vs-col>
        </vs-row>
      </template>
      <template slot="thead">
        <vs-th>Members</vs-th>
        <vs-th>Groups</vs-th>
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
          <vs-td :data="data[index].sentBy">{{ data[index].sentBy.firstName }} {{ data[index].sentBy.lastName }}</vs-td>
          <vs-td :data="data[index].message">{{ data[index].message }}</vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { sentSms } from '@/api/communication'

export default {
  data() {
    return {
      sms: [],
      showDetails: false,
      selectedPerson: {},
      activeEditPrompt: false
    }
  },
  mounted () {
    this.getSms()
  },
  methods: {
    async getSms () {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await sentSms()
        if (data.status) this.sms = data.sms
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
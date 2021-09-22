<template>
  <vx-card id="main">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-3" label="Select Members" v-model="toMember" autocomplete multiple :disabled="allMembers">
          <vs-select-item
            :key="index"
            :value="member._id"
            :text="`${member.firstName} ${member.lastName}`"
            v-for="(member, index) in memberList"
          />
        </vs-select>
        <vs-checkbox v-model="allMembers" class="mb-4">All Members?</vs-checkbox>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Select Groups" v-model="toGroup" autocomplete multiple>
          <vs-select-item
            :key="index"
            :value="group._id"
            :text="group.groupName"
            v-for="(group, index) in groupList"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Sender ID"
          v-model="senderId"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Message"
          v-model="message"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button @click="sendSms" :disabled="sending">Send Sms</vs-button>
  </vx-card>
</template>

<script>
import { viewMembers } from '@/api/member'
import { viewGroups } from '@/api/group'
import { sendSms } from '@/api/communication'

export default {
  data() {
    return {
      member: [],
      memberList: [],
      groupList: [],
      allMembers: false,
      toMember: '',
      toGroup: [],
      senderId: '',
      message: '',
      sending: false
    }
  },
  mounted () {
    this.getMembers()
  },
  methods: {
    fileChange() {
      this.file = this.$refs.photo.filesx
    },
    removeFiles() {
      this.file = null
    },
    async getMembers() {
      this.$vs.loading({
        container: '#main',
        scale: 0.6
      })
      try {
        const { data } = await viewMembers()
        const groups = await viewGroups()
        this.memberList = data.members
        this.groupList = groups.data.groups
        this.$vs.loading.close('#main > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#main > .con-vs-loading')
      }
    },
    async sendSms() {
      this.sending = true
      if (this.allMembers) {
        let members = []
        for(let i = 0; i < this.memberList.length; i++) {
          members.push(this.memberList[i]._id)
        }
        this.toMember = members
      }
      let payload = {
        toMember: this.toMember,
        toGroup: this.toGroup,
        senderId: this.senderId,
        message: this.message
      }
      try {
        const { data } = await sendSms(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.sending = false
        this.$router.push('/communication/sms')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.sending = false
      }
    }
  }
}
</script>

<style lang="scss">

</style>
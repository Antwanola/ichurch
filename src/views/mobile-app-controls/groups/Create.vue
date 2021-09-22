<template>
  <vx-card id="group">
    <form @submit.prevent="createGroup">
      <vs-upload
        text="Add Group Photo"
        limit="1"
        accept=".jpg, .png"
        ref="photo"
        @change="fileChange"
      />
      <vs-row>
        <vs-col vs-w="6" vs-sm="12">
          <vs-input
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Group Name"
            v-model="groupName"
            class="w-4/5 mb-6"
          />
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-textarea
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label="Group Description"
            v-model="description"
            class="w-4/5 mb-6"
          />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="6" vs-sm="12">
          <vs-select
            class="w-4/5 mb-6"
            label="Group Leader(s)"
            v-model="groupLeader"
            autocomplete
            multiple
          >
            <vs-select-item
              :key="index"
              :value="member._id"
              :text="`${member.firstName} ${member.lastName}`"
              v-for="(member, index) in memberList"
            />
          </vs-select>
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-select
            class="w-4/5 mb-6"
            label="Add Member(s)"
            v-model="members"
            autocomplete
            multiple
          >
            <vs-select-item
              :key="index"
              :value="member._id"
              :text="`${member.firstName} ${member.lastName}`"
              v-for="(member, index) in memberList"
            />
          </vs-select>
        </vs-col>
      </vs-row>
      <vs-button @click="createGroup">Create Group</vs-button>
    </form>
  </vx-card>
</template>

<script>
import { viewMembers } from '@/api/member'
import { createGroup } from '@/api/group'

export default {
  data() {
    return {
      photo: null,
      groupName: '',
      groupLeader: [],
      memberList: [],
      members: [],
      description: '',
      creating: false,
      error: null
    }
  },
  async mounted() {
    this.$vs.loading({
      container: '#group',
      scale: 0.6
    })
    try {
      const { data } = await viewMembers()
      this.memberList = data.members
      this.$vs.loading.close('#group > .con-vs-loading')
    } catch (error) {
      this.$vs.loading.close('#group > .con-vs-loading')
      const err = error.response.data.message
      this.$vs.notify({
        color: 'danger',
        title: 'Notification',
        text: err || error.message
      })
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async createGroup() {
      let formData = new FormData()
      if (this.photo) {
        formData.append('photo', this.photo)
      }
      formData.append('groupName', this.groupName)
      formData.append('groupDescription', this.description)
      formData.append('groupLeader', this.groupLeader.toString())
      formData.append('members', this.members.toString())

      try {
        const { data } = await createGroup(formData)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.$router.push('/groups/manage')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <div id="group">
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Group Name"
      v-model="editDetails.groupName"
      class="w-4/5 mb-6"
    />
    <vs-textarea
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label="Group Description"
      v-model="editDetails.groupDescription"
      class="w-4/5 mb-6"
    />
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
    <vs-select class="w-4/5 mb-6" label="Add Member(s)" v-model="members" autocomplete multiple>
      <vs-select-item
        :key="index"
        :value="member._id"
        :text="`${member.firstName} ${member.lastName}`"
        v-for="(member, index) in memberList"
      />
    </vs-select>
    <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
    <vs-button color="primary" @click="edit" :disabled="loading">Edit Group</vs-button>
  </div>
</template>

<script>
import { viewMembers } from '@/api/member'
import { editGroup } from '@/api/group'

export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      editDetails: this.data,
      error: null,
      loading: false,
      memberList: [],
      groupLeader: [],
      members: []
    }
  },
  watch: {
    data(newValue) {
      this.editDetails = newValue
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
    }
  },
  methods: {
    async edit() {
      this.error = null
      this.loading = true
      let formData = new FormData()
      formData.append('photo', this.editDetails.photo)
      formData.append('groupName', this.editDetails.groupName)
      formData.append('groupDescription', this.editDetails.groupDescription)
      formData.append('groupLeader', this.groupLeader.toString())
      formData.append('members', this.members.toString())

      try {
        const { data } = await editGroup(formData, this.editDetails._id)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.loading = false
        this.$emit('group-updated')
      } catch (error) {
        this.error = error.response.data.message
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
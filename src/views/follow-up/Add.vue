<template>
  <vx-card id="group">
    <form @submit.prevent="createGroup">
      <vs-row>
        <vs-col vs-w="6" vs-sm="12">
          <vs-select class="w-4/5 mb-6" label="Members" v-model="members" autocomplete multiple>
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
            label="Assigned To"
            v-model="assignedTo"
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
      <vs-row>
        <vs-col vs-w="6" vs-sm="12">
          <vs-select class="w-4/5 mb-6" label="Category" v-model="category" autocomplete>
            <vs-select-item
              :key="index"
              :value="category._id"
              :text="`${category.name} (${category.days})`"
              v-for="(category, index) in categoryList"
            />
          </vs-select>
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-select class="w-4/5 mb-6" label="First Timers" v-model="firstTimers" autocomplete multiple>
            <vs-select-item
              :key="index"
              :value="firstTimer._id"
              :text="firstTimer.fullname"
              v-for="(firstTimer, index) in firstTimersList"
            />
          </vs-select>
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-textarea
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label="Description"
            v-model="description"
            class="w-4/5 mb-6"
          />
        </vs-col>
      </vs-row>
      <vs-button @click="addFollowUp" :disabled="adding">Add Follow Up</vs-button>
    </form>
  </vx-card>
</template>

<script>
import { viewMembers } from '@/api/member'
import { viewFirstTimers } from '@/api/first-timer'
import { addFollowUp, getFollowUpsCategories } from '@/api/follow-up'

export default {
  data() {
    return {
      user: this.$store.state.AppActiveUser,
      assignedTo: [],
      memberList: [],
      categoryList: [],
      members: [],
      firstTimersList: [],
      firstTimers: [],
      description: '',
      category: '',
      adding: false,
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
      const followupCats = await getFollowUpsCategories()
      const firstTimers = await viewFirstTimers()
      this.categoryList = followupCats.data.categories
      this.firstTimersList = firstTimers.data.firstTimers
      this.memberList = data.members.filter(item => item._id !== this.user.uid)
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
    async addFollowUp() {
      this.adding = true
      const payload = {
        category: this.category,
        description: this.description,
        assignedTo: this.assignedTo,
        members: this.members,
        firstTimers: this.firstTimers
      }

      try {
        const { data } = await addFollowUp(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/follow-up/manage')
      } catch (error) {
        this.adding = false
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
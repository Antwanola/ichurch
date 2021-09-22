<template>
  <vx-card>
    <vs-table stripe :data="groups" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Photo</vs-th>
        <vs-th>Name</vs-th>
        <vs-th>Leader</vs-th>
        <vs-th>Total Members</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(group, index) in data" :key="index">
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="30" height="30" />
          </vs-td>
          <vs-td :data="data[index].groupName">{{ data[index].groupName }}</vs-td>
          <vs-td :data="data[index].groupLeader">
            <p>{{ data[index].groupLeader.firstName }} {{ data[index].groupLeader.lastName }}</p>
          </vs-td>
          <vs-td :data="data[index].totalMembers">{{ data[index].totalMembers }}</vs-td>
          <vs-td>
            <div class="flex justify-between my-5">
              <!-- view group action -->
              <vs-button
                radius
                class="m-2"
                color="primary"
                type="border"
                icon="visibility"
                size="small"
              ></vs-button>
              <!-- <vs-popup class="holamundo" title="Group Details" :active.sync="showDetails">
                <view-group :data="selectedGroup" />
              </vs-popup>-->
              <!-- edit group action -->
              <vs-button radius class="m-2" color="warning" type="border" icon="edit" size="small"></vs-button>
              <!-- <vs-popup title="Edit Group" :active.sync="activeEditPrompt">
                <edit-group :data="selectedGroup" @group-updated="closeEdit" />
              </vs-popup>-->
              <!-- delete group action -->
              <!-- <vs-button radius class="m-2" color="danger" type="border" icon="delete" size="small"></vs-button> -->
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewGroup from '@/components/mobile-app-controls/group/ViewGroup.vue'
import EditGroup from '@/components/mobile-app-controls/group/EditGroup.vue'
import { viewGroups } from '@/api/group'

export default {
  components: {
    'view-group': ViewGroup,
    'edit-group': EditGroup
  },
  data() {
    return {
      groups: [],
      showDetails: false,
      selectedGroup: {},
      activeEditPrompt: false
    }
  },
  mounted() {
    this.fetchGroups()
  },
  methods: {
    async fetchGroups() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewGroups()
        if (data.status) this.groups = data.groups
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
        const err = error.response.data.message
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: err || error.message
        })
      }
    },
    viewGroupDetails(group) {
      this.showDetails = true
      this.selectedGroup = group
    },
    showEditPrompt(group) {
      this.activeEditPrompt = true
      this.selectedGroup = group
    },
    closeEdit() {
      this.activeEditPrompt = false
      this.fetchGroups()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
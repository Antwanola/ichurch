<template>
  <vx-card>
    <!-- <vs-button @click="print">Print</vs-button> -->
    <vs-table stripe :data="members" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Photo</vs-th>
        <vs-th>Name</vs-th>
        <vs-th>Home Phone</vs-th>
        <vs-th>Gender</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Address</vs-th>
        <vs-th>Action</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(group, index) in data" :key="index">
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="30" height="30" />
          </vs-td>
          <vs-td
            :data="data[index].firstName"
          >{{ data[index].firstName }} {{ data[index].lastName }}</vs-td>
          <vs-td :data="data[index].homePhone">{{ data[index].homePhone }}</vs-td>
          <vs-td :data="data[index].gender">{{ data[index].gender }}</vs-td>
          <vs-td :data="data[index].email">{{ data[index].email }}</vs-td>
          <vs-td :data="data[index].address">{{ data[index].address }}</vs-td>
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
                @click="viewGroupDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="Member Details" :active.sync="showDetails">
                <view-member :data="selected" />
              </vs-popup>
              <!-- edit group action -->
              <vs-button
                radius
                class="m-2"
                color="warning"
                type="border"
                icon="edit"
                size="small"
                @click="showEditPrompt(data[index])"
              ></vs-button>
              <vs-popup title="Edit Member" :active.sync="activeEditPrompt">
                <edit-member :data="selected" @member-updated="close" />
              </vs-popup>
              <!-- delete group action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delMember(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewMember from '@/components/member/ViewMember.vue'
import EditMember from '@/components/member/EditMember.vue'
import { viewMembers, viewMember, deleteMember } from '@/api/member'
import { downloadMembers } from '@/api/table'

export default {
  components: {
    'view-member': ViewMember,
    'edit-member': EditMember
  },
  data() {
    return {
      members: [],
      showDetails: false,
      selected: {},
      activeEditPrompt: false,
      downloading: false
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
        const { data } = await viewMembers()
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
    async viewMember(id) {
      this.$vs.loading({
        container: 'body',
        scale: 0.6
      })
      try {
        const { data } = await viewMember(id)
        this.selected = data.member
        this.$vs.loading.close('body > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('body > .con-vs-loading')
      }
    },
    async download () {
      this.downloading = true
      try {
        await downloadMembers()
        this.downloading = false
      } catch (error) {
        this.downloading = false
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to download'
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
    viewGroupDetails(group) {
      this.showDetails = true
      this.viewMember(group._id)
    },
    showEditPrompt(group) {
      this.activeEditPrompt = true
      this.viewMember(group._id)
    },
    close() {
      this.activeEditPrompt = false
      this.fetchMembers()
    }
  }
}
</script>

<style lang="scss" scoped>
#preview {
  display: table;
  border: 1px solid black;
}
</style>
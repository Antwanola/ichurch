<template>
  <vx-card>
    <vs-table stripe :data="staff" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Role</vs-th>
        <vs-th>Salary</vs-th>
        <vs-th>Payment Method</vs-th>
        <vs-th>Bank Name</vs-th>
        <vs-th>Account Number</vs-th>
        <vs-th>Due Date</vs-th>
        <vs-th>Action</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(group, index) in data" :key="index">
          <vs-td :data="data[index].name">{{ data[index].name }}</vs-td>
          <vs-td :data="data[index].role">{{ data[index].role }}</vs-td>
          <vs-td :data="data[index].salary">{{ data[index].salary }}</vs-td>
          <vs-td :data="data[index].paymentMethod">{{ data[index].paymentMethod }}</vs-td>
          <vs-td :data="data[index].bankName">{{ data[index].bankName }}</vs-td>
          <vs-td :data="data[index].accountNumber">{{ data[index].accountNumber }}</vs-td>
          <vs-td :data="data[index].payDay">{{ formatDob(data[index].payDay) }}</vs-td>
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
                @click="viewStaffDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="Member Details" :active.sync="showDetails">
                <view-staff :data="selected" />
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
                <edit-staff :data="selected" @member-updated="close" />
              </vs-popup>
              <!-- delete group action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delStaff(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewStaff from '@/components/staff/ViewStaff.vue'
import EditStaff from '@/components/staff/EditStaff.vue'
import { allStaff, viewStaff, deleteStaff } from '@/api/staff'

export default {
  components: {
    'view-staff': ViewStaff,
    'edit-staff': EditStaff
  },
  data() {
    return {
      staff: [],
      showDetails: false,
      selected: {},
      activeEditPrompt: false
    }
  },
  mounted() {
    this.getStaff()
  },
  methods: {
    formatDob(dob) {
      const d = new Date(dob)
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return `${d.getDay()} ${months[d.getMonth()]}, ${d.getFullYear()}`
    },
    async getStaff() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await allStaff()
        if (data.status) this.staff = data.staffs
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
    async viewStaff(id) {
      this.$vs.loading({
        container: 'body',
        scale: 0.6
      })
      try {
        const { data } = await viewStaff(id)
        this.selected = data.staff
        this.$vs.loading.close('body > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('body > .con-vs-loading')
      }
    },
    delStaff(data) {
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
        await deleteStaff(this.selected._id)
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
      this.getStaff()
    },
    viewStaffDetails(staff) {
      this.showDetails = true
      this.viewStaff(staff._id)
    },
    showEditPrompt(staff) {
      this.activeEditPrompt = true
      this.viewStaff(staff._id)
    },
    close() {
      this.activeEditPrompt = false
      this.getStaff()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
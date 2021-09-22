<template>
  <vx-card>
    <vs-table stripe :data="pastors" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Fullname</vs-th>
        <vs-th>Photo</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Phone</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(sermon, index) in data" :key="index">
          <vs-td :data="data[index].fullname">{{ data[index].fullname }}</vs-td>
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="30" height="30" />
          </vs-td>
          <vs-td :data="data[index].email">{{ data[index].email }}</vs-td>
          <vs-td :data="data[index].phoneNumber">{{ data[index].phoneNumber }}</vs-td>
          <vs-td>
            <div class="flex justify-around my-5">
              <!-- view action -->
              <vs-button
                radius
                class="m-2"
                color="primary"
                type="border"
                icon="visibility"
                size="small"
                @click="viewPastorDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="Pastor Details" :active.sync="showDetails">
                <view-pastor :data="selectedPastor" />
              </vs-popup>
              <!-- edit action -->
              <vs-button
                radius
                class="m-2"
                color="warning"
                type="border"
                icon="edit"
                size="small"
                @click="showEditPrompt(data[index])"
              ></vs-button>
              <vs-popup title="Edit Pastor" :active.sync="activeEditPrompt">
                <edit-pastor :data="selectedPastor" @pastor-edited="close" />
              </vs-popup>
              <!-- delete action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delPastor(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewPastor from '@/components/mobile-app-controls/pastors/ViewPastor.vue'
import EditPastor from '@/components/mobile-app-controls/pastors/EditPastor.vue'
import { viewPastors, getPastor, deletePastor } from '@/api/pastors'

export default {
  components: {
    'view-pastor': ViewPastor,
    'edit-pastor': EditPastor
  },
  data() {
    return {
      pastors: [],
      selectedPastor: {},
      showDetails: false,
      activeEditPrompt: false
    }
  },
  mounted() {
    this.fetchPastors()
  },
  methods: {
    async fetchPastors() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewPastors()
        if (data.status) this.pastors = data.pastors
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    async getPastor(id) {
      this.$vs.loading({
        container: 'body',
        scale: 0.6
      })
      try {
        const { data } = await getPastor(id)
        this.selectedPastor = data.pastor
        this.$vs.loading.close('body > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('body > .con-vs-loading')
      }
    },
    delPastor(data) {
      this.selectedPastor = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        text: 'Are you sure you want to delete this pastor?',
        accept: this.del
      })
    },
    async del() {
      try {
        await deletePastor(this.selectedPastor._id)
        this.$vs.notify({
          color: 'success',
          title: 'Notification',
          text: 'Deleted successfully'
        })
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to delete news'
        })
      }
      this.fetchPastors()
    },
    viewPastorDetails(data) {
      this.showDetails = true
      this.getPastor(data._id)
    },
    showEditPrompt(data) {
      this.activeEditPrompt = true
      this.getPastor(data._id)
    },
    close() {
      this.activeEditPrompt = false
      this.$vs.notify({
        color: 'success',
        title: 'Notification',
        text: 'Pastor Edited Successfully'
      })
      this.fetchPastors()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
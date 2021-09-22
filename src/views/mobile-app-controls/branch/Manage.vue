<template>
  <vx-card>
    <!-- <vs-button @click="viewMap = !viewMap" color="primary" class="mb-4">
      <span v-if="!viewMap">View Map</span>
      <span v-else>Hide Map</span>
    </vs-button> -->
    <div v-if="viewMap" class="mb-4">
      <GmapMap
        :center="{lat:10, lng:10}"
        :zoom="4"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
      >
        <GmapMarker
          :key="index"
          v-for="(loc, index) in locations"
          :position="loc.pos"
          :title="loc.name"
          :clickable="true"
          :draggable="false"
          @click="openInfoWindowTemplate(loc)"
        />

        <GmapInfoWindow
          :options="{ minWidth: 300 }"
          :position="infoWindow.position"
          :opened="infoWindow.open"
          @closeclick="infoWindow.open=false"
        >
          <div v-html="infoWindow.template"></div>
        </GmapInfoWindow>
      </GmapMap>
    </div>
    <vs-table stripe :data="branches" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Address</vs-th>
        <vs-th>State</vs-th>
        <vs-th>Area</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(br, index) in data" :key="index">
          <vs-td :data="data[index].name">{{ data[index].name }}</vs-td>
          <vs-td :data="data[index].address">{{ data[index].address }}</vs-td>
          <vs-td :data="data[index].state">{{ data[index].state }}</vs-td>
          <vs-td :data="data[index].area">{{ data[index].area }}</vs-td>
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
                @click="viewBranchDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="Branch Details" :active.sync="showDetails">
                <view-branch :data="selected" />
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
              <vs-popup title="Edit Branch" :active.sync="activeEditPrompt">
                <edit-branch :data="selected" @branch-updated="close" />
              </vs-popup>
              <!-- delete action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delBranch(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewBranch from '@/components/mobile-app-controls/branch/ViewBranch.vue'
import EditBranch from '@/components/mobile-app-controls/branch/EditBranch.vue'
import { viewBranches, getBranch, deleteBranch } from '@/api/branch'

export default {
  components: {
    'view-branch': ViewBranch,
    'edit-branch': EditBranch
  },
  data() {
    return {
      showDetails: false,
      activeEditPrompt: false,
      branches: [],
      locations: [],
      selected: {},
      infoWindow: {
        position: {lat: 0, lng: 0},
        open: false,
        template: ''
      },
      viewMap: false
    }
  },
  mounted() {
    this.fetchBranches()
  },
  methods: {
    openInfoWindowTemplate (location) {
      this.infoWindow.template = location.name
      this.infoWindow.position = location.pos
      this.infoWindow.open = true
    },
    async fetchBranches() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewBranches()
        this.branches = data.branches
        for (let i = 0; i < data.branches.length; i++) {
          this.locations.push({
            name: data.branches[i].name,
            pos: {
              lat: data.branches[i].coordinates.latitude,
              lng: data.branches[i].coordinates.longitude
            }
          })
        }
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    async getBranch(id) {
      this.$vs.loading({
        container: 'body',
        scale: 0.6
      })
      try {
        const { data } = await getBranch(id)
        this.selected = data.branch
        this.$vs.loading.close('body > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('body > .con-vs-loading')
      }
    },
    delBranch(data) {
      this.selected = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        text: 'Are you sure you want to delete this branch?',
        accept: this.del
      })
    },
    async del() {
      try {
        await deleteBranch(this.selected._id)
        this.$vs.notify({
          color: 'success',
          title: 'Notification',
          text: 'Deleted successfully'
        })
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to delete branch'
        })
      }
      this.fetchBranches()
    },
    viewBranchDetails(data) {
      this.showDetails = true
      this.getBranch(data._id)
    },
    showEditPrompt(data) {
      this.activeEditPrompt = true
      this.selected = data
    },
    close() {
      this.activeEditPrompt = false
      this.fetchBranches()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
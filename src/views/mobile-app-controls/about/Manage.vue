<template>
  <vx-card>
    <vs-table stripe :data="about" max-items="10" pagination id="table">
      <template slot="header">
        <vs-row>
          <vs-col vs-w="6">
          </vs-col>
          <vs-col vs-w="6" class="text-right" v-if="about.length < 1">
            <router-link to="/about/create">
              <vs-button class="m-2" color="primary" size="small">Add New</vs-button>
            </router-link>
          </vs-col>
        </vs-row>
      </template>
      <template slot="thead">
        <vs-th>Photo</vs-th>
        <vs-th>Motto</vs-th>
        <vs-th>Description</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(ab, index) in data" :key="index">
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="30" height="30" />
          </vs-td>
          <vs-td :data="data[index].motto">{{ data[index].motto }}</vs-td>
          <vs-td :data="data[index].description">{{ data[index].description }}</vs-td>
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
                @click="viewAboutDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="About Details" :active.sync="showDetails">
                <view-about :data="selected" />
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
              <vs-popup title="Edit About" :active.sync="activeEditPrompt">
                <edit-about :data="selected" @about-updated="close" />
              </vs-popup>
              <!-- delete action -->
              <vs-button radius class="m-2" color="danger" type="border" icon="delete" size="small"></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewAbout from '@/components/mobile-app-controls/about/ViewAbout.vue'
import EditAbout from '@/components/mobile-app-controls/about/EditAbout.vue'
import { viewAbout } from '@/api/about'

export default {
  components: {
    'view-about': ViewAbout,
    'edit-about': EditAbout
  },
  data() {
    return {
      showDetails: false,
      activeEditPrompt: false,
      about: [],
      selected: {}
    }
  },
  mounted() {
    this.fetchAbout()
  },
  methods: {
    async fetchAbout() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewAbout()
        this.about = data.about
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    viewAboutDetails(data) {
      this.showDetails = true
      this.selected = data
    },
    showEditPrompt(data) {
      this.activeEditPrompt = true
      this.selected = data
    },
    close() {
      this.activeEditPrompt = false
      this.$vs.notify({
        color: 'success',
        title: 'Notification',
        text: 'About Updated Successfully'
      })
      this.fetchAbout()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
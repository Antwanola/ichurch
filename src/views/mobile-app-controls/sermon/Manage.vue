<template>
  <vx-card>
    <vs-table stripe :data="sermons" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Preacher</vs-th>
        <vs-th>Title</vs-th>
        <vs-th>Audio URL</vs-th>
        <vs-th>Youtube URL</vs-th>
        <vs-th>Photo</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(sermon, index) in data" :key="index">
          <vs-td :data="data[index].preacher">{{ data[index].preacher }}</vs-td>
          <vs-td :data="data[index].title">{{ data[index].title }}</vs-td>
          <vs-td :data="data[index].audioURL">{{ data[index].audioUrl }}</vs-td>
          <vs-td :data="data[index].youtubeURL">{{ data[index].youtubeUrl }}</vs-td>
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="30" height="30" />
          </vs-td>
          <vs-td>
            <div class="flex justify-between my-5">
              <!-- view action -->
              <vs-button
                radius
                class="m-2"
                color="primary"
                type="border"
                icon="visibility"
                size="small"
                @click="viewSermonDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="Sermon Details" :active.sync="showDetails">
                <view-sermon :data="selectedSermon" />
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
              <vs-popup title="Edit Sermon" @close="close" :active.sync="activeEditPrompt">
                <edit-sermon :data="selectedSermon" @sermon-updated="close" ></edit-sermon>
              </vs-popup>
              <!-- delete action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delSermon(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewSermon from '@/components/mobile-app-controls/sermon/ViewSermon.vue'
import EditSermon from '@/components/mobile-app-controls/sermon/EditSermon.vue'
import { getSermons, getSingleSermon, deleteSermon } from '@/api/sermons'

export default {
  components: {
    'view-sermon': ViewSermon,
    'edit-sermon': EditSermon
  },
  data() {
    return {
      sermons: [],
      activeEditPrompt: false,
      selectedSermon: {},
      showDetails: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await getSermons()
        if (data.status) this.sermons = data.sermons
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    delSermon(data) {
      this.selectedSermon = data
      this.$vs.dialog({
        type: 'confirm',
        text: 'Are you sure you want to delete this sermon?',
        accept: this.del
      })
    },
    async del() {
      try {
        await deleteSermon(this.selectedSermon._id)
        this.fetchData()
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    async getSermon(id) {
      this.$vs.loading({
        container: 'body',
        scale: 0.6
      })
      try {
        const { data } = await getSingleSermon(id)
        this.selectedSermon = data.sermon
        this.$vs.loading.close('body > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('body > .con-vs-loading')
      }
    },
    showEditPrompt(sermon) {
      this.activeEditPrompt = true
      this.getSermon(sermon._id)
    },
    viewSermonDetails(sermon) {
      this.showDetails = true
      this.selectedSermon = {}
      this.getSermon(sermon._id)
    },
    close() {
      this.activeEditPrompt = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
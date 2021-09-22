<template>
  <vx-card>
    <vs-table stripe :data="devotionals" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Title</vs-th>
        <vs-th>Photo</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(dev, index) in data" :key="index">
          <vs-td :data="data[index].title">{{ data[index].title }}</vs-td>
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="48" height="48" />
          </vs-td>
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
                @click="viewDevotionalDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="Devotional Details" :active.sync="showDetails">
                <view-devotional :data="selected" />
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
              <vs-popup title="Edit Devotional" :active.sync="activeEditPrompt">
                <edit-devotional :data="selected" @devotional-updated="close" />
              </vs-popup>
              <!-- delete action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delDevotional(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewDevotional from '@/components/mobile-app-controls/devotional/ViewDevotional.vue'
import EditDevotional from '@/components/mobile-app-controls/devotional/EditDevotional.vue'
import {
  viewDevotionals,
  getDevotional,
  deleteDevotional
} from '@/api/devotional'

export default {
  components: {
    'view-devotional': ViewDevotional,
    'edit-devotional': EditDevotional
  },
  data() {
    return {
      showDetails: false,
      activeEditPrompt: false,
      devotionals: [],
      selected: {}
    }
  },
  mounted() {
    this.fetchDevotionals()
  },
  methods: {
    async fetchDevotionals() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewDevotionals()
        this.devotionals = data.allDevotionals
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    async getDevotional(id) {
      this.$vs.loading({
        container: 'body',
        scale: 0.6
      })
      try {
        const { data } = await getDevotional(id)
        this.selected = data.devotional
        this.$vs.loading.close('body > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('body > .con-vs-loading')
      }
    },
    delDevotional(data) {
      this.selected = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        text: 'Are you sure you want to delete this devotional?',
        accept: this.del
      })
    },
    async del() {
      try {
        await deleteDevotional(this.selected._id)
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
      this.fetchDevotionals()
    },
    viewDevotionalDetails(data) {
      this.showDetails = true
      this.getDevotional(data._id)
    },
    showEditPrompt(data) {
      this.activeEditPrompt = true
      this.getDevotional(data._id)
    },
    close() {
      this.activeEditPrompt = false
      this.fetchDevotionals()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
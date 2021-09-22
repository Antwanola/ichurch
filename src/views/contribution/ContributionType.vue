<template>
  <vx-card>
    <vs-table stripe :data="types" max-items="10" pagination id="table">
      <template slot="header">
        <vs-row>
          <vs-col vs-w="6">
            <!-- <h3 class="mb-6">Contribution Types</h3> -->
          </vs-col>
          <vs-col vs-w="6" class="text-right">
            <router-link to="/contribution/new-type">
              <vs-button class="m-2" color="primary" size="small">Add New Type</vs-button>
            </router-link>
          </vs-col>
        </vs-row>
      </template>
      <template slot="thead">
        <vs-th>S/N</vs-th>
        <vs-th>Type</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index]._id">{{ index + 1 }}</vs-td>
          <vs-td :data="data[index].type">{{ data[index].type }}</vs-td>
          <vs-td>
            <div class="flex justify-around my-5">
              <!-- edit action -->
              <vs-button
                radius
                class="m-2"
                color="warning"
                type="border"
                icon="edit"
                size="small"
              ></vs-button>
              <!-- <vs-popup title="Edit Info" :active.sync="activeEditPrompt">
                <edit-first-timer :data="selectedType" @details-edited="close" />
              </vs-popup> -->
              <!-- delete action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delType(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { allTypes, delType } from '@/api/contribution'

export default {
  data() {
    return {
      types: [],
      showDetails: false,
      selectedType: {},
      activeEditPrompt: false
    }
  },
  mounted () {
    this.getTypes()
  },
  methods: {
    async getTypes() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await allTypes()
        this.types = data.types
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#table > .con-vs-loading')
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message || error.message,
          color: 'warning'
        })
      }
    },
    delType(data) {
    this.selectedType = data
    this.$vs.dialog({
      type: 'confirm',
      color: 'danger',
      text: 'Are you sure you want to delete this type?',
      accept: this.del
    })
  },
  async del() {
    try {
      await delType(this.selectedType._id)
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
    this.getTypes()
  },
  },
  
}
</script>

<style lang="scss" scoped>
</style>
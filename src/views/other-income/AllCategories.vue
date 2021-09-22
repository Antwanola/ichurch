<template>
  <vx-card>
    <vs-table stripe :data="categories" max-items="10" pagination id="table">
      <template slot="header">
        <vs-row>
          <vs-col vs-w="6">
          </vs-col>
          <vs-col vs-w="6" class="text-right">
            <router-link to="/income/new-category">
              <vs-button class="m-2" color="primary" size="small">Add New Category</vs-button>
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
          <vs-td :data="data[index].name">{{ data[index].name }}</vs-td>
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
                @click="showEdit(data[index])"
              ></vs-button>
              <vs-popup title="Edit Category" :active.sync="activeEditPrompt">
                <edit-category :data="selectedType" @details-edited="close" />
              </vs-popup>
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
import { allCategories, delCategory } from '@/api/incomes'
import EditCategory from '@/components/income/EditCategory.vue'

export default {
  components: {
    EditCategory,
  },
  data() {
    return {
      categories: [],
      selectedType: {},
      activeEditPrompt: false
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await allCategories()
        this.categories = data.categories
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
        text: 'Are you sure you want to delete this category?',
        accept: this.del
      })
    },
    async del() {
      try {
        await delCategory(this.selectedType._id)
        this.$vs.notify({
          color: 'success',
          title: 'Notification',
          text: 'Deleted successfully'
        })
        this.getCategories()
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to delete news'
        })
      }
      this.getTypes()
    },
    showEdit(data) {
      this.selectedType = data
      this.activeEditPrompt = true
    },
    close() {
      this.activeEditPrompt = false
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
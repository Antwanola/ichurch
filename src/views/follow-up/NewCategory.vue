<template>
  <vx-card id="categories">
    <vs-row vs-type="flex" vs-justify="space-between">
      <vs-col vs-sm="12" vs-w="5">
        <vs-table stripe :data="categories" max-items="10" pagination id="table" class="mt-6">
          <template slot="header">
            <h3 class="mb-6">Follow up Categories</h3>
          </template>
          <template slot="thead">
            <vs-th>Name</vs-th>
            <vs-th>Days</vs-th>
            <vs-th>Notes</vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr v-for="(group, index) in data" :key="index">
              <vs-td :data="data[index].name">{{ data[index].name }}</vs-td>
              <vs-td :data="data[index].days">{{ data[index].days }}</vs-td>
              <vs-td :data="data[index].notes">{{ data[index].notes }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-col>
      <vs-col vs-sm="12" vs-w="5">
        <h3 class="mt-5">Create Follow Up Category</h3>
        <vs-row>
          <vs-col vs-sm="12" vs-w="6">
            <vs-input
              icon-no-border
              icon="icon icon-user"
              icon-pack="feather"
              label-placeholder="Name"
              v-model="name"
              class="w-4/5 mb-6"
            />
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-sm="12" vs-w="6">
            <vs-input
              icon-no-border
              icon="icon icon-user"
              icon-pack="feather"
              label-placeholder="Duration (In Days)"
              type="number"
              v-model="days"
              class="w-4/5 mb-6"
            />
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-sm="12" vs-w="6">
            <vs-input
              icon-no-border
              icon="icon icon-user"
              icon-pack="feather"
              label-placeholder="Additional Notes"
              v-model="notes"
              class="w-4/5 mb-6"
            />
          </vs-col>
        </vs-row>
        <vs-button class="mb-6" @click="addCategory" :disabled="adding">Add Category</vs-button>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import { addCategory, followupCategories } from '@/api/follow-up'

export default {
  data() {
    return {
      name: '',
      days: 0,
      notes: '',
      categories: [],
      adding: false,
      error: null
    }
  },
  async mounted() {
    try {
      const { data } = await followupCategories()
      this.categories = data.categories
    } catch (error) {
      this.$vs.notify({
        title: 'Warning',
        text: 'Failed to fetch follow up categories',
        color: 'warning'
      })
    }
  },
  methods: {
    async addCategory() {
      this.adding = true
      const payload = {
        name: this.name,
        days: this.days,
        notes: this.notes
      }
      try {
        await addCategory(payload)
        this.adding = false
        this.$router.push('/follow-up/manage')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.adding = false
      }
    }
  }
}
</script>

<style lang="scss">
</style>
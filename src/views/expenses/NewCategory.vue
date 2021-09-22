<template>
  <vx-card id="events">
    <vs-row vs-type="flex" vs-align="center" vs-justify="center" vs-w="12">
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Enter Category"
          v-model="name"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-button @click="addCategory" :disabled="adding">Add Category</vs-button>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import { addCategory } from '@/api/expenses'

export default {
  data() {
    return {
      name: '',
      adding: false
    }
  },
  methods: {
    async addCategory() {
      this.adding = true
      const payload = {
        name: this.name,
      }

      try {
        const { data } = await addCategory(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/expenses/categories')
      } catch (error) {
        this.adding = false
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
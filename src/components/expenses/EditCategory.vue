<template>
  <div>
    <vs-row vs-type="flex" vs-align="center" vs-justify="center" vs-w="12">
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Enter Category"
          v-model="editDetails.name"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-button @click="editCategory" :disabled="adding">Edit Category</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { editCategory } from '@/api/expenses'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      editDetails: this.data,
      adding: false
    }
  },
  watch: {
    data(newValue) {
      this.editDetails = newValue
    }
  },
  methods: {
    async editCategory() {
      this.adding = true
      const payload = {
        name: this.editDetails.name,
      }

      try {
        const { data } = await editCategory(payload, this.editDetails._id)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$emit('details-edited')
      } catch (error) {
        this.adding = false
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
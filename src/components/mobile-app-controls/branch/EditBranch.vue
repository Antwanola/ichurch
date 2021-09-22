<template>
  <div>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Name"
          v-model="branch.name"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Address"
          v-model="branch.address"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="State"
          v-model="branch.state"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Area"
          v-model="branch.area"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-alert v-if="error" color="warning" class="my-3">{{ error }}</vs-alert>
    <vs-button @click="edit" :disabled="adding">Edit Branch</vs-button>
  </div>
</template>

<script>
import { editBranch } from '@/api/branch'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      branch: {
        name: '',
        address: '',
        state: '',
        area: ''
      },
      adding: false,
      error: null
    }
  },
  watch: {
    data(newValue) {
      this.branch = newValue
    }
  },
  methods: {
    async edit() {
      this.adding = true
      this.error = null
      const formData = {
        name: this.branch.name,
        address: this.branch.address,
        state: this.branch.state,
        area: this.branch.area
      }

      try {
        const { data } = await editBranch(formData, this.branch._id)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$emit('branch-updated')
      } catch (error) {
        this.adding = false
        this.error = error.response.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
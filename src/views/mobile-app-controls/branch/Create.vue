<template>
  <vx-card>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Name"
          v-model="name"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Address"
          v-model="address"
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
          v-model="state"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Area"
          v-model="area"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-alert v-if="error" color="danger" class="my-3">{{ error }}</vs-alert>
    <vs-button @click="add" :disabled="adding">Add Branch</vs-button>
  </vx-card>
</template>

<script>
import { addBranch } from '@/api/branch'

export default {
  data() {
    return {
      name: '',
      address: '',
      state: '',
      area: '',
      adding: false,
      error: null
    }
  },
  methods: {
    async add() {
      this.adding = true
      this.error = null
      const formData = {
        name: this.name,
        address: this.address,
        state: this.state,
        area: this.area
      }

      try {
        const { data } = await addBranch(formData)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/branch/manage')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.adding = false
        this.error = error.response.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
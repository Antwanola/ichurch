<template>
  <vx-card id="events">
    <vs-row vs-type="flex" vs-align="center" vs-justify="center" vs-w="12">
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Type"
          v-model="type"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-button @click="addType" :disabled="adding">Add Type</vs-button>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import { addType } from '@/api/contribution'

export default {
  data() {
    return {
      type: '',
      adding: false
    }
  },
  methods: {
    async addType() {
      this.adding = true
      const payload = {
        type: this.type,
      }

      try {
        const { data } = await addType(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/contribution/types')
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
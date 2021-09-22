<template>
  <vx-card>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Message"
          v-model="message"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button @click="send" :disabled="sending">Send</vs-button>
  </vx-card>
</template>

<script>
import { sendNotification } from '@/api/settings'

export default {
  data() {
    return {
      message: '',
      sending: false
    }
  },
  methods: {
    async send () {
      this.sending = true
      try {
        const { data } = await sendNotification({ message: this.message })
        this.$vs.notify({
          title: 'Notification',
          text: data.message,
          color: 'success'
        })
        this.sending = false
        this.message = ''
      } catch (e) {
        this.sending = false
        this.$vs.notify({
          title: 'Notification',
          text: e.response ? e.response.data.message : e.message,
          color: 'warning'
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
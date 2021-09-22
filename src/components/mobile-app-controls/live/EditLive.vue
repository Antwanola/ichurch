<template>
  <div id="edit">
    <!-- <h3 class="mb-6">Edit Live Stream</h3> -->
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Audio Url"
          v-model="audioUrl"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Video Url"
          v-model="videoUrl"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button color="primary" @click="editStream" :disabled="loading">Edit Stream</vs-button>
    <vs-button color="dark" type="flat" @click="close">Cancel</vs-button>
  </div>
</template>

<script>
import { editStream, addStream } from '@/api/streams'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      audioUrl: '',
      videoUrl: '',
      loading: false
    }
  },
  mounted() {
    if (this.data && this.data._id) {
      this.audioUrl = this.data.audioUrl
      this.videoUrl = this.data.videoUrl
    }
  },
  methods: {
    async editStream() {
      this.loading = true
      this.$vs.loading({
        container: '#edit',
        scale: 0.6
      })
      try {
        if (this.data && this.data._id) {
          // we edit the stream
          const payload = {
            audioUrl: this.audioUrl,
            videoUrl: this.videoUrl
          }
          await editStream(payload, this.data._id)
          this.$emit('stream-changed')
        } else {
          const payload = {
            audioUrl: this.audioUrl,
            videoUrl: this.videoUrl
          }
          await addStream(payload)
          this.$emit('stream-changed')
          this.loading = false
        }
        this.$vs.loading.close('#edit > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#edit > .con-vs-loading')
        this.loading = false
        console.log(error)
        const err = error.response.data.message
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: err || error.message
        })
      }
    },
    close() {
      this.$emit('close-stream')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
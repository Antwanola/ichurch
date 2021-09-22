<template>
  <vx-card id="card">
    <div v-if="!editMode">
      <view-live :data="streams" @edit-stream="editStream" @new-stream="editStream" />
    </div>
    <div v-else>
      <edit-live :data="stream" @close-stream="closeStream" @stream-changed="streamChanged" />
    </div>
  </vx-card>
</template>

<script>
import { getStreams } from '@/api/streams'
import ViewLive from '@/components/mobile-app-controls/live/ViewLive.vue'
import EditLive from '@/components/mobile-app-controls/live/EditLive.vue'

export default {
  components: {
    'view-live': ViewLive,
    'edit-live': EditLive
  },
  data() {
    return {
      editMode: false,
      stream: null,
      streams: []
    }
  },
  mounted() {
    this.fetchStreams()
  },
  methods: {
    async fetchStreams() {
      this.$vs.loading({
        container: '#card',
        scale: 0.6
      })
      try {
        const { data } = await getStreams()
        this.$vs.loading.close('#card > .con-vs-loading')
        this.streams = data.streamUrl
      } catch (error) {
        this.$vs.loading.close('#card > .con-vs-loading')
        const err = error.response.data.message
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: err || error.message
        })
      }
    },
    streamChanged() {
      this.editMode = false
      this.stream = null
      this.fetchStreams()
    },
    editStream(stream) {
      this.stream = stream
      this.editMode = true
    },
    closeStream() {
      this.editMode = false
      this.stream = null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
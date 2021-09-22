<template>
  <div>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <!-- <h3 class="mb-6">Live Streams</h3> -->
      </vs-col>
      <vs-col vs-w="6" vs-sm="12" class="text-right" v-if="arr.length < 1">
        <vs-button color="primary" type="filled" @click="triggerNewStream">Add Stream</vs-button>
      </vs-col>
    </vs-row>

    <vs-list class="mb-6" v-for="(item, index) in data" :key="item._id">
      <vs-list-header :title="`Stream ${index + 1}`"></vs-list-header>
      <vs-list-item title="Audio Url" :subtitle="item.audioUrl"></vs-list-item>
      <vs-list-item title="Video Url" :subtitle="item.videoUrl" class="mb-6"></vs-list-item>
      <vs-button color="warning" type="flat" @click="triggerEdit(item)">Edit Stream</vs-button>
    </vs-list>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      arr: this.data
    }
  },
  methods: {
    triggerEdit(id) {
      this.$emit('edit-stream', id)
    },
    triggerNewStream() {
      this.$emit('new-stream')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
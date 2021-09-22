<template>
  <div id="view-sermon">
    <p>Title: {{ sermonDetails.title }}</p>
    <p>Preacher: {{ sermonDetails.preacher }}</p>
    <p>Audio URL: {{ sermonDetails.audioUrl }}</p>
    <p>YouTube URL: {{ sermonDetails.youtubeUrl }}</p>
    <p>Description: {{ sermonDetails.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    sermonDetails() {
      return this.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
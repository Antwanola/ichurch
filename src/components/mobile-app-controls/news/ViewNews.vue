<template>
  <div id="view-sermon">
    <img :src="data.photo" alt width="60" height="60" />
    <p>Title: {{ data.title }}</p>
    <p>Content: {{ data.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
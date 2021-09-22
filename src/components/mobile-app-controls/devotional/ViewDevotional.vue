<template>
  <div>
    <img :src="data.photo" alt width="60" height="60" />
    <p>
      <strong>Name:</strong>
      {{ data.title }}
    </p>
    <p>
      <strong>Content</strong>
      <br />
      {{ data.content }}
    </p>
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
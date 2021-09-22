<template>
  <div>
    <img :src="data.photo" alt width="60" height="60" />
    <p>Fullname: {{ data.fullname }}</p>
    <p>Designation: {{ data.designation }}</p>
    <p>Email: {{ data.email }}</p>
    <p>Phone Number: {{ data.phoneNumber }}</p>
    <p>Bio: {{ data.bio }}</p>
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
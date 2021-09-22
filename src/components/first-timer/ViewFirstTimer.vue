<template>
  <div id="view-sermon">
    <p><strong>Fullname:</strong> {{ data.firstName }} {{ data.lastName }}</p>
    <p><strong>Phone Number:</strong> {{ data.phoneNumber }}</p>
    <p><strong>Email:</strong> {{ data.email }}</p>
    <p><strong>Address:</strong> {{ data.address }}</p>
    <p><strong>Occupation:</strong> {{ data.occupation }}</p>
    <p><strong>Event:</strong> {{ data.event }}</p>
    <p><strong>Preferred Visiting Day:</strong> {{ data.visitingDay }}</p>
    <p><strong>Preferred Visiting Time:</strong> {{ data.visitingTime }}</p>
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
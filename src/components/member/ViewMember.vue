<template>
  <div>
    <img class="mb-5" :src="data.photo" alt width="90" height="90" />
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Name:</strong>
          {{ data.firstName }} {{ data.middleName ? data.middleName : "" }} {{ data.lastName }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Description:</strong>
          {{ data.description }}
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Gender:</strong>
          {{ data.gender }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Marital Status:</strong>
          {{ data.maritalStatus }}
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Work Phone:</strong>
          {{ data.workPhone }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Home Phone:</strong>
          {{ data.homePhone }}
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Date of Birth:</strong>
          {{ formatDob(data.dateOfBirth) }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Address:</strong>
          {{ data.address }}
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Occupation:</strong>
          {{ data.occupation }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <div v-if="data.groups && data.groups.length">
      Groups
      <p v-for="group in data.groups" :key="group">{{ group }}</p>
    </div>
      </vs-col>
    </vs-row>
    
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    formatDob(dob) {
      const d = new Date(dob)
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return `${d.getDay()} ${months[d.getMonth()]}, ${d.getFullYear()}`
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
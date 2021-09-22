<template>
  <div>
    <img class="mb-5" :src="data.photo" alt width="90" height="90" />
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Name:</strong>
          {{ data.name }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Role:</strong>
          {{ data.role }}
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Salary:</strong>
          {{ data.salary }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Payment Method:</strong>
          {{ data.paymentMethod }}
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Bank Name:</strong>
          {{ data.bankName }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Account Number:</strong>
          {{ data.accountNumber }}
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-5">
          <strong>Due Date:</strong>
          {{ formatDob(data.payDay) }}
        </p>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        
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
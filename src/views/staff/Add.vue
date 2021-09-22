<template>
  <vx-card id="member">
    <vs-upload text="Staff Photo" limit="1" accept=".jpg, .png" ref="photo" @change="fileChange" />
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Name"
          v-model="name"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Role"
          v-model="role"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Salary"
          v-model="salary"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Payment Method" v-model="paymentMethod" autocomplete>
          <vs-select-item
            :key="index"
            :value="payment.value"
            :text="payment.name"
            v-for="(payment, index) in paymentTypes"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Bank Name"
          v-model="bankName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Account Number"
          v-model="accountNumber"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Due Date"
          type="date"
          v-model="dueDate"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        
      </vs-col>
    </vs-row>
    <!-- <vs-alert v-if="error" color="danger" class="my-3">{{ error }}</vs-alert> -->
    <vs-button @click="addStaff" :disabled="adding">Add Staff</vs-button>
  </vx-card>
</template>

<script>
import { addStaff } from '@/api/staff'

export default {
  data() {
    return {
      photo: null,
      name: '',
      role: '',
      salary: '',
      paymentTypes: [
        {
          name: 'Online',
          value: 'online'
        },
        {
          name: 'Cash',
          value: 'cash'
        },
        {
          name: 'Cheque',
          value: 'cheque'
        },
        {
          name: 'Transfer',
          value: 'transfer'
        }
      ],
      paymentMethod: '',
      bankName: '',
      accountNumber: '',
      dueDate: '',
      adding: false
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async addStaff() {
      this.adding = true
      let formData = new FormData()
      formData.append('photo', this.photo || ' ')
      formData.append('name', this.name)
      formData.append('role', this.role)
      formData.append('salary', this.salary)
      formData.append('paymentMethod', this.paymentMethod)
      formData.append('payDay', this.dueDate)
      formData.append('bankName', this.bankName)
      formData.append('accountNumber', this.accountNumber)

      try {
        const { data } = await addStaff(formData)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/staff/manage')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.adding = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
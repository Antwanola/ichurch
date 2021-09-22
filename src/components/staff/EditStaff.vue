<template>
  <div id="member">
    <vs-upload text="Staff Photo" limit="1" accept=".jpg, .png" ref="photo" @change="fileChange" />
    <div class="text-center">
      <img :src="details.photo" width="120" height="120" />
    </div>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Name"
          v-model="details.name"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Role"
          v-model="details.role"
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
          v-model="details.salary"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Payment Method" v-model="details.paymentMethod" autocomplete>
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
          v-model="details.bankName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Account Number"
          v-model="details.accountNumber"
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
          @change="this.details.payDay = $event.target.value"
          :value="formatDate(details.payDay)"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        
      </vs-col>
    </vs-row>
    <vs-button @click="edit" :disabled="editing">Edit Staff</vs-button>
  </div>
</template>

<script>
import { editStaff } from '@/api/staff'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      details: {
        name: '',
        role: '',
        salary: '',
        paymentMethod: '',
        bankName: '',
        accountNumber: '',
        payDay: '',
        photo: '',
      },
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
      editing: false,
      error: null
    }
  },
  watch: {
    data(newValue) {
      this.details = newValue
    }
  },
  methods: {
    fileChange() {
      this.details.photo = this.$refs.photo.filesx[0]
    },
    formatDate(dob) {
      const d = new Date(dob)
      const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
      return `${d.getFullYear()}-${months[d.getMonth()]}-${days[d.getDay() - 1]}`
    },
    async edit() {
      this.editing = true
      this.error = null
      let formData = new FormData()
      if (this.details.photo) {
        formData.append('photo', this.details.photo)
      }
      formData.append('name', this.details.name)
      formData.append('role', this.details.role)
      formData.append('salary', this.details.salary)
      formData.append('paymentMethod', this.details.paymentMethod)
      formData.append('payDay', this.details.payDay)
      formData.append('bankName', this.details.bankName)
      formData.append('accountNumber', this.details.accountNumber)

      try {
        const { data } = await editStaff(formData, this.details._id)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.editing = false
        this.$emit('member-updated')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.editing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
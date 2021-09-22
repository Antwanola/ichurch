<template>
  <vx-card id="member">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Staff Name" v-model="staff" autocomplete>
          <vs-select-item
            :key="index"
            :value="staff"
            :text="staff.name"
            v-for="(staff, index) in staffMembers"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Staff Salary"
          class="w-4/5 mb-6"
          v-model="staffSalary"
          disabled
        />
      </vs-col>
    </vs-row>
    <h5 class="mb-3">Deductions</h5>
    <div v-for="(item, index) in deductions" :key="index">
      <hr />
      <vs-row vs-type="flex" vs-justify="flex-end">
        <vs-button v-if="index > 0" color="danger" icon="close" type="flat" @click="remove(index)"></vs-button>
      </vs-row>
      <vs-row class="mt-4">
        <vs-col vs-w="6" vs-sm="12">
          <vs-input
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Description"
            v-model="item.description"
            class="w-4/5 mb-6"
          />
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-input
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Amount"
            v-model="item.amount"
            type="number"
            class="w-4/5 mb-6"
          />
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-input
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Percentage"
            v-model="item.percentage"
            type="number"
            class="w-4/5 mb-6"
          />
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <p class="mb-3">Recurring deduction?</p>
          <vs-radio class="mr-3" v-model="item.recurring" vs-name="recurring" vs-value="Yes">Yes</vs-radio>
          <vs-radio v-model="recurring" vs-name="recurring" vs-value="No">No</vs-radio>
        </vs-col>
      </vs-row>
    </div>
    <vs-button class="mt-5" color="primary" type="flat" @click="addDeduction">Add New Deduction</vs-button>
    <vs-button class="mt-5" @click="addPayroll" :disabled="adding">Add Payroll</vs-button>
  </vx-card>
</template>

<script>
import { allStaff } from '@/api/staff'
import { addPayroll } from '@/api/payrolls'

export default {
  data() {
    return {
      staffMembers: [],
      deductions: [
        {
          description: '',
          percentage: 0,
          amount: 0,
          recurring: 'No'
        }
      ],
      staff: '',
      recurring: 'No',
      adding: false
    }
  },
  computed: {
    staffSalary() {
      return this.staff.salary 
    }
  },
  mounted() {
    this.getStaff()
  },
  methods: {
    addDeduction() {
      this.deductions.push({
        description: '',
        percentage: 0,
        amount: 0,
        recurring: 'No'
      })
    },
    remove(index) {
      this.deductions.splice(index, 1)
    },
    async getStaff() {
      try {
        const { data } = await allStaff()
        this.staffMembers = data.staffs
      } catch (error) {
        console.log(error)
      }
    },
    async addPayroll() {
      this.adding = true
      let formData = {
        staff: this.staff._id,
        deductions: this.deductions
      }

      try {
        const { data } = await addPayroll(formData)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/payroll/manage')
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
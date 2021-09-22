<template>
  <vx-card id="events">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-upload
          text="Add Files"
          multiple
          accept=".jpg, .png"
          ref="photo"
          @change="fileChange"
          @on-delete="removeFiles"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-2" label="Members" v-model="member" :disabled="anonymous">
          <vs-select-item
            :key="index"
            :value="member._id"
            :text="`${member.firstName} ${member.lastName}`"
            v-for="(member, index) in memberList"
          />
        </vs-select>
        <vs-checkbox v-model="anonymous" class="mb-5">Anonymous?</vs-checkbox>
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
          label="Amount"
          type="number"
          v-model="amount"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          type="date"
          label="Date"
          v-model="date"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Contribution Type" v-model="contributionType">
          <vs-select-item
            :key="index"
            :value="cont._id"
            :text="cont.type"
            v-for="(cont, index) in contTypes"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Notes"
          v-model="notes"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button @click="addContribution" :disabled="adding">Add Contribution</vs-button>
  </vx-card>
</template>

<script>
import { allTypes, addContribution } from '@/api/contribution'
import { viewMembers } from '@/api/member'

export default {
  data() {
    return {
      member: '',
      memberList: [],
      contTypes: [],
      contributionType: '',
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
      eventName: '',
      date: '',
      payment: '',
      anonymous: false,
      amount: '',
      paymentMethod: '',
      file: '',
      notes: '',
      adding: false,
      error: null
    }
  },
  async mounted () {
    try {
      const { data } = await allTypes()
      const response = await viewMembers()
      this.contTypes = data.types
      this.memberList = response.data.members
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.photo.filesx
    },
    removeFiles() {
      this.file = null
    },
    async addContribution() {
      this.adding = true
      this.error = null
      let payload = new FormData()
      payload.append('member', this.anonymous ? ' ' : this.member)
      payload.append('anonymous', this.anonymous)
      payload.append('amount', this.amount)
      payload.append('paymentMethod', this.paymentMethod)
      payload.append('contributionType', this.contributionType)
      payload.append('notes', this.notes)
      payload.append('date', this.date)
      if (this.file && this.file.length) {
        for (let i = 0; i < this.file.length; i++) {
          payload.append('file', this.file[i])
        }
      } else {
        payload.append('file', '')
      }

      try {
        const { data } = await addContribution(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/contribution/manage')
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

<style lang="scss">

</style>
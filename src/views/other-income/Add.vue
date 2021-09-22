<template>
  <vx-card id="member">
    <vs-upload
      text="Add files"
      multiple
      accept=".jpg, .png"
      ref="photo"
      @change="fileChange"
      @on-delete="removeFiles"
    />
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Income Title"
          v-model="incomeTitle"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Income Amount"
          v-model="incomeAmount"
          type="number"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Categories" v-model="incomeCategory" autocomplete>
          <vs-select-item
            :key="index"
            :value="category._id"
            :text="`${category.name}`"
            v-for="(category, index) in categories"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Member" v-model="member" autocomplete>
          <vs-select-item
            :key="index"
            :value="member._id"
            :text="`${member.firstName} ${member.lastName}`"
            v-for="(member, index) in memberList"
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
          type="date"
          label="Date"
          v-model="date"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Description"
          v-model="description"
          type="date"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button :disabled="adding" @click="addIncome">Add Income</vs-button>
  </vx-card>
</template>

<script>
import { viewMembers } from '@/api/member'
import { allCategories, addIncome } from '@/api/incomes'

export default {
  data() {
    return {
      incomeTitle: '',
      incomeAmount: 0,
      incomeCategory: '',
      categories: [],
      amount: '',
      date: '',
      description: '',
      file: '',
      memberList: '',
      member: '',
      adding: false,
    }
  },
  async mounted () {
    try {
      const { data } = await allCategories()
      const response = await viewMembers()
      this.categories = data.categories
      this.memberList = response.data.members
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.photo.filesx[0]
    },
    removeFiles() {
      this.file = null
    },
    async addIncome() {
      this.adding = true
      let payload = new FormData()
      payload.append('incomeTitle', this.incomeTitle)
      payload.append('incomeAmount', this.incomeAmount)
      payload.append('member', this.member)
      payload.append('description', this.description)
      payload.append('incomeCategory', this.incomeCategory)
      payload.append('file', this.file)
      payload.append('date', this.date)

      try {
        const { data } = await addIncome(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/income/manage')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.adding = false
      }
    }
  },
}
</script>

<style lang="scss">
label {
  padding-left: 5px;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
  display: block;
}
input#start,
input#end {
  color: inherit;
  position: relative;
  border-radius: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.7rem 1rem 0.7rem 3rem;
}
</style>
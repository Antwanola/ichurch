<template>
  <div id="member">
    <vs-upload text="New Photo" limit="1" accept=".jpg, .png" ref="photo" @change="fileChange" />
    <div class="text-center">
      <img :src="details.photo" width="120" height="120" />
    </div>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="First Name"
          v-model="details.firstName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Last Name"
          v-model="details.lastName"
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
          label-placeholder="Middle Name"
          v-model="details.middleName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Gender" v-model="details.gender">
          <vs-select-item value="male" text="Male" />
          <vs-select-item value="female" text="Female" />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Email"
          v-model="details.email"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Address"
          v-model="details.address"
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
          label-placeholder="Home Phone"
          v-model="details.homePhone"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Work Phone"
          v-model="details.workPhone"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Groups" v-model="details.groups" autocomplete multiple>
          <vs-select-item
            :key="index"
            :value="group._id"
            :text="group.groupName"
            v-for="(group, index) in groupList"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Marital Status" v-model="details.maritalStatus">
          <vs-select-item value="single" text="Single" />
          <vs-select-item value="engaged" text="Engaged" />
          <vs-select-item value="married" text="Married" />
          <vs-select-item value="widowed" text="Widowed" />
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
          label="Date of Birth"
          @change="details.dateOfBirth = $event.target.value"
          :value="formatDate(details.dateOfBirth)"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Occupation"
          v-model="details.occupation"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Description"
          v-model="details.description"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12" v-if="details.maritalStatus === 'married'">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          type="date"
          label="Wedding Anniversary"
          @change="details.weddingAnniversary = $event.target.value"
          :value="formatDate(details.weddingAnniversary)"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-alert v-if="error" color="danger" class="my-3">{{ error }}</vs-alert>
    <vs-button @click="edit" :disabled="editing">Edit Member</vs-button>
  </div>
</template>

<script>
import { viewGroups } from '@/api/group'
import { editMember } from '@/api/member'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      details: {
        photo: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        maritalStatus: '',
        homePhone: '',
        workPhone: '',
        email: '',
        dateOfBirth: '',
        address: '',
        description: '',
        occupation: '',
        weddingAnniversary: '',
        groups: []
      },
      photo: null,
      groupList: [],
      editing: false,
      error: null
    }
  },
  watch: {
    data(newValue) {
      this.details = newValue
    }
  },
  async mounted() {
    this.$vs.loading({
      container: '#member',
      scale: 0.6
    })
    try {
      const { data } = await viewGroups()
      this.groupList = data.groups
      this.$vs.loading.close('#member > .con-vs-loading')
    } catch (error) {
      this.$vs.loading.close('#member > .con-vs-loading')
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
      if (this.photo || this.details.photo) {
        formData.append('photo', this.photo || this.details.photo)
      }
      formData.append('firstName', this.details.firstName)
      formData.append('middleName', this.details.middleName)
      formData.append('lastName', this.details.lastName)
      formData.append('gender', this.details.gender)
      formData.append('maritalStatus', this.details.maritalStatus)
      formData.append('homePhone', this.details.homePhone)
      formData.append('workPhone', this.details.workPhone)
      formData.append('occupation', this.details.occupation)
      formData.append('email', this.details.email)
      formData.append('dateOfBirth', this.formatDate(this.details.dateOfBirth))
      formData.append('address', this.details.address)
      formData.append('description', this.details.description)
      formData.append('groups', this.details.groups)

      try {
        const { data } = await editMember(formData, this.details._id)
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
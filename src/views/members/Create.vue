<template>
  <vx-card id="member">
    <vs-row vs-align="bottom" vs-w="12">
      <vs-col vs-w="6">
        <p class="text-2xl mb-0 mt-6">Member Details</p>
      </vs-col>
      <vs-col vs-w="6">
        <a href="http://s000.tinyupload.com/download.php?file_id=20049384906024657427&t=2004938490602465742715056" target="_blank">
          <vs-button color="primary" type="flat">Batch Upload Template</vs-button>
        </a>
        <div class="wrap-custom-file">
          <input type="file" id="image" accept=".csv" @change="uploadMembers" />
          <label for="image">
            <vs-button color="primary" type="filled" :disabled="adding">Batch Upload</vs-button>
          </label>
        </div>
      </vs-col>
    </vs-row>
    <vs-divider/>
    <vs-upload text="Member Photo" limit="1" accept=".jpg, .png" ref="photo" @change="fileChange" />
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="First Name"
          v-model="firstName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Last Name"
          v-model="lastName"
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
          v-model="middleName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Gender" v-model="gender">
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
          v-model="email"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Address"
          v-model="address"
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
          v-model="homePhone"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Work Phone"
          v-model="workPhone"
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
          label-placeholder="Occupation"
          v-model="occupation"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Marital Status" v-model="maritalStatus">
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
          v-model="dateOfBirth"
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
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Groups" v-model="groups" autocomplete multiple>
          <vs-select-item
            :key="index"
            :value="group._id"
            :text="group.groupName"
            v-for="(group, index) in groupList"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          v-if="maritalStatus === 'married'"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          type="date"
          label="Wedding Anniversary"
          v-model="weddingAnniversary"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-alert v-if="error" color="danger" class="my-3">{{ error }}</vs-alert>
    <vs-button @click="addMember" :disabled="adding">Add Member</vs-button>
  </vx-card>
</template>

<script>
import { viewGroups } from '@/api/group'
import { addMember, addMultipleMembers } from '@/api/member'

export default {
  data() {
    return {
      photo: null,
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      maritalStatus: '',
      homePhone: '',
      workPhone: '',
      email: '',
      occupation: '',
      dateOfBirth: '',
      address: '',
      description: '',
      weddingAnniversary: '',
      groups: [],
      groupList: [],
      file: null,
      adding: false,
      error: null
    }
  },
  async mounted() {
    try {
      const { data } = await viewGroups()
      this.groupList = data.groups
    } catch (error) {
      this.$vs.notify({
        color: 'danger',
        title: 'Notification',
        text: error.response ? error.response.data.message : error.message
      })
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async uploadMembers (elem) {
      const file = elem.target.files[0]
      this.adding = true
      try {
        let payload = new FormData()
        payload.append('file', file)
        const { data } = await addMultipleMembers(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/members/manage')
      } catch (error) {
        this.adding = false
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    },
    async addMember() {
      this.adding = true
      this.error = null
      let formData = new FormData()
      if (this.photo) {
        formData.append('photo', this.photo)
      }
      formData.append('firstName', this.firstName)
      formData.append('middleName', this.middleName)
      formData.append('lastName', this.lastName)
      formData.append('gender', this.gender)
      formData.append('maritalStatus', this.maritalStatus)
      formData.append('homePhone', this.homePhone)
      formData.append('workPhone', this.workPhone)
      formData.append('occupation', this.occupation)
      formData.append('email', this.email)
      formData.append('dateOfBirth', this.dateOfBirth)
      formData.append('address', this.address)
      if (this.maritalStatus === 'married') {
        formData.append('weddingAnniversary', this.weddingAnniversary)
      }
      formData.append('description', this.description)
      formData.append('groups', this.groups)

      try {
        const { data } = await addMember(formData)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/members/manage')
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
.wrap-custom-file {
  position: relative;
  display: inline-block;
  width: 50%;
  height: 40px;
  text-align: center;
  padding: 10px;
}
.wrap-custom-file input[type='file'] {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  opacity: 0;
  z-index: 1;
}
.wrap-custom-file label {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 0 0.5rem;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
}
.wrap-custom-file label button {
  margin-top: 10px;
  display: block;
  width: 100%;
  -webkit-transition: color 0.4s;
  transition: color 0.4s;
  padding: 10px!important;
}
</style>
<template>
  <vx-card>
    <vs-upload
      text="Add Pastor Picture"
      limit="1"
      accept=".jpg, .png"
      ref="photo"
      :show-upload-button="false"
      @change="fileChange"
    />
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Fullname"
          v-model="fullname"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Designation"
          v-model="designation"
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
          label-placeholder="Phone Number"
          v-model="phoneNumber"
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
          label="Pastor Bio"
          v-model="bio"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button @click="add" :disabled="addingPastor">Add Pastor</vs-button>
  </vx-card>
</template>

<script>
import { addPastor } from '@/api/pastors'

export default {
  data() {
    return {
      fullname: '',
      photo: null,
      bio: '',
      designation: '',
      email: '',
      phoneNumber: '',
      addingPastor: false
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async add() {
      this.addingPastor = true
      let formData = new FormData()
      if (this.photo) {
        formData.append('photo', this.photo)
      }
      formData.append('fullname', this.fullname)
      formData.append('bio', this.bio)
      formData.append('designation', this.designation)
      formData.append('email', this.email)
      formData.append('phoneNumber', this.phoneNumber)

      try {
        const { data } = await addPastor(formData)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.addingPastor = false
        this.$router.push('/pastors/manage')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.addingPastor = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
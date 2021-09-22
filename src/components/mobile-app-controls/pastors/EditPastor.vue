<template>
  <div>
    <vs-upload
      text="Update Pastor Picture"
      limit="1"
      accept=".jpg, .png"
      ref="photo"
      :show-upload-button="false"
      @change="fileChange"
    />
    <div class="text-center">
      <img :src="editDetails.photo" width="120" height="120" />
    </div>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Fullname"
          v-model="editDetails.fullname"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Designation"
          v-model="editDetails.designation"
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
          v-model="editDetails.email"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Phone Number"
          v-model="editDetails.phoneNumber"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>

    <vs-textarea
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label="Pastor Bio"
      v-model="editDetails.bio"
      class="w-4/5 mt-5 mb-6"
    />
    <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
    <vs-button color="primary" @click="edit" :disabled="editing">Edit Pastor</vs-button>
  </div>
</template>

<script>
import { editPastor } from '@/api/pastors'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      editDetails: this.data,
      error: null,
      success: null,
      photo: null,
      editing: false
    }
  },
  watch: {
    data(newValue) {
      this.editDetails = newValue
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async edit() {
      this.error = null
      this.editing = true
      let formData = new FormData()
      formData.append('fullname', this.editDetails.fullname)
      formData.append('bio', this.editDetails.bio)
      formData.append('designation', this.editDetails.designation)
      formData.append('email', this.editDetails.email)
      formData.append('phoneNumber', this.editDetails.phoneNumber)
      if (this.photo || this.editDetails.photo) {
        formData.append('photo', this.photo || this.editDetails.photo)
      }

      try {
        await editPastor(formData, this.editDetails._id)
        this.$emit('pastor-edited')
        this.editing = false
      } catch (error) {
        this.error = error.response.data.message
        this.editing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
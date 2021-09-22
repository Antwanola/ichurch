<template>
  <div id="about">
    <h3 class="mb-6">Edit About Us</h3>
    <vs-upload
      text="Add Picture"
      limit="1"
      accept=".jpg, .png"
      ref="photo"
      :show-upload-button="false"
      @change="fileChange"
    />
    <div class="text-center">
      <img class="mb-5" :src="about.photo" alt width="120" height="120" />
    </div>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Motto"
          v-model="about.motto"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Description"
          v-model="about.description"
          class="w-4/5 mb-6"
          height="100"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Facebook Username"
          v-model="about.facebook"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Twitter Handle"
          v-model="about.twitter"
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
          label-placeholder="Youtube URL"
          v-model="about.youtube"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Instagram Handle"
          v-model="about.instagram"
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
          v-model="about.email"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Phone Number"
          v-model="about.phone"
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
          label-placeholder="Website"
          v-model="about.webAddress"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Address"
          v-model="about.address"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
    <vs-button color="primary" @click="edit" :disabled="editing">Edit About</vs-button>
  </div>
</template>

<script>
import { editAbout } from '@/api/about'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      about: {
        motto: '',
        photo: '',
        facebook: '',
        twitter: '',
        instagram: '',
        description: ''
      },
      editing: false,
      error: null
    }
  },
  watch: {
    data(newValue) {
      this.about = newValue
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
      formData.append('motto', this.about.motto)
      formData.append('description', this.about.description)
      formData.append('facebook', this.about.facebook)
      formData.append('twitter', this.about.twitter)
      formData.append('instagram', this.about.instagram)
      formData.append('photo', this.photo || this.about.photo)
      formData.append('youtube', this.about.youtube)
      formData.append('webAddress', this.about.webAddress)
      formData.append('phoneNumber', this.about.phone)
      formData.append('email', this.about.email)
      formData.append('address', this.about.address)

      try {
        await editAbout(formData, this.about._id)
        this.$emit('about-updated')
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
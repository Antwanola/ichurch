<template>
  <vx-card>
    <vs-upload
      text="Add Picture"
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
          label-placeholder="Motto"
          v-model="motto"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Phone Number"
          v-model="phone"
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
          label-placeholder="Website"
          v-model="webAddress"
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
          label-placeholder="Address"
          v-model="address"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Twitter Handle"
          v-model="twitter"
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
          v-model="youtube"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Instagram Handle"
          v-model="instagram"
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
          label-placeholder="Facebook Username"
          v-model="facebook"
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
          class="w-4/5 mb-6"
          height="100"
        />
      </vs-col>
    </vs-row>
    <vs-alert v-if="error" color="danger" class="my-3">{{ error }}</vs-alert>
    <vs-button color="primary" @click="create" :disabled="creating">Add About</vs-button>
  </vx-card>
</template>

<script>
import { addAbout } from '@/api/about'

export default {
  data() {
    return {
      motto: '',
      description: '',
      photo: null,
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      webAddress: '',
      address: '',
      email: '',
      phone: '',
      error: null,
      creating: false
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async create() {
      this.error = null
      this.creating = true
      let formData = new FormData()
      formData.append('motto', this.motto)
      formData.append('description', this.description)
      formData.append('facebook', this.facebook)
      formData.append('twitter', this.twitter)
      formData.append('instagram', this.instagram)
      if (this.photo) {
        formData.append('photo', this.photo)
      }
      formData.append('youtube', this.youtube)
      formData.append('webAddress', this.webAddress)
      formData.append('phoneNumber', this.phone)
      formData.append('email', this.email)
      formData.append('address', this.address)

      try {
        await addAbout(formData)
        this.creating = false
        this.$router.push('/about/manage')
      } catch (error) {
        this.error = error.response.data.message
        this.creating = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <vx-card>
    <form @submit.prevent="submitForm">
      <vs-upload text="Add Photo" limit="1" accept=".jpg, .png" ref="photo" @change="fileChange" />
      <vs-row>
        <vs-col vs-w="6" vs-sm="12">
          <vs-input
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Title"
            v-model="title"
            class="w-4/5 mb-6"
          />
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-input
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Preacher"
            v-model="preacher"
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
            label-placeholder="Audio URL"
            v-model="audioUrl"
            class="w-4/5 mb-6"
          />
        </vs-col>
        <vs-col vs-w="6" vs-sm="12">
          <vs-input
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label-placeholder="Youtube URL"
            v-model="youtubeUrl"
            class="w-4/5 mb-6"
          />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col class="mt-6" vs-w="6" vs-sm="12">
          <vs-textarea
            icon-no-border
            icon="icon icon-user"
            icon-pack="feather"
            label="Description"
            v-model="description"
            class="w-4/5"
          />
        </vs-col>
      </vs-row>
      <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
      <vs-button
        class="mb-5"
        id="button-with-loading"
        @click="submitForm"
        :disabled="creating"
      >Create Sermon</vs-button>
    </form>
  </vx-card>
</template>

<script>
import { addSermon } from '@/api/sermons'

export default {
  data() {
    return {
      backgroundLoading: 'primary',
      colorLoading: '#fff',
      error: null,
      title: '',
      preacher: '',
      audioUrl: '',
      youtubeUrl: '',
      photo: null,
      description: '',
      creating: false
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async submitForm() {
      // start loading
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-with-loading',
        scale: 0.45
      })
      // clear previous error message, if any
      this.error = null
      this.creating = true
      // set form data
      let formData = new FormData()
      if (this.photo) {
        formData.append('photo', this.photo)
      }
      formData.append('title', this.title)
      formData.append('preacher', this.preacher)
      formData.append('audioUrl', this.audioUrl)
      formData.append('youtubeUrl', this.youtubeUrl)
      formData.append('description', this.description)
      try {
        await addSermon(formData)
        this.$vs.loading.close('#button-with-loading > .con-vs-loading')
        this.creating = false
        this.$router.push('/sermon/manage')
      } catch (error) {
        this.$vs.loading.close('#button-with-loading > .con-vs-loading')
        this.error = error.response.data.message
        this.creating = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
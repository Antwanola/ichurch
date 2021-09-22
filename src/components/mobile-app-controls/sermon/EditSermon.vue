<template>
  <div>
    <vs-upload text="Photo" limit="1" accept=".jpg, .png" ref="photo" @change="fileChange" />
    <div class="text-center">
      <img :src="editDetails.photo" width="120" height="120" />
    </div>
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Title"
      v-model="editDetails.title"
      class="w-full"
    />
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Preacher"
      v-model="editDetails.preacher"
      class="w-full mb-6"
    />
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Audio URL"
      v-model="editDetails.audioUrl"
      class="w-full mb-6"
    />
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Youtube URL"
      v-model="editDetails.youtubeUrl"
      class="w-full mb-6"
    />
    <vs-textarea
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label="Description"
      height="200"
      v-model="editDetails.description"
      class="w-full mb-6"
    />
    <vs-button color="primary" @click="edit" :disabled="editing">Edit Sermon</vs-button>
  </div>
</template>

<script>
import { editSermon } from '@/api/sermons'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      title: this.data.title,
      editDetails: this.data,
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
      this.editDetails.photo = this.$refs.photo.filesx[0]
    },
    async edit() {
      this.editing = true
      const payload = new FormData()
      payload.append('title', this.editDetails.title)
      payload.append('preacher', this.editDetails.preacher)
      payload.append('audioUrl', this.editDetails.audioUrl)
      payload.append('youtubeUrl', this.editDetails.youtubeUrl)
      payload.append('description', this.editDetails.description)
      if (this.editDetails.photo) {
        payload.append('photo', this.editDetails.photo)
      }
      try {
        const { data } = await editSermon(payload, this.editDetails._id)
        this.success = data.message
        this.editing = false
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.$emit('sermon-updated')
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
<template>
  <div>
    <vs-upload
      text="Add Featured Picture"
      limit="1"
      accept=".jpg, .png"
      ref="photo"
      :show-upload-button="false"
      @change="fileChange"
    />
    <div class="text-center">
      <img :src="editDetails.photo" width="120" height="120" />
    </div>
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Title"
      v-model="editDetails.title"
      class="w-4/5 mb-6"
    />
    <quill-editor class="w-4/5 mt-5 mb-6" v-model="editDetails.content" ref="myQuillEditor" />
    <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
    <vs-alert v-if="success" color="success">{{ success }}</vs-alert>
    <vs-button color="primary" @click="edit" :disabled="editing">Edit News</vs-button>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { editNews } from '@/api/news'

export default {
  components: {
    quillEditor
  },
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
      this.success = null
      this.editing = true
      let formData = new FormData()
      formData.append('title', this.editDetails.title)
      formData.append('content', this.editDetails.content)
      if (this.photo || this.editDetails.photo) {
        formData.append('photo', this.photo || this.editDetails.photo)
      }

      try {
        const { data } = await editNews(formData, this.editDetails._id)
        this.$emit('news-edited')
        this.success = data.message
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
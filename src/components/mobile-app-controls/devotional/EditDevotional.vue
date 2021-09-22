<template>
  <div>
    <vs-upload
      text="Update Devotional Picture"
      limit="1"
      accept=".jpg, .png"
      ref="photo"
      :show-upload-button="false"
      @change="fileChange"
    />
    <div class="text-center">
      <img :src="data.photo" width="120" height="120" />
    </div>
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Title"
      v-model="devotional.title"
      class="w-4/5 mb-6"
    />
    <quill-editor class="w-4/5 mt-5 mb-6" v-model="devotional.content" ref="myQuillEditor" />
    <vs-alert v-if="error" color="warning" class="my-3">{{ error }}</vs-alert>
    <vs-button @click="edit" :disabled="adding">Edit Devotional</vs-button>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { editDevotional } from '@/api/devotional'

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
      devotional: {
        title: '',
        content: '',
        photo: ''
      },
      photo: '',
      adding: false,
      error: null
    }
  },
  watch: {
    data(newValue) {
      this.devotional = newValue
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async edit() {
      this.adding = true
      this.error = null
      let formData = new FormData()
      formData.append('title', this.devotional.title)
      formData.append('content', this.devotional.content)
      if (this.photo || this.devotional.photo) {
        formData.append('photo', this.photo || this.devotional.photo)
      }

      try {
        const { data } = await editDevotional(formData, this.devotional._id)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$emit('devotional-updated')
      } catch (error) {
        this.adding = false
        this.error = error.response.data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
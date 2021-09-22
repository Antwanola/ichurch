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
    <vs-input
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Title"
      v-model="title"
      class="w-1/2"
    />
    <quill-editor class="w-4/5 mt-5 mb-6" v-model="content" ref="myQuillEditor" />
    <vs-button @click="add" :disabled="adding">Add Devotional</vs-button>
  </vx-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { addDevotional } from '@/api/devotional'

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      title: '',
      photo: null,
      content: '',
      adding: false
    }
  },
  methods: {
    fileChange() {
      this.photo = this.$refs.photo.filesx[0]
    },
    async add() {
      this.adding = true
      let formData = new FormData()
      if (this.photo) {
        formData.append('photo', this.photo)
      }
      formData.append('title', this.title)
      formData.append('content', this.content)

      try {
        const { data } = await addDevotional(formData)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/devotionals/manage')
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
</style>
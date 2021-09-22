<template>
  <vx-card>
    <p v-if="noTemp" class="text-warning mb-4">No templates found. Add templates!</p>
    <!-- sms templates -->
    <h4>SMS Templates</h4>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="First Template"
          v-model="payload.sms.firstTemplate"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Second Template"
          v-model="payload.sms.secondTemplate"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Third Template"
          v-model="payload.sms.thirdTemplate"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <!-- email templates -->
    <h4>Email Templates</h4>
    <vs-row>
      <vs-col vs-w="12">
        <quill-editor class="w-4/5 mt-5 mb-6" v-model="payload.email.firstTemplate" ref="firstQuillEditor" />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <quill-editor class="w-4/5 mt-5 mb-6" v-model="payload.email.secondTemplate" ref="secondQuillEditor" />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <quill-editor class="w-4/5 mt-5 mb-6" v-model="payload.email.thirdTemplate" ref="thirdQuillEditor" />
      </vs-col>
    </vs-row>
    <!-- other templates -->
    <h4>Other Templates</h4>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Birthday Template"
          v-model="payload.others.birthday"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Wedding Anniversary Template"
          v-model="payload.others.weddingAnniversary"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="New Month Template"
          v-model="payload.others.newMonth"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="New Year Template"
          v-model="payload.others.newYear"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button class="mt-6" @click="updateTemplate" :disabled="loading">
      <span v-if="noTemp">Add Templates</span>
      <span v-if="!noTemp">Update Templates</span>
    </vs-button>
  </vx-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { getTemp, addTemp, editTemp } from '@/api/communication'

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: '',
      payload: {
        sms: {
          firstTemplate: '',
          secondTemplate: '',
          thirdTemplate: ''
        },
        email: {
          firstTemplate: 'Add first template',
          secondTemplate: 'Add second template',
          thirdTemplate: 'Add third template'
        },
        others: {
          birthday: '',
          weddingAnniversary: '',
          newMonth: '',
          newYear: ''
        }
      },
      noTemp: false,
      loading: false
    }
  },
  mounted () {
    this.retrieveTemp()
  },
  methods: {
    async retrieveTemp () {
      this.loading = true
      try {
        const { data } = await getTemp()
        this.loading = false
        if (data && data.message) {
          this.noTemp = true
        }
        if (data && data.template) {
          this.payload = data.template[0]
        }
      } catch (error) {
        this.loading = false
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
      }
    },
    async updateTemplate() {
      this.loading = true
      if (this.noTemp) {
        // add new template
        try {
          const { data } = await addTemp(this.payload)
          this.loading = false
          this.retrieveTemp()
          this.$vs.notify({
            title: 'success',
            text: data.message,
            color: 'success'
          })
        } catch (error) {
          this.loading = false
          this.$vs.notify({
            title: 'Warning',
            text: error.response.data.message,
            color: 'warning'
          })
        }
      } else {
        // edit existing template
        try {
          const { data } = await editTemp(this.payload)
          this.loading = false
          this.retrieveTemp()
          this.$vs.notify({
            title: 'success',
            text: data.message,
            color: 'success'
          })
        } catch (error) {
          this.loading = false
          this.$vs.notify({
            title: 'Warning',
            text: error.response.data.message,
            color: 'warning'
          })
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
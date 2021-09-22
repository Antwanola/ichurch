<template>
  <vx-card id="main">
    <h5 class="mb-2">Paystack Keys</h5>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="API Key"
          v-model="paystackKey"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <h5 class="mb-2">SMS Details</h5>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Username"
          v-model="sms.username"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="API Key"
          v-model="sms.smsKey"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button @click="updateSettings" :disabled="updating">Update</vs-button>
    <hr>
    <!-- change password -->
    <h5 class="mb-4">Change Password</h5>
    <vs-row>
      <vs-col vs-w="4" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Old Password"
          type="password"
          v-model="password.old"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="4" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="New Password"
          type="password"
          v-model="password.new"
          class="w-4/5 mb-6"
        />
        <span v-if="passwordMatch" class="text-danger">{{ passwordMatch }}</span>
      </vs-col>
      <vs-col vs-w="4" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Re-enter New Password"
          type="password"
          v-model="password.confirm"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button @click="changePassword" :disabled="isPasswordChanging">Change Password</vs-button>
    <!-- default images -->
    <hr>
    <h5 class="mb-4">Default Images</h5>
    <p>Set default pictures for news, sermons and devotionals</p>
    <vs-row>
      <vs-col vs-w="4" vs-sm="12" v-if="defaultImages.defaultNews">
        <img :src="defaultImages.defaultNews" width="198" height="198">
        <p>Default News picture</p>
      </vs-col>
      <vs-col vs-w="4" vs-sm="12" v-if="defaultImages.defaultSermon">
        <img :src="defaultImages.defaultSermon" width="198" height="198">
        <p>Default Sermon picture</p>
      </vs-col>
      <vs-col vs-w="4" vs-sm="12" v-if="defaultImages.defaultDevotional">
        <img :src="defaultImages.defaultDevotional" width="198" height="198">
        <p>Default Devotional picture</p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="4" vs-sm="12">
        <vs-upload
          text="Add News Picture"
          accept=".jpg, .png"
          ref="news"
          limit="1"
          @change="fileChange"
          @on-delete="removeFiles"
        />
      </vs-col>
      <vs-col vs-w="4" vs-sm="12">
        <vs-upload
          text="Add Sermon Picture"
          accept=".jpg, .png"
          ref="sermons"
          limit="1"
          @change="fileChange"
          @on-delete="removeFiles('sermon')"
        />
      </vs-col>
      <vs-col vs-w="4" vs-sm="12">
        <vs-upload
          text="Add Devotionals Picture"
          accept=".jpg, .png"
          ref="devotionals"
          limit="1"
          @change="fileChange"
          @on-delete="removeFiles('dev')"
        />
      </vs-col>
    </vs-row>
    <vs-button class="mt-6" @click="uploadDefaultImages" :disabled="updating">Upload</vs-button>
  </vx-card>
</template>

<script>
import { retrieveKeys, addKeys, editKeys, uploadDefaultImages } from '@/api/settings'
import { changePassword } from '@/api/auth'

export default {
  data() {
    return {
      paystackKey: '',
      sms: {
        username: '',
        smsKey: ''
      },
      password: {
        old: '',
        new: '',
        confirm: ''
      },
      defaultImages: {
        defaultNews: '',
        defaultDevotional: '',
        defaultSermon: ''
      },
      defaultNews: '',
      defaultSermon: '',
      defaultDevotional: '',
      passwordMatch: null,
      shouldUpdate: false,
      updating: false,
      isPasswordChanging: false
    }
  },
  mounted () {
    this.getKeys()
  },
  methods: {
    fileChange() {
      this.defaultNews = this.$refs.news.filesx[0]
      this.defaultSermon = this.$refs.sermons.filesx[0]
      this.defaultDevotional = this.$refs.devotionals.filesx[0]
    },
    removeFiles (file) {
      if (file === 'dev') {
        this.defaultDevotional = null
        // this.$refs.devotionals.filesx = null
      } else if (file === 'sermon') {
        this.defaultSermon = null
        // this.$refs.sermons.filesx = null
      } else {
        this.defaultNews = null
        // this.$refs.news.filesx = null
      }
    },
    async getKeys () {
      this.$vs.loading({
        container: '#main',
        scale: 0.6
      })
      try {
        const { data } = await retrieveKeys()
        this.paystackKey = data.keys.paystackKey
        this.sms = data.keys.sms
        this.defaultImages = {
          defaultNews: data.keys.defaultImages.news,
          defaultSermon: data.keys.defaultImages.sermon,
          defaultDevotional: data.keys.defaultImages.devotional
        }
        this.defaultNews = data.keys.defaultImages.news,
        this.defaultSermon = data.keys.defaultImages.sermon,
        this.defaultDevotional = data.keys.defaultImages.sermon
        if (this.paystackKey) {
          this.shouldUpdate = true
        }
        this.$vs.loading.close('#main > .con-vs-loading')
      } catch (error) {
        this.$vs.loading.close('#main > .con-vs-loading')
      }
    },
    async updateSettings () {
      this.updating = true
      // update keys
      if (this.shouldUpdate) {
        const payload = {
          paystackKey: this.paystackKey,
          sms: this.sms
        }
        try {
          const { data } = await editKeys(payload)
          this.updating = false
          this.$vs.notify({
            title: 'success',
            text: data.message,
            color: 'success'
          })
        } catch (error) {
          this.updating = false
          this.$vs.notify({
            title: 'Failed',
            text: error.response.data.message,
            color: 'danger'
          })
        }
      } else {
        // create new keys
        const payload = {
          paystackKey: this.paystackKey,
          sms: this.sms
        }
        try {
          const { data } = await addKeys(payload)
          this.updating = false
          this.$vs.notify({
            title: 'success',
            text: data.message,
            color: 'success'
          })
          window.location.reload()
        } catch (error) {
          this.updating = false
          this.$vs.notify({
            title: 'Failed',
            text: error.response.data.message,
            color: 'danger'
          })
        }
      }
    },
    async uploadDefaultImages () {
      this.updating = true
      const payload = new FormData()
      if (this.defaultNews) {
        payload.append('defaultNews', this.defaultNews)
      }
      if (this.defaultSermon) {
        payload.append('defaultSermon', this.defaultSermon)
      }
      if (this.defaultDevotional) {
        payload.append('defaultDevotional', this.defaultDevotional)
      }
      try {
        const { data } = await uploadDefaultImages(payload)
        this.updating = false
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.getKeys()
      } catch (error) {
        this.updating = false
        this.$vs.notify({
          title: 'Failed',
          text: error.response.data.message,
          color: 'danger'
        })
      }
    },
    // change password
    async changePassword () {
      this.passwordMatch = false
      if (this.password.new === '' || this.password.confirm === '' || this.password.new.length < 6 || this.password.confirm.length < 6) {
        this.passwordMatch = 'Password length must be greater than 6'
        return
      }
      if (this.password.new !== this.password.confirm) {
        this.passwordMatch = 'New passwords don\'t match'
        return
      }
      const payload = {
        oldPassword: this.password.old,
        newPassword: this.password.new
      }
      this.isPasswordChanging = true
      try {
        const { data } = await changePassword(payload)
        this.isPasswordChanging = false
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        window.location.reload()
      } catch (error) {
        this.isPasswordChanging = false
        this.$vs.notify({
          title: 'Failed',
          text: error.response.data.message,
          color: 'danger'
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
hr {
  margin: 30px 0;
  border: none;
  border-bottom: 1px solid #757575;
}
img {
  object-fit: contain;
}
</style>
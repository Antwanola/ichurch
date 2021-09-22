<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto" />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Forgot password</h4>
                  <p>Please enter email to recover your password</p>
                </div>

                <div>
                  <vs-input
                    name="email"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Email"
                    v-model="payload.email"
                    class="w-full"
                  />
                  <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
                  <vs-row vs-align="center">
                    <vs-col vs-w="6" vs-sm="12">
                      <router-link to="/login">
                        <p>Remembered password?</p>
                      </router-link>
                    </vs-col>
                    <vs-col vs-w="6" vs-sm="12">
                      <vs-button class="float-right my-5" @click="forgotPassword">Submit</vs-button>
                    </vs-col>
                  </vs-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { forgotPassword } from '@/api/auth'

export default {
  data() {
    return {
      payload: {
        email: ''
      },
      error: null,
    }
  },
  methods: {
    async forgotPassword() {
      this.error = null
      this.$vs.loading()
      try {
        const { data } = await forgotPassword(this.payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.$vs.loading.close()
      } catch (error) {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'failed',
          text: error && error.response ? error.response.data.message : error.message,
          color: 'danger'
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>

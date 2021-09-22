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
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>

                <div class="mt-6">
                  <vs-input
                    name="email"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Email"
                    v-model="payload.email"
                    class="w-full mb-6"
                  />

                  <vs-input
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Password"
                    v-model="payload.password"
                    class="w-full mb-6"
                  />

                  <div class="flex flex-wrap justify-between my-5">
                    <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                  </div>
                  <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
                  <vs-row vs-align="center">
                    <vs-col vs-w="6" vs-sm="12">
                      <router-link to="/forgot-password">
                        <p>Forgot password?</p>
                      </router-link>
                    </vs-col>
                    <vs-col vs-w="6" vs-sm="12">
                      <vs-button class="float-right my-5" @click="login">Login</vs-button>
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
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      payload: {
        email: '',
        password: ''
      },
      error: null,
      checkbox_remember_me: false
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async login() {
      this.error = null
      this.$vs.loading()
      try {
        const res = await this.loginUser(this.payload)
        if (res && res.error) {
          this.error = res.error
          this.$vs.loading.close()
          return
        }
        this.$vs.loading.close()
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        }
        else {
          this.$router.push('/')
        }
      } catch (error) {
        this.$vs.loading.close()
      }
    }
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>

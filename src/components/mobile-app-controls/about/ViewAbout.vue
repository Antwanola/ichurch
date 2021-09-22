<template>
  <div id="about" class="my-6">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <img :src="data.photo" height="150" alt />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="mb-4">
          <strong>Motto:</strong>
          {{ data.motto }}
        </p>
        <p class="mb-4">
          <strong>Description:</strong>
          {{ data.description }}
        </p>
        <p class="mb-4">
          <strong>Website:</strong>
          <a :href="data.webAddress">{{ data.webAddress }}</a>
        </p>
        <p class="mb-4">
          <strong>Email:</strong>
          {{ data.email }}
        </p>
        <p class="mb-4">
          <strong>Phone Number:</strong>
          {{ data.phoneNumber }}
        </p>
        <p class="mb-4">
          <strong>Address:</strong>
          {{ data.address }}
        </p>
        <p class="mb-4">
          <router-link :to="`https://www.facebook.com/${data.facebook}`" class="m-2">
            <feather-icon icon="FacebookIcon" />
          </router-link>
          <router-link :to="`https://twitter.com/${data.twitter}`" class="m-2">
            <feather-icon icon="TwitterIcon" />
          </router-link>
          <router-link :to="`https://instagram.com/${data.instagram}`" class="m-2">
            <feather-icon icon="InstagramIcon" />
          </router-link>
          <router-link :to="`https://youtube.com/${data.youtube}`" class="m-2">
            <feather-icon icon="YoutubeIcon" />
          </router-link>
        </p>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
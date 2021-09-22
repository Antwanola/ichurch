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
          label-placeholder="Payment Link"
          v-model="link"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-textarea
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label="Description"
      v-model="description"
      class="w-1/2 mb-6"
      height="200"
    />
    <vs-button>Add Payment</vs-button>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      photo: '',
      title: '',
      link: '',
      description: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
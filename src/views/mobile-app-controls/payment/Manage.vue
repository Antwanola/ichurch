<template>
  <vx-card>
    <vs-table stripe :data="paymentPlans" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Title</vs-th>
        <vs-th>Image</vs-th>
        <vs-th>Payment Link</vs-th>
        <vs-th>Description</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(sermon, index) in data" :key="index">
          <vs-td :data="data[index].title">{{ data[index].title }}</vs-td>
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="30" height="30" />
          </vs-td>
          <vs-td :data="data[index].link">{{ data[index].link }}</vs-td>
          <vs-td :data="data[index].description">{{ data[index].description }}</vs-td>
          <vs-td>
            <div class="flex justify-around my-5">
              <!-- view action -->
              <vs-button
                class="m-2"
                radius
                color="primary"
                type="border"
                icon="visibility"
                size="small"
              ></vs-button>
              <!-- edit action -->
              <vs-button class="m-2" radius color="warning" type="border" icon="edit" size="small"></vs-button>
              <!-- delete action -->
              <vs-button class="m-2" radius color="danger" type="border" icon="delete" size="small"></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      paymentPlans: [
        {
          title: 'Donation',
          photo: 'http://demo.ichurch.ng/public/img/uploads/1551491584.PNG',
          link: 'https://paystack.com/pay/c0oa9916c5',
          description:
            'Donate to the ministry and let God bless you greatly for donating.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <vx-card>
    <vs-table stripe :data="news" max-items="10" pagination id="table">
      <template slot="thead">
        <vs-th>Featured Image</vs-th>
        <vs-th>Title</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(n, index) in data" :key="index">
          <vs-td :data="data[index].photo">
            <img radius :src="data[index].photo" width="30" height="30" />
          </vs-td>
          <vs-td :data="data[index].title">{{ data[index].title }}</vs-td>
          <vs-td>
            <div class="flex justify-around my-5">
              <!-- view action -->
              <vs-button
                radius
                class="m-2"
                color="primary"
                type="border"
                icon="visibility"
                size="small"
                @click="viewNewsDetails(data[index])"
              ></vs-button>
              <vs-popup class="holamundo" title="Sermon Details" :active.sync="showDetails">
                <view-news :data="selectedNews" />
              </vs-popup>
              <!-- edit action -->
              <vs-button
                radius
                class="m-2"
                color="warning"
                type="border"
                icon="edit"
                size="small"
                @click="showEditPrompt(data[index])"
              ></vs-button>
              <vs-popup title="Edit Sermon" :active.sync="activeEditPrompt">
                <edit-news :data="selectedNews" @news-edited="close" />
              </vs-popup>
              <!-- delete action -->
              <vs-button
                radius
                class="m-2"
                color="danger"
                type="border"
                icon="delete"
                size="small"
                @click="delNews(data[index])"
              ></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import ViewNews from '@/components/mobile-app-controls/news/ViewNews.vue'
import EditNews from '@/components/mobile-app-controls/news/EditNews.vue'
import { viewAllNews, deleteNews } from '@/api/news'

export default {
  components: {
    'view-news': ViewNews,
    'edit-news': EditNews
  },
  data() {
    return {
      news: [],
      showDetails: false,
      selectedNews: {},
      activeEditPrompt: false
    }
  },
  mounted() {
    this.fetchNews()
  },
  methods: {
    async fetchNews() {
      this.$vs.loading({
        container: '#table',
        scale: 0.6
      })
      try {
        const { data } = await viewAllNews()
        if (data.status) this.news = data.allNews
        this.$vs.loading.close('#table > .con-vs-loading')
      } catch (error) {
        console.log(error.response)
        this.$vs.loading.close('#table > .con-vs-loading')
      }
    },
    viewNewsDetails(news) {
      this.showDetails = true
      this.selectedNews = news
    },
    showEditPrompt(news) {
      this.activeEditPrompt = true
      this.selectedNews = news
    },
    delNews(data) {
      this.selectedNews = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        text: 'Are you sure you want to delete this news?',
        accept: this.del
      })
    },
    async del() {
      try {
        await deleteNews(this.selectedNews._id)
        this.$vs.notify({
          color: 'success',
          title: 'Notification',
          text: 'Deleted successfully'
        })
      } catch (error) {
        this.$vs.notify({
          color: 'danger',
          title: 'Notification',
          text: 'Failed to delete news'
        })
      }
      this.fetchNews()
    },
    close() {
      this.activeEditPrompt = false
      this.$vs.notify({
        color: 'success',
        title: 'Notification',
        text: 'News Edited Successfully'
      })
      this.fetchNews()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
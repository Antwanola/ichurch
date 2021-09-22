<template>
  <vx-card id="events">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Event"
          v-model="payload.eventType"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Date of Event"
          type="date"
          v-model="payload.date"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Number of Men"
          v-model="payload.numberOfMales"
          type="number"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Number of Women"
          type="number"
          v-model="payload.numberOfFemales"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Number of Children"
          type="number"
          v-model="payload.numberOfChildren"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Number of Converts"
          type="number"
          v-model="payload.numberOfConverts"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Number of First Timers"
          type="number"
          v-model="payload.numberOfFirstTimers"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Name of Minister"
          v-model="payload.nameOfMinister"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Sermon Topic"
          v-model="payload.sermonTopic"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Bible Text"
          v-model="payload.biblePassages"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Additional Information"
          v-model="payload.moreInformation"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
      </vs-col>
    </vs-row>
    <vs-button @click="add" :disabled="adding">Add Attendance</vs-button>
  </vx-card>
</template>

<script>
import { addAttendance } from '@/api/attendance'

export default {
  data() {
    return {
      payload: {
        date: '',
        eventType: '',
        numberOfMales: null,
        numberOfFemales: null,
        numberOfChildren: null,
        numberOfConverts: null,
        numberOfFirstTimers: null,
        nameOfMinister: '',
        sermonTopic: '',
        biblePassages: '',
        moreInformation: ''
      },
      adding: false,
    }
  },
  methods: {
    async add() {
      this.adding = true
      try {
        const { data } = await addAttendance(this.payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/attendance-report/manage')
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

<style lang="scss">

</style>
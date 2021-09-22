<template>
  <vx-card id="events">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-upload
          text="Add Photos"
          multiple
          accept=".jpg, .png"
          ref="photo"
          @change="fileChange"
          @on-delete="removeFiles"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Event Name*"
          v-model="eventName"
          class="w-5/6 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          type="date"
          label="Start Date"
          v-model="startDate"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          type="date"
          label="End Date"
          v-model="endDate"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <label for="start">Start Time</label>
        <vue-timepicker id="start" class="my-3" input-width="90%" v-model="startTime" :disabled="allDay"></vue-timepicker>
        <vs-checkbox v-model="allDay" class="mb-3">All day event?</vs-checkbox>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <label for="end">End Time</label>
        <vue-timepicker id="end" class="my-3" input-width="90%" v-model="endTime" :disabled="allDay"></vue-timepicker>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Location"
          v-model="location"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Cost"
          v-model="cost"
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
          label="Additional Notes"
          v-model="notes"
          class="w-4/5 mt-5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12" class="mt-3">
        <vs-checkbox v-model="recurring" class="mb-5">Is this a recurring Event?</vs-checkbox>
        <vs-select v-if="recurring" class="w-4/5 mb-6" label="Select Frequency" v-model="recurringFreq">
          <vs-select-item
            value="daily"
            text="Daily"
          />
          <vs-select-item
            value="weekly"
            text="Weekly"
          />
          <vs-select-item
            value="monthly"
            text="Monthly"
          />
          <vs-select-item
            value="annually"
            text="Annually"
          />
        </vs-select>
      </vs-col>
    </vs-row>
    <vs-button @click="addEvent" :disabled="adding">Add Event</vs-button>
  </vx-card>
</template>

<script>
import { addEvent } from '@/api/events'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

export default {
  data() {
    return {
      eventName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      allDay: false,
      recurring: false,
      recurringFreq: '',
      avatar: '',
      file: '',
      notes: '',
      location: '',
      cost: '',
      adding: false,
      error: null
    }
  },
  components: {
    'vue-timepicker': VueTimepicker
  },
  watch: {
    allDay (newValue) {
      if (newValue) {
        this.startTime = '00:00'
        this.endTime = '23:59'
      } else {
        this.startTime = ''
        this.endTime = ''
      }
    }
  },
  methods: {
    fileChange() {
      this.file = this.$refs.photo.filesx
    },
    removeFiles() {
      this.file = null
    },
    avatarChange() {
      this.avatar = this.$refs.avatar.filesx[0]
    },
    async addEvent() {
      this.adding = true
      this.error = null
      let payload = new FormData()
      payload.append('eventName', this.eventName)
      payload.append('startDate', this.startDate)
      payload.append('endDate', this.endDate)
      payload.append('startTime', this.startTime)
      payload.append('endTime', this.endTime)
      if (this.allDay) {
        payload.append('allDay', this.allDay)
      }
      // if recurring event, set recurring frequency, else false
      payload.append('recurring', this.recurring ? this.recurringFreq : this.recurring)
      payload.append('location', this.location)
      if (this.notes) {
        payload.append('notes', this.notes)
      }
      if (this.cost) {
        payload.append('cost', this.cost)
      }
      if (this.file) {
        payload.append('file', this.file[0])
      }

      try {
        const { data } = await addEvent(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/events/manage')
      } catch (error) {
        const err = error.response ? error.response.data.message : error.message
        this.$vs.notify({
          title: 'Warning',
          text: err,
          color: 'warning'
        })
        this.adding = false
      }
    }
  }
}
</script>

<style lang="scss">
label {
  padding-left: 5px;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7);
  display: block;
}
input#start,
input#end {
  color: inherit;
  position: relative;
  border-radius: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.7rem 1rem 0.7rem 3rem;
}
</style>
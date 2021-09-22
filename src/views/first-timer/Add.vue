<template>
  <vx-card id="member">
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="First Name"
          v-model="firstName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Last Name"
          v-model="lastName"
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
          label="Phone Number"
          v-model="phoneNumber"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Email"
          type="email"
          v-model="email"
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
          label="Date"
          type="date"
          v-model="date"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="text-sm mb-xs">Time</p>
        <vue-timepicker id="start" class="my-3" input-width="90%" v-model="time"></vue-timepicker>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Address"
          v-model="address"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Occupation"
          v-model="occupation"
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
          label="Preferred Visiting Day"
          type="date"
          v-model="visitingDay"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="text-sm mb-xs">Preferred Visiting Time</p>
        <vue-timepicker id="start" class="my-3" input-width="90%" v-model="visitingTime"></vue-timepicker>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Select Event" v-model="event" autocomplete>
          <vs-select-item
            :key="event.id"
            :value="event.id"
            :text="event.title"
            v-for="event in events"
          />
        </vs-select>
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Prayer Requests/Comments"
          v-model="commentsAndPrayers"
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
          label="Aspect of the Service Enjoyed"
          v-model="aspectEnjoyed"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Aspect of the Service to improve on"
          v-model="aspectToImproveOn"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-button @click="addFirstTimer" :disabled="adding">Add First Timer</vs-button>
  </vx-card>
</template>

<script>
import { viewEvents } from '@/api/events'
import { addFirstTimer } from '@/api/first-timer'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

export default {
  components: {
    'vue-timepicker': VueTimepicker
  },
  data() {
    return {
      events: [],
      event: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
      date: '',
      time: '',
      occupation: '',
      aspectEnjoyed: '',
      aspectToImproveOn: '',
      commentsAndPrayers: '',
      visitingDay: '',
      visitingTime: '',
      adding: false,
      error: null
    }
  },
  async created () {
    try {
      const { data } = await viewEvents()
      let events = []
      for (let i = 0; i < data.events.length; i++) {
        let ev = {}
        ev.title = data.events[i].eventName
        ev.start = data.events[i].start.date
        ev.end = data.events[i].end.date
        ev.id = data.events[i]._id
        ev.allDay = data.events[i].allDay
        events.push(ev)
      }
      this.events = events
    } catch (error) {
      this.$vs.notify({
        title: 'Warning',
        text: error.response ? error.response.data.message : error.message,
        color: 'warning'
      })
    }
  },
  methods: {
    async addFirstTimer() {
      this.adding = true
      this.error = null
      const payload = {
        event: this.event,
        fullname: `${this.firstName} ${this.lastName}`,
        phoneNumber: this.phoneNumber,
        address: this.address,
        email: this.email,
        date: this.date,
        time: this.time,
        occupation: this.occupation,
        aspectEnjoyed: this.aspectEnjoyed,
        aspectToImproveOn: this.aspectToImproveOn,
        commentsAndPrayers: this.commentsAndPrayers,
        visitingDay: this.visitingDay,
        visitingTime: this.visitingTime,
      }

      try {
        const { data } = await addFirstTimer(payload)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.$router.push('/first-timers/manage')
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response ? error.response.data.message : error.message,
          color: 'warning'
        })
        this.adding = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
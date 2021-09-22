<template>
  <div>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="First Name"
          v-model="editDetails.firstName"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Last Name"
          v-model="editDetails.lastName"
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
          v-model="editDetails.phoneNumber"
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
          v-model="editDetails.email"
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
          label="Address"
          v-model="editDetails.address"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-input
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Occupation"
          v-model="editDetails.occupation"
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
          v-model="editDetails.visitingDay"
          type="date"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <p class="text-sm mb-xs">Preferred Visiting Time</p>
        <vue-timepicker id="start" class="my-3" input-width="90%" v-model="editDetails.visitingTime"></vue-timepicker>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" vs-sm="12">
        <vs-select class="w-4/5 mb-6" label="Select Event" v-model="editDetails.eventType" autocomplete>
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
          v-model="editDetails.commentsAndPrayers"
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
          v-model="editDetails.aspectEnjoyed"
          class="w-4/5 mb-6"
        />
      </vs-col>
      <vs-col vs-w="6" vs-sm="12">
        <vs-textarea
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label="Aspect of the Service Not Enjoyed"
          v-model="editDetails.aspectToImproveOn"
          class="w-4/5 mb-6"
        />
      </vs-col>
    </vs-row>
    <vs-alert v-if="error" color="danger">{{ error }}</vs-alert>
    <vs-button color="primary" @click="edit" :disabled="editing">Edit Details</vs-button>
  </div>
</template>

<script>
import { viewEvents } from '@/api/events'
import { editFirstTimer } from '@/api/first-timer'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

export default {
  props: {
    data: {
      type: Object
    }
  },
  components: {
    'vue-timepicker': VueTimepicker
  },
  data() {
    return {
      events: [],
      editDetails: this.data,
      error: null,
      success: null,
      editing: false
    }
  },
  watch: {
    data(newValue) {
      this.editDetails = newValue
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
    async edit() {
      this.error = null
      this.success = null
      this.editing = true
      const payload = {
        event: this.editDetails.eventType,
        fullname: `${this.editDetails.firstName} ${this.editDetails.lastName}`,
        phoneNumber: this.editDetails.phoneNumber,
        address: this.editDetails.address,
        email: this.editDetails.email,
        occupation: this.editDetails.occupation,
        aspectEnjoyed: this.editDetails.aspectEnjoyed,
        aspectToImproveOn: this.editDetails.aspectToImproveOn,
        commentsAndPrayers: this.editDetails.commentsAndPrayers,
        visitingDay: this.editDetails.visitingDay,
        visitingTime: this.editDetails.visitingTime,
      }

      try {
        const { data } = await editFirstTimer(payload, this.editDetails._id)
        this.$emit('details-edited')
        this.success = data.message
        this.editing = false
      } catch (error) {
        this.error = error.response.data.message
        this.editing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
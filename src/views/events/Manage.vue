<template>
  <vx-card>
    <p v-if="loadingEvents">Events loading, please wait...</p>
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      @eventClick="eventClicked"
      :events="events"
    />
    <vs-popup class="holamundo" title="Event Details" :active.sync="showDetails">
      <div v-if="viewEvent">
        <img :src="selectedEvent.featuredImage" alt />
        <p>
          <strong>Event Name:</strong>
          {{ selectedEvent.eventName }}
        </p>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>Start Date:</strong>
              {{ selectedEvent.start.date }}
            </p>
          </vs-col>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>Start Time:</strong>
              {{ selectedEvent.start.time }}
            </p>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>End Date:</strong>
              {{ selectedEvent.end.date }}
            </p>
          </vs-col>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>End Time:</strong>
              {{ selectedEvent.end.time }}
            </p>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>All Day:</strong>
              {{ selectedEvent.allDay }}
            </p>
          </vs-col>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>Recurring:</strong>
              {{ selectedEvent.recurring }}
            </p>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>Cost:</strong>
              {{ selectedEvent.cost }}
            </p>
          </vs-col>
          <vs-col vs-w="6" vs-sm="12">
            <p>
              <strong>Location:</strong>
              {{ selectedEvent.location }}
            </p>
          </vs-col>
        </vs-row>

        <p>
          <strong>Notes:</strong>
          {{ selectedEvent.notes }}
        </p>
        <vs-button class="my-5" @click="viewEvent = false">Edit</vs-button>
      </div>
      <div v-else>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <!-- <vs-upload
              text="Add Photos"
              multiple
              accept=".jpg, .png"
              ref="photo"
              @change="fileChange"
              @on-delete="removeFiles"
            />-->
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <vs-input
              icon-no-border
              icon="icon icon-user"
              icon-pack="feather"
              label-placeholder="Event Name"
              v-model="editDetails.eventName"
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
              type="date"
              label="Start Date"
              v-model="editDetails.start.date"
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
              v-model="editDetails.end.date"
              class="w-4/5 mb-6"
            />
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <label for="start">Start Time</label>
            <vue-timepicker
              id="start"
              class="my-3"
              input-width="90%"
              v-model="editDetails.start.time"
            ></vue-timepicker>
          </vs-col>
          <vs-col vs-w="6" vs-sm="12">
            <label for="end">End Time</label>
            <vue-timepicker id="end" class="my-3" input-width="90%" v-model="editDetails.end.time"></vue-timepicker>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <vs-input
              icon-no-border
              icon="icon icon-user"
              icon-pack="feather"
              label-placeholder="Location"
              v-model="editDetails.location"
              class="w-4/5 mb-6"
            />
          </vs-col>
          <vs-col vs-w="6" vs-sm="12">
            <vs-input
              icon-no-border
              icon="icon icon-user"
              icon-pack="feather"
              label-placeholder="Cost"
              v-model="editDetails.cost"
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
              v-model="editDetails.notes"
              class="w-4/5 mt-5 mb-6"
            />
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col vs-w="6" vs-sm="12">
            <vs-checkbox v-model="editDetails.allDay" class="mb-3">All Day?</vs-checkbox>
          </vs-col>
          <vs-col vs-w="6" vs-sm="12">
            <vs-checkbox v-model="editDetails.recurring" class="mb-3">Recurring Event?</vs-checkbox>
          </vs-col>
        </vs-row>
        <vs-button color="dark" type="flat" class="my-5" @click="viewEvent = true">Cancel</vs-button>
        <vs-button class="my-5" @click="updateDetails" :disabled="adding">Update Details</vs-button>
      </div>
    </vs-popup>
  </vx-card>
</template>

<script>
import { viewEvents, editEvent } from '@/api/events'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

export default {
  components: {
    FullCalendar,
    'vue-timepicker': VueTimepicker
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin],
      events: [],
      eventData: [],
      showDetails: false,
      selectedEvent: {
        start: {},
        end: {}
      },
      editDetails: {
        start: {},
        end: {}
      },
      viewEvent: true,
      adding: false,
      loadingEvents: false,
    }
  },
  mounted() {
    this.getEvents()
  },
  methods: {
    async getEvents() {
      this.loadingEvents = true
      try {
        const { data } = await viewEvents()
        this.eventData = data.events
        let events = []
        for (let i = 0; i < data.events.length; i++) {
          let ev = {}
          ev.title = data.events[i].eventName
          ev.start = data.events[i].start.date
          ev.end = data.events[i].end.date
          ev.groupId = data.events[i]._id
          ev.id = i
          ev.allDay = data.events[i].allDay
          events.push(ev)
        }
        this.events = events
        this.loadingEvents = false
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message || error.message,
          color: 'warning'
        })
        this.loadingEvents = false
      }
    },
    async updateDetails() {
      this.adding = true
      this.error = null
      let payload = new FormData()
      payload.append('eventName', this.editDetails.eventName)
      payload.append('startDate', this.editDetails.start.date)
      payload.append('endDate', this.editDetails.end.date)
      payload.append('startTime', this.editDetails.start.time)
      payload.append('endTime', this.editDetails.end.time)
      payload.append('allDay', this.editDetails.allDay)
      payload.append('recurring', this.editDetails.recurring)
      payload.append('location', this.editDetails.location)
      payload.append('notes', this.editDetails.notes)
      payload.append('cost', this.editDetails.cost)

      try {
        const { data } = await editEvent(payload, this.editDetails._id)
        this.$vs.notify({
          title: 'success',
          text: data.message,
          color: 'success'
        })
        this.adding = false
        this.showDetails = true
      } catch (error) {
        this.$vs.notify({
          title: 'Warning',
          text: error.response.data.message,
          color: 'warning'
        })
        this.adding = false
      }
    },
    eventClicked(data) {
      const index = parseInt(data.event.id, 10)
      this.selectedEvent = this.eventData[index]
      this.editDetails = this.eventData[index]
      this.showDetails = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
</style>
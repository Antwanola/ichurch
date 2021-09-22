<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: ['selectedEvent']
}
</script>

<style lang="scss" scoped>
</style>
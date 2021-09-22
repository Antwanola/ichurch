<template>
  <div>
    <GmapMap
      :center="computeCoordinates()"
      :zoom="5"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        :position="computeCoordinates()"
        :title="data.name"
        :clickable="true"
        :draggable="false"
        @click="openInfoWindowTemplate(data)"
      />

      <GmapInfoWindow
        :options="{ minWidth: 300 }"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open=false"
      >
        <div v-html="infoWindow.template"></div>
      </GmapInfoWindow>
    </GmapMap>
    <p class="mt-4">
      <strong>Name:</strong>
      {{ data.name }}
    </p>
    <p>
      <strong>Address:</strong>
      {{ data.address }}
    </p>
    <p>
      <strong>State:</strong>
      {{ data.state }}
    </p>
    <p>
      <strong>Area:</strong>
      {{ data.area }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: ''
      }
    }
  },
  methods: {
    computeCoordinates () {
      if (!this.data.hasOwnProperty('coordinates')) {
        return { lat: 0, lng: 0}
      }
      return { lat: this.data.coordinates.latitude, lng: this.data.coordinates.longitude }
    },
    openInfoWindowTemplate (data) {
      this.infoWindow.template = data.name
      this.infoWindow.position = { lat: data.coordinates.latitude, lng: data.coordinates.longitude }
      this.infoWindow.open = true
    }
  },
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 10px;
}
</style>
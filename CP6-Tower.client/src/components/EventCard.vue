<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="elevation-6 rounded bg-info">
      <img :src="event.coverImg" alt="event picture" class="img-fluid card-img rounded-top">
      <div class="text-start fw-bold p-2">
        <div>{{ event.name }}</div>
        <div class="d-flex justify-content-between">
          <div>Spots Left: {{ event.capacity }}</div>
          <div v-if="event.isCanceled == true" class="text-warning"> Event Canceled! </div>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.elevation-6 {
  box-shadow: 3pt 3pt rgb(162, 239, 255);
}

.card-img {
  height: 20vh;
  width: 100%;
  object-fit: cover;
}
</style>
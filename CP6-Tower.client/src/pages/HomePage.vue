<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 bg-info elevation-3 rounded d-flex justify-content-around p-2">
        <button @click="filterBy = 'sport'" class="btn btn-success fw-bold">SPORTS</button>
        <button @click="filterBy = 'concert'" class="btn btn-success fw-bold">CONCERTS</button>
        <button @click="filterBy = 'convention'" class="btn btn-success fw-bold">CONVENTIONS</button>
        <button @click="filterBy = 'digital'" class="btn btn-success fw-bold">DIGITAL</button>
        <button @click="filterBy = ''" class="btn btn-success fw-bold">ALL</button>
      </div>
    </div>
    <div class="row my-4">
      <div v-for="e in events" class="col-12 col-md-3 mb-2 p-2">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";
import EventCard from "../components/EventCard.vue";
import { AppState } from "../AppState.js";
export default {
  setup() {
    const filterBy = ref("");
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getAllEvents();
    });
    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterBy.value)
        }
      })
    };
  },
  components: { EventCard }
};
</script>


<style lang="scss" scoped>

</style>

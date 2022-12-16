<template>
  <div class="container-fluid">
    <div v-if="account.id" class="row">
      <div class="col-12 p-2">
        <div class="fw-bold fs-2">My Tickets!</div>
      </div>
      <div v-for="t in myTickets" class="col-12 col-md-3 mb-4 p-3">
        <EventCard :event="t.event" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue';
import { ticketsService } from '../services/TicketsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  setup() {
    const route = useRoute()
    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getMyTickets()
    })
    return {
      myTickets: computed(() => AppState.myTickets),
      account: computed(() => AppState.account),
    };
  },
  components: { EventCard }
}
</script>

<style scoped>

</style>

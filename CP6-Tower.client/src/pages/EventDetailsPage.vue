<template>
  {{ event.name }}
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { ticketsService } from '../services/TicketsService';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute()
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getEventById()
      // getCommentsByEventId()
      // getTicketsByEventId()
    })
    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      foundMe: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),

      // async createTicket(){
      //   try {
      //     await ticketsService.createTicket({ eventId: route.params.eventId})
      //   } catch (error) {
      //     logger.error(error)
      //     Pop.error(message.error)
      //   }
      // }

      // async removeTicket(ticketId){
      //   try {
      //     if(await Pop.confirm())
      //     await ticketsService.removeTicket(ticketId)
      //   } catch (error) {
      //     logger.error(error)
      //     Pop.error(message.error)
      //   }
      // }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
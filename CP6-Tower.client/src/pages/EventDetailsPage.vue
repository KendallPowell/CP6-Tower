<template>
  <div class="container-fluid gx-0">
    <div class="text-primary" :style="`background-image: url(${event.coverImg})`">
      <div class="col-12 d-flex back-cover-img">
        <div class="m-1">
          <img :src="event.coverImg" alt="Image Link is Bad" class="cover-img">
          <p class="mb-2 p-1">Location: {{ event.location }}</p>
          <p class="mb-2 p-1">Date: {{ ComputeDate(event.startDate) }}</p>
          <div v-if="event.isCanceled == false">
            <p v-if="event.capacity != 0" class="mb-4 p-1">Spots Left = {{ event.capacity
            }}</p>
            <p v-else="event.capacity == 0" class="mb-4 p-1 ">No Spots Left</p>
          </div>
          <button v-if="event.isCanceled == false && !foundMe" @click="createTicket()" :disabled="event.capacity == 0"
            class="bg-transparent rounded mb-2 p-1 text-primary border-info">Get Your
            Ticket Now!</button>
          <button v-else-if="event.isCanceled == false && foundMe" @click="removeTicket(foundMe.id)"
            class="bg-transparent rounded mb-2 text-danger btn btn-outline-danger">Sell Your Ticket?</button>
          <div v-if="event.isCanceled == true" class="mt-5 p-1 text-danger fs-3 fw-bold">Event Has Been
            Canceled</div>
        </div>
        <div v-if="event.creatorId == account.id" @click="cancelEvent(event.id)">
          <button><i class="mdi mdi-cancel text-danger fw-bold fs-1"></i></button>
        </div>
        <div class="bg-transparent rounded p-3 ms-3">
          <div class="row p-1">
            <h3 class="mb-5">Name: {{ event.name }} / Type: {{ event.type }}</h3>
            <h5 class="mb-2">Description: "{{ event.description }}""</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 bg-secondary">
      <div v-for="t in tickets">
        <img :src="t.profile.picture" alt="ticket holder picture"
          class="img-fluid elevation-6 rounded-circle profile-picture m-3" :title="t.profile.name">
      </div>
    </div>
    <div class="col-12 mt-4 mb-3 d-flex justify-content-center">
      <CommentForm v-if="account.id" />
    </div>
  </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';
import { eventsService } from '../services/EventsService';
import { ticketsService } from '../services/TicketsService';
import { useRoute } from 'vue-router';
import CommentForm from '../components/CommentForm.vue';
export default {
  props: { event: { type: Event, required: true } },
  setup(props) {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    async function getTicketsByEventId() {
      try {
        await ticketsService.getTicketsByEventId(route.params.eventId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getEventById();
      getCommentsByEventId();
      getTicketsByEventId();
    });
    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      foundMe: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),
      async createTicket() {
        try {
          await ticketsService.createTicket({ eventId: route.params.eventId });
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },
      async removeTicket(ticketId) {
        try {
          if (await Pop.confirm())
            await ticketsService.removeTicket(ticketId);
        }
        catch (error) {
          logger.error(error);
          Pop.error(message.error);
        }
      },
      async cancelEvent() {
        try {
          await eventsService.cancelEvent(props.event.id)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
      ComputeDate(date) {
        return new Date(date).toLocaleDateString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
      },
    };
  },
  components: { CommentForm }
};
</script>


<style lang="scss" scoped>
.back-cover-img {
  height: 55vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(3px);
  background: rgba(21, 0, 27, 0.808);
  background-blend-mode: darken;
}

.cover-img {
  height: 30vh;
  width: 20vw;
}

.elevation-6 {
  box-shadow: 2pt 2pt whitesmoke;
}

.profile-picture {
  height: 5vh;
  width: 5vh;
}

.comment {
  display: flex;
  gap: 1rem;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  justify-content: space-between;
}
</style>
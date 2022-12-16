<template>
  <div class="modal-header">
    <h1 class="modal-title fs-4" id="exampleModalLabel">Create New Event</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <form @submit.prevent="createEvent()">
    <div class="modal-body">
      <div class="form-floating elevation-4">
        <input v-model="editable.name" type="text" required class="form-control mb-3" placeholder="Event Name">
        <label for="name">Event Name</label>
      </div>
      <div class="form-floating elevation-4">
        <input v-model="editable.description" type="text" required class="form-control mb-3"
          placeholder="About the Event">
        <label for="description">About the Event</label>
      </div>
      <div class="form-floating elevation-4">
        <input v-model="editable.location" type="text" required class="form-control mb-3" placeholder="Location">
        <label for="location">Location</label>
      </div>
      <div class="form-floating elevation-4">
        <input v-model="editable.capacity" type="number" required class="form-control mb-3" placeholder="Max Capacity">
        <label for="capacity">Max Capacity</label>
      </div>
      <div class="form-floating elevation-4">
        <input v-model="editable.coverImg" type="url" required class="form-control mb-3" id="coverImg"
          placeholder="Cover Image">
        <label for="CoverImg">Cover Image</label>
      </div>
      <div class="form-floating mb-3 elevation-4">
        <select v-model="editable.type" class="form-select" id="floatingSelect"
          aria-label="Floating label select example">
          <option value="digital">Digital</option>
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
        </select>
        <label for="floatingSelect">Type of Event</label>
      </div>
      <div class="form-floating mb-3 elevation-4 w-25">
        <input v-model="editable.startDate" required type="date">
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Create Album</button>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { Modal } from 'bootstrap';
import { eventsService } from "../services/EventsService.js";
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createEvent() {
        try {
          const event = await eventsService.createEvent(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#eventModal').hide()
          router.push({ name: 'Event', params: { eventId: event.id } })
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
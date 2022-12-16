<template>
    <form @submit.prevent="createComment()" class="bg-secondary rounded p-3 col-9">
        <div class="form-group">
            <input type="text" required name="body" id="body" v-model="editable.body" class="form-control mb-1"
                placeholder="Wanna add a comment to the event" maxlength="75">
            <label for="body"></label>
        </div>
        <button class="btn btn-info rounded p-1">Write Comment <i class="mdi mdi-pencil"></i></button>
    </form>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { commentsService } from '../services/CommentsService';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';

const route = useRoute();
const editable = ref({})
async function createComment() {
    try {
        editable.value.eventId = route.params.eventId
        await commentsService.createComment(editable.value)
        Pop.toast('Comment Created', 'success')
        editable.value = {}
    } catch (error) {
        logger.error(error)
        Pop.error(error)
    }
}
</script>


<style lang="scss" scoped>

</style>
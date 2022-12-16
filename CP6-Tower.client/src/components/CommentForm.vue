<template>
    <form @click.prevent="createComment">
        <div class="form-group">
            <input type="text" required name="body" id="body" class="form-control mb-1"
                placeholder="Wanna add a comment to the event">
            <label for="body"></label>
        </div>
        <button class="btn btn-info rounded p-1">Write Comment <i class="mdi mdi-pencil"></i></button>
    </form>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
async function createComment() {
    let form = event.target
    let rawComment = {
        body: form.body
    }
    try {
        await commentsService.createComment(rawComment)
        Pop.toast('Comment Created', 'success')
        form.reset()
    } catch (error) {
        logger.error(error)
        Pop.error(error)
    }
}
</script>


<style lang="scss" scoped>

</style>
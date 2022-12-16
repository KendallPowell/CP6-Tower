<template>
    <form @click.prevent="createComment()">
        <div class="form-floating">
            <input type="text" required class="form-control mb-1" placeholder="Wanna add a comment to the event">
            <label for="body">Comment</label>
        </div>
        <button class="btn btn-info rounded p-1">Write Comment <i class="mdi mdi-pencil"></i></button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { commentsService } from '../services/CommentsService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
export default {
    setup() {
        return {
            async createComment() {
                try {
                    await commentsService.createComment()
                    Pop.toast('Comment Created', 'success')
                    form.reset()
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>

</style>
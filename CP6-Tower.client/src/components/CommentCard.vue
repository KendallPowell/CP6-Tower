<template>
  <div class="row my-2 comment elevation-3 bg-secondary">
    <div class="col-4">
      <img :src="comment.creator.picture" alt="account picture" title="comment owner" class="creatorImg">
      {{ comment.creator.name }}
    </div>
    <div class="col-6 text-end">
      <button v-if="comment.creatorId == account.id" @click="removeComment(comment.id)"
        class="btn btn-danger  delete-btn rounded-pill me-3" title="Delete this Comment?">
        <i class="mdi mdi-delete text-white fs-4"></i>
      </button>
    </div>
    <div>
      {{ comment.body }}
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeComment() {
        try {
          if (await Pop.confirm())
            await commentsService.removeComment(props.comment.id)
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
.creatorImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  cursor: pointer;
}

.post {
  display: flex;
  gap: 1rem;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  justify-content: space-between;
}
</style>
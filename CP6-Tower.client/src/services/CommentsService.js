import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {
    async getCommentsByEventId(eventId) {
        const res = await api.get('api/events/' + `${eventId}/comments`)
        logger.log('[get comments by event id]', res.data)
        AppState.comments = res.data
    }

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log(res.data)
        AppState.comments.push(res.data)
    }

    async removeComment(id) {
        const res = await api.delete('api/comments/' + id)
        logger.log('[remove comment]', res.data)
    }
}

export const commentsService = new CommentsService()
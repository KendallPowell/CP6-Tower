import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class CommentsService {
  async create(body) {
    const event = await eventsService.getOne(body.eventId)
    if (event.isCanceled == true) throw new Forbidden("Can't Comment on this event cause its canceled")

    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }

  async getAll(query) {
    const comments = await dbContext.Comments.find(query).populate('creator')
    return comments
  }

  async remove(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) throw new BadRequest("there isn't a comment with that id:" + commentId)
    if (comment.creatorId != userId) throw new Forbidden("I do not think this is yours..")

    await comment.remove()
    return `removed comment: "${comment.body}. by: ${comment.creatorId}"`
  }
}

export const commentsService = new CommentsService()
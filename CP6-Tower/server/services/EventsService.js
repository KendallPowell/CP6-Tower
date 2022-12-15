import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class EventsService {
  async create(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator')
    return event
  }

  async getAll() {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }

  async getOne(id) {
    const event = await dbContext.Events.findById(id).populate('creator')
    if (!event) throw new BadRequest(`There is no event by id: ${id}`)
    return event
  }

  async update(eventId, eventData, userId) {
    const original = await dbContext.Events.findById(eventId)
    if (!original) throw new BadRequest('no event at id:' + eventId)
    if (original.creatorId != userId) throw new Forbidden("this event is not yours to change!")

    if (original.isCanceled == true) throw new BadRequest('event at id:' + eventId + 'has been canceled')


    original.name = eventData.name ? eventData.name : original.name
    original.description = eventData.description ? eventData.description : original.description
    original.coverImg = eventData.coverImg ? eventData.coverImg : original.coverImg
    original.location = eventData.location ? eventData.location : original.location
    original.capacity = eventData.capacity !== undefined ? eventData.capacity : original.capacity
    original.type = eventData.type ? eventData.type : original.type

    await original.save()
    return original
  }
  async cancel(eventId, userId) {
    const event = await this.getOne(eventId)
    if (event.creatorId != userId) throw new Forbidden('not your event to cancel')
    event.isCanceled = !event.isCanceled
    await event.save()
  }
}

export const eventsService = new EventsService()
import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
  async create(body) {
    const event = await eventsService.getOne(body.eventId)
    if (event.isCanceled == true) throw new BadRequest('This event is closed')

    const ticket = await dbContext.Tickets.create(body)
    event.capacity -= 1
    await event.save()
    await ticket.populate('profile event')
    return ticket

  }
}

export const ticketsService = new TicketsService()
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
  async create(body) {
    const event = await eventsService.getOne(body.eventId)
    if (event.isCanceled == true) throw new BadRequest('This event is closed')
    if (event.capacity == 0) throw new BadRequest('This event is sold out, sorry')
    const ticket = await dbContext.Tickets.create(body)
    event.capacity -= 1
    await event.save()
    await ticket.populate('profile event')
    return ticket
  }

  async remove(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('profile event')
    if (!ticket) throw new BadRequest(`no ticket at id: ${ticketId}`)

    if (ticket.accountId != userId) throw new Forbidden('this ticket does not belong to you!')

    const event = await eventsService.getOne(ticket.eventId)
    if (event.isCanceled == true) throw new Forbidden("Can't remove what's not there")

    await ticket.remove()

    event.capacity += 1
    await event.save()

    return `ticket for ${event.name} has been removed.`
  }

  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets
  }

  async getTicketsForEvents(eventId) {
    let tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return tickets
  }
}

export const ticketsService = new TicketsService()
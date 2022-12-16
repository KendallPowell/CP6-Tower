import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {

    async getTicketsByEventId(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log('[get tickets by event id]', res.data)
        AppState.tickets = res.data
    }

    async getMyTickets() {
        const res = await api.get('account/tickets')
        logger.log('[get my tickets]', res.data)
        AppState.myTickets = res.data
    }

    async createTicket(body) {
        const res = await api.post('api/tickets', body)
        logger.log('[create ticket]', res.data)
        AppState.tickets.push(res.data)
        AppState.myTickets.push(res.data)
        AppState.activeEvent.capacity--
    }

    async removeTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log(res.data)
        AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId)
        AppState.myTickets = AppState.myTickets.filter(t => t.id !== ticketId)
        AppState.activeEvent.capacity++
    }
}

export const ticketsService = new TicketsService()
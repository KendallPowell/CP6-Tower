import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log('[got all events]', res.data)
    AppState.events = res.data
  }

  async getEventById(eventId) {
    const res = await api.get('api/events/' + eventId)
    logger.log('[got event by id]', res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(body) {
    const res = await api.post('api/events', body)
    logger.log('[created Event]', res.data)
    AppState.events.push(res.data)
    return res.data
  }

  async getMyEvents() {
    const res = await api.get('account/events')
    logger.log('[get my events]', res.data)
    AppState.events = res.data
  }

  async cancelEvent(id) {
    const res = await api.delete('api/events/' + id)
    logger.log('[event canceled]', res.data)
  }
}

export const eventsService = new EventsService()
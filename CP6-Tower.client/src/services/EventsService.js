import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log('[got all events]', res.data)
    AppState.events = res.data
  }
}

export const eventsService = new EventsService()
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";



export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/comments', this.getCommentsInEvent)
      .get('/:id/tickets', this.getTicketsForEvents)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.cancel)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const events = await eventsService.getAll()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const event = await eventsService.getOne(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsForEvents(req, res, next) {
    try {
      let tickets = await ticketsService.getTicketsForEvents(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsInEvent(req, res, next) {
    try {
      const comments = await commentsService.getAll({ eventId: req.params.id })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const updated = await eventsService.update(req.params.id, req.body, req.userInfo.id)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      const message = await eventsService.cancel(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}

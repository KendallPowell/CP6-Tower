import { Schema } from "mongoose";



export const CommentSchema = new Schema({
  body: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'event' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})


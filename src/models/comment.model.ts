import { Schema, model } from "mongoose"

const CommentSchema = new Schema({
  phrase: {
    type: String,
    required: true,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "articles",
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
})

export const commentModel = model("comment", CommentSchema)

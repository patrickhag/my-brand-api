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
    required: true,
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
})

export const commentModel = model("comment", CommentSchema)

import { Schema, model } from 'mongoose'

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
      phrase: String,
    },
  ],
})

export const articleModel = model('Articles', ArticleSchema)

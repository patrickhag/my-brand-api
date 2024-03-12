import { Schema, model } from "mongoose"

const ProjectSchema = new Schema({
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
    required: true,
  },
  tools: {
    type: String,
    required: true,
  },
})

export const projectModel = model("Projects", ProjectSchema)

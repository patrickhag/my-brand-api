import { Schema, model } from "mongoose"

const SkillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

export const skillModel = model("Skills", SkillSchema)

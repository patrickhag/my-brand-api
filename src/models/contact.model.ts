import { Schema, model } from "mongoose"

const ContactSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

export const contactModel = model("contact-me", ContactSchema)

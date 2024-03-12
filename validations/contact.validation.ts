import joi from "joi"

interface IMessages {
  fullName: String
  phoneNumber: Number
  message: String
  email: String
}

const messageSchema = joi.object<IMessages>({
  fullName: joi.string().required(),
  phoneNumber: joi.number().max(13),
  message: joi.string().required().min(50).max(600),
  email: joi.string().required().email(),
})

export default messageSchema

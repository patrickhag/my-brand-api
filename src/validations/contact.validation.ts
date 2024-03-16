import joi from "joi"

interface IMessages {
  fullName: String
  phoneNumber: String
  message: String
  email: String
}

const messageSchema = joi.object<IMessages>({
  fullName: joi.string().required(),
  phoneNumber: joi.number().min(5),
  message: joi.string().required().min(20).max(600),
  email: joi.string().required().email(),
})

export default messageSchema

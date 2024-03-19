import joi from "joi"

interface IProject {
  title: String
  summary: String
  body: String
  tools: String
}

const projectSchema = joi.object<IProject>({
  title: joi.string().required().min(5).max(60),
  summary: joi.string().required(),
  tools: joi.string().required().min(19),
})

export default projectSchema

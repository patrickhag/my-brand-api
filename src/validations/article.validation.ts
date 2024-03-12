import joi from "joi"

interface IBlog {
  title: String
  summary: String
  body: String
  tag: String
}

const blogSchema = joi.object<IBlog>({
  title: joi.string().required(),
  summary: joi.string().required().min(50),
  body: joi.string().required(),
})

export default blogSchema

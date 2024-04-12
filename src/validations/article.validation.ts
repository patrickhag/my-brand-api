import joi from 'joi'

interface IBlog {
  title: string
  summary: string
  body: string
}

const blogSchema = joi.object<IBlog>({
  title: joi.string().required(),
  summary: joi.string().required().min(50),
  body: joi.string().required().min(50),
})

export default blogSchema

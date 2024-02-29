import { Schema, model } from "mongoose"

const ArticleSchema = new Schema({
  title: String,
  summary: String,
  body: String,
  bgPicture: String,
})

const articleModel = model("Articles", ArticleSchema)

export default articleModel

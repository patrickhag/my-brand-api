import request from "supertest"
import { articleModel as Article } from "../models/article.model"
import { Server } from "http"

let server: Server

describe("api/articles", () => {
  beforeEach(async () => {
    server = require("../index")
  })

  afterEach(async () => {
    server.close()
    await Article.deleteMany()
  })

  describe("Create an article Get /create-blog", () => {
    it("should return 200 if found a certain blog", async () => {
      const blog = new Article({
        title: "Lorem ipsum dolor sit amet.",
        summary: "testtesttesttesttesttesttesttesttesttesttest",
        body: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet ",
        cover: "uploads/image.png",
      })
      await blog.save()

      const response = await request(server).get(`api/blog/${blog._id}`)

      expect(response.status).toBe(200)
    })
  })
})

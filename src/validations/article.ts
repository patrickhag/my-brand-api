import request from "supertest"
import { app } from ".."
import { articleModel as Article } from "../models/article.model"

describe("Blogs controller", () => {
  it("should return status code 201 if new blog is created successfully", async () => {
    // Make the request with supertest
    const res = await request(app)
      .post("/blogs/new")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN!}`)
      .send({
        title: "Test Blog",
        category: "Technology",
        desc: "This is a test blog",
        tag: "test",
      })

    // Assert the response
    expect(res.status).toBe(201)
    expect(res.body.status).toBe("success")
    expect(res.body.Message).toBe("New blog created !")
  })
})

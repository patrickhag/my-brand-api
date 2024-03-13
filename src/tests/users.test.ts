import request from "supertest"
import { app } from ".."

describe("Users registration", () => {
  it("should return status code 201 and a success message if registration is successful", async () => {
    const newUser = {
      fullName: "John",
      email: "john.doe@example.com",
      password: "Password@123",
    }

    const res = await request(app).post("/api/register").send(newUser)

    expect(res.status).toBe(201)
    expect(res.body.Message).toBe("User Registered succesfully!")
  })
})

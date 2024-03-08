import mongoose from "mongoose"

beforeAll(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/my-brand-test-db")
    console.log("Connected to MongoDB ")
  } catch (error) {
    console.log("Error *** ", error)
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoose.connection.close()
})

import mongoose from "mongoose"
import dontenv from "dotenv"

dontenv.config()

const uri_test_db = process.env.DATABASE_URL_TEST as string

beforeAll(async () => {
  try {
    await mongoose.connect(`${uri_test_db}`)
    console.log("Connected to TestDB ")
  } catch (error) {
    console.log("Error *** ", error)
  }
}, 10000)

afterAll(async () => {
  await mongoose.disconnect()
  await mongoose.connection.close()
})

import express from "express"
import dotenv from "dotenv"
import articleRoutes from "./routes/articles"
import mongoose from "mongoose"

dotenv.config()
const app = express()

const uri = process.env.DATABASE_URL as string

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error)

app.use("/article", articleRoutes)

app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello world" })
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

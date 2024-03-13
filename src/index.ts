import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/user.routes"
import articleRoutes from "./routes/article.routes"
import skillRoutes from "./routes/skill.routes"
import projectRoutes from "./routes/project.routes"

dotenv.config()

export const app = express()

app.use(express.json())

const uri = process.env.DATABASE_URL as string

 mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(e.message))

app.use("/api", userRoutes)
app.use("/api/blog", articleRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/projects", projectRoutes)

app.get("*", (req, res) => {
  res.status(400).send("Error 404 page not found")
})

const PORT = process.env.PORT as string

const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

module.exports = server

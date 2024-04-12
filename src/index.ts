import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes'
import articleRoutes from './routes/article.routes'
import skillRoutes from './routes/skill.routes'
import projectRoutes from './routes/project.routes'
import cors from 'cors'
import swaggerui from 'swagger-ui-express'
import { swaggerdocs } from './docs/swaggerDocs'

dotenv.config()

export const app = express()

app.use(express.json())
app.use(cors())
app.use('/public/uploads/', express.static('public/uploads'))

const uri = process.env.DATABASE_URL ?? ''

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((e) => {
    console.error(e.message)
  })

app.use('/doc', swaggerui.serve, swaggerui.setup(swaggerdocs))

app.use('/api', userRoutes)
app.use('/api/blog', articleRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/projects', projectRoutes)

const PORT = process.env.PORT ?? ''

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

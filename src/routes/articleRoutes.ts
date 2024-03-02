import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.send("first blog")
})

export default router

import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.send("firs blog")
})

export default router

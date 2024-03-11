import { Router } from "express"
import { SkillsController } from "../controllers/skills.controller"
import { AuthMiddleWare } from "../middleware/auth.middleware"

const skillRoutes = Router()

skillRoutes.post(
  "/create-skill",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  SkillsController.createSkill
)

skillRoutes.put(
  "/update-skill/:id",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  SkillsController.updateSkill
)

export default skillRoutes

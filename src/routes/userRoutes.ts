import { Router } from "express"
import { UserController } from "../controllers/userController"
import { AuthMiddleWare } from "../middleware/authMiddleware"

const userRoutes = Router()

userRoutes.post("/register", UserController.registerUser)
userRoutes.post("/login", UserController.loginUser)
userRoutes.get(
  "/users",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  UserController.getAllUsers
)

export default userRoutes

import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { AuthMiddleWare } from "../middleware/auth.middleware"

const userRoutes = Router()

userRoutes.post("/register", UserController.registerUser)

userRoutes.post("/login", UserController.loginUser)
userRoutes.get(
  "/users",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  UserController.getAllUsers
)

userRoutes.post("/contact-me", UserController.contactMe)
userRoutes.post(
  "/all-contacts",
  AuthMiddleWare.isAuthenticated,
  AuthMiddleWare.checkRole,
  UserController.getAllContacts
)

export default userRoutes

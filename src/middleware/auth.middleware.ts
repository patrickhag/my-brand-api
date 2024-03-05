import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../helper/jwtSecret"
import { NextFunction, Request, Response } from "express"

type User = {
  userId: string
  role: string
  email: string
}

interface CustomRequest extends Request {
  user?: User
}

export class AuthMiddleWare {
  static async isAuthenticated(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authorization = req.headers.authorization as string
      if (!authorization) {
        return res.status(401).json({
          status: "fail",
          message: "Missing authorisation token",
        })
      }
      const token = authorization.split(" ")[1]

      if (!token) {
        return res.status(401).json({
          status: "fail",
          message: "Unathorised action",
        })
      }

      const user = jwt.verify(token, JWT_SECRET) as User
      req.user = user

      next()
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }
  static checkRole(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user as User
      if (user.role == "admin") {
        return next()
      }
      return res.status(403).json({
        status: "fail",
        message: "You do not have a permission to perform this task",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }
}

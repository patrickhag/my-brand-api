import { userModel as User } from "../models/userModel"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../helper/jwtSecret"

export class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { fullName, email, password, role } = req.body
      const userExist = await User.findOne({ email: email })
      if (userExist) {
        return res.status(400).json({
          status: "fail",
          msg: "Email is already taken",
        })
      }

      const hashPassword = bcrypt.hashSync(password, 12)

      await User.create({
        fullName,
        email,
        password: hashPassword,
        role,
      })

      return res.status(200).json({
        status: "success",
        msg: "User successfully created!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const userFound = await User.findOne({ email })
      if (!userFound) {
        return res.status(404).json({
          status: "fail",
          message: "Account does not exist",
        })
      }

      const isPasswordValid = await bcrypt.compare(password, userFound.password)
      if (!isPasswordValid) {
        return res.status(400).json({
          status: "fail",
          message: "Incorrect credentials",
        })
      }

      const token = jwt.sign(
        {
          userId: userFound._id,
          role: userFound.role,
          email: userFound.email,
        },
        JWT_SECRET
      )

      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await User.find().select("-password")
      return res.status(200).json({
        status: "sucess",
        data: allUsers,
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ msg: `${error}` })
      }
    }
  }
}

import { Request, Response } from "express"
import { userModel as User } from "../models/user.model"
import { contactModel as Contact } from "../models/contact.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../helper/jwtSecret"
import userSchema from "../validations/user.validation"
import messageSchema from "../validations/contact.validation"

export class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { fullName, email, password, role } = req.body
      const userExist = await User.findOne({ email: email })
      if (userExist) {
        return res.status(400).json({
          status: "fail",
          message: "Email is already taken",
        })
      }

      const { error } = userSchema.validate(req.body)
      if (error) {
        return res.status(400).json({
          status: "Bad request",
          message: "Missing Field(s)",
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
        message: "User successfully created!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ message: `${error}` })
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
          names: userFound.fullName,
        },
        JWT_SECRET,
        { expiresIn: "3d" }
      )

      return res.status(200).json({
        message: "Logged in successfully",
        token,
        userFound,
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ message: `${error}` })
      }
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await User.find().select("-password")
      return res.status(200).json({
        status: "success",
        data: allUsers,
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ message: `${error}` })
      }
    }
  }

  static async contactMe(req: Request, res: Response) {
    try {
      const { fullName, phoneNumber, email, message } = req.body
      console.log(req.body)
      const { error } = messageSchema.validate(req.body)

      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.details[0].message,
        })
      }

      await Contact.create({
        fullName,
        phoneNumber,
        email,
        message,
      })

      return res.status(200).json({
        status: "success",
        message: "Thank you sending message 😊",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ message: `${error}` })
      }
    }
  }

  static async getAllContacts(req: Request, res: Response) {
    try {
      const allContacts = await Contact.find()
      return res.status(200).json({
        status: "success",
        data: allContacts,
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ message: `${error}` })
      }
    }
  }

  static async deleteContact(req: Request, res: Response) {
    try {
      const { id } = req.params

      const deletedContact = await Contact.findByIdAndDelete(id)

      if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found" })
      }

      return res.status(200).json({
        status: "success",
        message: "Contact successfully deleted!",
      })
    } catch (error: unknown) {
      if (typeof error === "object") {
        return res.status(500).json({ message: `${error}` })
      }
    }
  }
}

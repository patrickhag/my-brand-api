import { Schema, model } from 'mongoose'

export interface IUser {
  _id: string
  fullName: string
  email: string
  password: string
  role: 'admin' | 'user'
  createAt: Date
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

export const userModel = model('users', userSchema)

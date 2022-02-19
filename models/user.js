import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10
export const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS)

export const comparePassword = async (plainTextPassword, hash) => {
  return bcrypt.compare(plainTextPassword, hash)
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'user', timestamps: true }
)

export const User = model('User', UserSchema)

export const createUser = async ({ email, name, password }) => {
  const hashedPassword = await hashPassword(password)

  const user = await User.create({ email, name, password: hashedPassword })
  return user
}

export const getUserById = async (id) => User.findOne({ _id: id }).lean()
export const getUserByEmail = async (email) =>
  User.findOne({ email: email }).lean()

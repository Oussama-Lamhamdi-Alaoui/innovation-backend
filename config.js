import * as dotenv from 'dotenv'

dotenv.config()

export const server = {
  port: process.env.PORT || '8080',
}

export const mongo = {
  uri: process.env.MONGO_URI,
}

export const jwt = {
  secret: process.env.JWT_SECRET,
  timeUnit: 'days',
  expiration: 1,
}

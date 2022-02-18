import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'

import * as config from './config.js'

const { jwt: jwtConfig } = config

// To generate a JWT we need to specify the expiration,
// a payload and sign it using our secret
export async function generateJWT({
  expiration = jwtConfig.expiration,
  timeUnit = jwtConfig.timeUnit,
  secret = jwtConfig.secret,
  user,
}) {
  const payload = {
    exp: dayjs().add(expiration, timeUnit).unix(),
    // Other dummy information this can be a user id /role in the future
    user: { id: user._id },
  }

  const token = jwt.sign(payload, secret)

  return token
}

export function getTokenFromHeader(req) {
  const hasToken =
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')

  return hasToken ? req.headers.authorization.split(' ')[1] : null
}

export function getAndVerifyJWT(requestObject) {
  try {
    const token = getTokenFromHeader(requestObject)
    if (token) {
      // @ts-expect-error
      const payload = jwt.verify(token, jwtSecret)
      return payload
    }
    return null
  } catch (err) {
    throw new Error('Invalid or Expired token!')
  }
}

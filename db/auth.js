import db from './connection'
import { compare } from 'bcrypt'

export async function login(username, password) {
  if (!(username && password))
    throw new Error('Must include username and password')
  const [[user]] = await db.query(
    `SELECT * FROM users WHERE username=?`,
    [username]
  )
  if (!user)
    throw new Error('User not found')
  const isPasswordCorrect= await compare(password, user.password)
  if (!isPasswordCorrect)
    throw new Error('Password is incorrect')
  return user
}
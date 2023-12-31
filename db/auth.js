import db from './connection'
import { compare } from 'bcrypt'

export async function login(username, password) {
  if (!(username && password))
    throw new Error('Must include username and password')
  console.log('about to query');
  const [[user]] = await db.query(
    `SELECT * FROM user_profiles WHERE username=?`,
    [username]
  )
  console.log('queried');
  if (!user)
    throw new Error('User not found')
  const isPasswordCorrect= await compare(password, user.password)
  if (!isPasswordCorrect)
    throw new Error('Password is incorrect')
  console.log('no issues');
  return user
}
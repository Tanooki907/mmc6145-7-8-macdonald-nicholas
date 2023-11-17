import db from './connection'
import { hash } from 'bcrypt'

export async function create(username, password) {
  console.log('running db user create', username, password)
  if (!(username && password))
    throw new Error('Must include username and password')
  const passwordHash = await hash(password, 10)
  await db.query(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, passwordHash]
  )
  const [[user]] = await db.query(
    `SELECT * FROM users WHERE username=?`,
    [username]
  )
  if (!user)
    throw new Error('Error inserting User')
  return user
}
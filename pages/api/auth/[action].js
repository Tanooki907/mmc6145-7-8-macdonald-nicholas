import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session"
import db from '../../../db'

export default withIronSessionApiRoute(
  function handler(req, res) {
    if (req.method !== 'POST')
      return res.status(404).end()
    switch(req.query.action) {
      case "login":
        return login(req, res)
      case "logout":
        return logout(req, res)
      case "signup":
        return signup(req, res)
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)

async function login(req, res) {
  const { username, password } = req.body
  console.log('starting');
  try {
    const {
      password: _,
      ...otherFields
    } = await db.auth.login(username, password)
    req.session.user = otherFields
    console.log('saving');
    await req.session.save()
    console.log('saved');
    console.log(req.session)
    res.redirect('/');
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}
async function logout(req, res) {
  await req.session.destroy()
  res.redirect('/')
}
async function signup(req, res) {
  try {
    const {username, password} = req.body
    const {
      password: _,
      ...otherFields
    } = await db.user.create(username, password)
    req.session.user = otherFields
    await req.session.save()
    console.log(req.session.user)
    res.redirect('/')
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}
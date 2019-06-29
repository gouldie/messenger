import { AuthenticationError } from 'apollo-server-express'
import { User } from './models'

const signedIn = req => req.session.userId

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.')
  }
}

export const attemptSignIn = async (username, password) => {
  const message = 'Incorrect username or password. Please try again.'

  const user = await User.findOne({ username })

  if (!user || !await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }

  return user
}

export const signOut = (req, res) => new Promise((resolve, reject) => {
  req.session.destroy(err => {
    if (err) reject(err)

    res.clearCookie('connect.sid')

    resolve(true)
  })
})

import { User } from '../models'
import { signOut, attemptSignIn, isAuth } from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: joi validation

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      // TODO: joi validation

      const user = await attemptSignIn(args.username, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: async (root, args, { req, res }, info) => {
      return signOut(req, res)
    }
  },
  User: {
    chats: async (user, args, { req }, info) => {
      if (isAuth(req, user)) {
        return (await user.populate('chats').execPopulate()).chats
      }

      return []
    }
  }
}

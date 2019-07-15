import { User } from '../models'
import { signOut, attemptSignIn, isAuth } from '../auth'
import Joi from 'joi'
import { signUp, signIn } from '../schema'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      return User.find({ _id: { $ne: req.session.userId } }).select('username')
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      await Joi.validate(args, signIn, { abortEarly: false })

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

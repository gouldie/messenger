import { User } from '../models'
import { signOut } from '../auth'

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
    signOut: async (root, args, { req, res }, info) => {
      return signOut(req, res)
    }
  }
}

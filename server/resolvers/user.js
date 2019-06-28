import { User } from '../models'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId)
    }
  }
}

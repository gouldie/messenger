import { User, Chat } from '../models'
import Joi from 'joi'
import { startChat } from '../schema'
import { UserInputError } from 'apollo-server-express'
import { isAuth } from '../auth'

export default {
  Mutation: {
    startChat: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { title, userIds } = args

      await Joi.validate(args, startChat(userId), { abortEarly: false })
      console.log('aft')

      const idsFound = await User.where('_id').in(userIds).countDocuments()

      if (idsFound !== userIds.length) {
        throw new UserInputError('One or more User IDs are invalid.')
      }

      userIds.push(userId)

      const chat = await Chat.create({ title, users: userIds })

      await User.updateMany({ _id: { $in: userIds } }, { $push: { chats: chat } })

      return chat.id
    }
  },
  Chat: {
    users: async (chat, args, { req }, info) => {
      if (true) { // TODO: validation. ensure req.user is a member of the chat object
        return (await chat.populate('users').execPopulate()).users
      }

      return []
    }
  }
}

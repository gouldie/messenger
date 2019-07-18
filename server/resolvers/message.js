import { User, Message } from '../models'
import Joi from 'joi'
import { startChat } from '../schema'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    messages: async (root, args, { req }, info) => {
      const { userId } = req.session
      // joi validation
      // access validation
      // sorting by date

      const messages = (await Message.find({ chat: args.chatId }).exec()).map(m => {
        m.isCurrentUser = m.sender.toString() === userId
        return m
      })

      return messages
    }
  },
  Mutation: {
    sendMessage: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { body, chatId } = args

      // join validation
      // access validation

      const message = await Message.create({ body, chat: chatId, sender: userId })

      return message
    }
  }
}

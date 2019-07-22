import { User, Message } from '../models'
import Joi from 'joi'
import { startChat } from '../schema'
import { UserInputError } from 'apollo-server-express'
import { pubsub } from '../index'

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

      const payload = {
        messageSent: {
          id: message.id,
          body,
          chat: chatId,
          sender: userId
        }
      }

      pubsub.publish('messageSent', payload)

      return message
    }
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator('messageSent')
    }
  }
}

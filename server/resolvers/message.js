import { User, Message } from '../models'
import Joi from 'joi'
import { startChat } from '../schema'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    messages: (root, args, { req }, info) => {
      // joi validation
      // access validation
      // sorting by date

      return Message.find({ chat: args.chatId })
    }
  },
  Mutation: {
    sendMessage: async (root, args, { req }, info) => {
      const { userId } = req.session
      const { body, chatId } = args

      console.log('1')
      // join validation
      // access validation

      const message = await Message.create({ body, chat: chatId })

      return message
    }
  }
}

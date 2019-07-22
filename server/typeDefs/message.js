import { gql } from 'apollo-server-express'

const message = gql`
  type Message {
    id: ID!
    sender: String!,
    body: String!,
    createdAt: String!
    updatedAt: String!
    isCurrentUser: Boolean
  }

  extend type Query {
    messages(chatId: ID!): [Message!]!
  }

  extend type Mutation {
    sendMessage(body: String!, chatId: ID!): Message @auth
  }

  extend type Subscription {
    messageSent: Message
  }
`

export default message

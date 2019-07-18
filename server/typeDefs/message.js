import { gql } from 'apollo-server-express'

const message = gql`
  type Message {
    id: ID!
    sender: String!,
    body: String!,
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    messages(chatId: ID!): [Message!]!
  }

  extend type Mutation {
    sendMessage(body: String!, chatId: ID!): Message @auth
  }
`

export default message

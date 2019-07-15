import { gql } from 'apollo-server-express'

const chat = gql`
  type Chat {
    id: ID!
    title: String!
    users: [User!]!
    messages: [Message!]!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    chats: [Chat!]!
  }

  extend type Mutation {
    startChat(title: String, userIds: [ID!]!): Chat @auth
  }
`

export default chat

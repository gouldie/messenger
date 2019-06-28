import { gql } from 'apollo-server'

const chat = gql`
  extend type Chat {
    id: ID!
    title: String!
    users: [User!]!
    messages: [Message!]!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }
`

export default chat

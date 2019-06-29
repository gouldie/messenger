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
`

export default chat

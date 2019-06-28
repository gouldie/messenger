import { gql } from 'apollo-server'

const User = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    chats: [Chat!]!
    friends: [String!]!
    createdAt: String!
    updatedAt: String!
  }
`

export default User

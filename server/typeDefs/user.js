import { gql } from 'apollo-server-express'

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

  extend type Query {
    me: User
  }

  extend type Mutation {
    signUp(username: String!, password: String!): User
    signIn(username: String!, password: String!): User
    signOut: Boolean
  }
`

export default User

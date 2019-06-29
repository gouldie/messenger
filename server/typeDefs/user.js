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
    me: User @auth
  }

  extend type Mutation {
    signUp(username: String!, password: String!): User @guest
    signIn(username: String!, password: String!): User @guest
    signOut: Boolean @auth
  }
`

export default User

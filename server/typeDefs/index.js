import { gql } from 'apollo-server'

export const typeDefs = gql`
  # custom scalars
  scalar Date

  type User {
    _id: String!
    username: String!
    password: String!
    friends: [String!]!
  }

  type Group {
    _id: String!
    userIds: [String!]!
  }

  type Message {
    _id: String!
    from: String!,
    content: String!,
    groupId: String!
  }
`

import { gql } from 'apollo-server'

const message = gql`
  extend type Message {
    id: ID!
    sender: String!,
    body: String!,
    createdAt: String!
    updatedAt: String!
  }
`

export default message

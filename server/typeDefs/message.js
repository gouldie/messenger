import { gql } from 'apollo-server'

const message = gql`
  type Message {
    id: ID!
    sender: String!,
    body: String!,
    createdAt: String!
    updatedAt: String!
  }
`

export default message

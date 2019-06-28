import { gql } from 'apollo-server'

const root = gql`
  # custom scalars
  scalar Date

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`

export default root

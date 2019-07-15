import gql from 'graphql-tag'

export const START_CHAT = gql`
  mutation($title: String!, $userIds: [ID!]!) {
    startChat(title: $title, userIds: $userIds)
  }
`

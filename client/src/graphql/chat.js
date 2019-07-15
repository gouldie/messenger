import gql from 'graphql-tag'

export const START_CHAT = gql`
  mutation($title: String!, $userIds: [ID!]!) {
    startChat(title: $title, userIds: $userIds) {
      id
      title
      users {
        id
        username
      }
    }
  }
`

export const GET_CHATS = gql`
  query {
    chats {
      id
      title
      users {
        id
        username
      }
    }
  }  
`

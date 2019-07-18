import gql from 'graphql-tag'

export const GET_MESSAGES = gql`
  query($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      sender
      body
      isCurrentUser
      createdAt
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation($body: String!, $chatId: ID!) {
    sendMessage(body: $body, chatId: $chatId) {
      id
    }
  }  
`

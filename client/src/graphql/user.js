import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      id
    }
  }
`

export const SIGN_OUT = gql`
  mutation {
    signOut
  }
`

export const MY_CHATS = gql`
  query {
    me {
      id
      chats {
        id
        title
        createdAt
        users {
          id
          username
        }
      }
    }
  }
`

export const USERS = gql`
  query {
    users {
      id
      username
    }
  }
`
